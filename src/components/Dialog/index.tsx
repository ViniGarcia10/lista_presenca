import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import "./styles.css";

export default function FormDialog(props: {
  childToParent: (arg0: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [UserGitHub, setUserGitHub] = useState("");

  useEffect(() => {
    setOpen(true);
  }, []);

  function handleClose(e: string) {
    let dataEnv = {
      userGitHub: UserGitHub,
      selectStatus: e,
    };
    props.childToParent(dataEnv);
    setOpen(false);
  }

  return (
    <div id="dialog">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Lista de Presença</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para acessar a sua lista de presença, insira o seu usuario GitHub!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Usuário GitHub"
            type="text"
            fullWidth
            variant="standard"
            spellCheck="false"
            onChange={(e) => setUserGitHub(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("mdGuest")}>
            Não Identificar
          </Button>
          <Button onClick={() => handleClose("mdUser")}>Entrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
