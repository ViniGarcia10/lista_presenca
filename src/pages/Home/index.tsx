import { useEffect, useState } from "react";
import "./styles.css";

import { Card, PropsCard } from "../../components/Card";
import FormDialog from "../../components/Dialog";

type ProfileResponse = {
  message?: string;
  avatar_url: string;
  name: string;
};

type User = {
  avatar: string;
  name: string;
};

type PropsFormDialog = {
  userGitHub: string;
  selectStatus: "mdUser" | "mdGuest";
};

export function Home() {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState<PropsCard[]>([]);
  const [user, setUser] = useState<User>({} as User);

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents((prevState) => [...prevState, newStudent]);
  }

  async function fetchData(user = "not_Informat") {
    const response = await fetch("https://api.github.com/users/" + user);
    const data = (await response.json()) as ProfileResponse;

    if (data.message === "Not Found") {
      setUser({
        name: "Convidado",
        avatar: "https://picsum.photos/200/300",
      });

      return;
    }

    setUser({
      name: data.name,
      avatar: data.avatar_url,
    });
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log("Error ==> ", error);
    }
  }, []);

  const childToParent = ({ selectStatus, userGitHub }: PropsFormDialog) => {
    if (selectStatus === "mdUser") {
      fetchData(userGitHub);
    }
  };

  return (
    <div className="container">
      <FormDialog childToParent={childToParent} />
      <header>
        <h1>Lista de Presença</h1>

        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {students.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}
