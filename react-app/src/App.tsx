import './App.css'


interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('http://localhost:8080/todos').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message


  return (
    <>
    {data.map((todo: Todo) => (
      <div key={todo.id}>
        <h1>{todo.title}</h1>
        <p>{todo.description}</p>
        <p>{todo.done ? 'Done' : 'Not done'}</p>
      </div>
    ))}
    </>
  )
}
import { useQuery } from '@tanstack/react-query';

export default App
