import './styles.css';

export type PropsCard = {
  name: string,
  time: string,
}

export function Card(props: PropsCard) {
  return (
    <div className="card">
      <strong>{props.name}</strong>
      <small>{props.time}</small>
    </div>
  )
}