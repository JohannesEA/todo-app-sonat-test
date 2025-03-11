import { useState } from "react";
import "./App.css";

interface Todo {
  id: number | null;
  title: string;
  description: string;
  done: boolean;
}

function App() {
  const queryClient = useQueryClient();

  const [todoTitle, setTodoTitle] = useState<string>("");
  const { data, isPending, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/todos");
      if (!response.ok) throw new Error("Failed to fetch todos");
      return response.json();
    },
  });

  // Mutation to create a new todo
  const mutation = useMutation({
    mutationFn: async (todo: Todo) => {
      await fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (todo: Todo) => {
      await fetch("http://localhost:8080/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (todo: Todo) => {
      await fetch(`http://localhost:8080/todos/${todo.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddTodo = (todo: Todo) => {
    mutation.mutate(todo);
  };

  const handleDeleteTodo = (todo: Todo) => {
    deleteMutation.mutate(todo);
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <form>
        <input onChange={(e) => setTodoTitle(e.target.value)} />
        <button
          onClick={() =>
            handleAddTodo({
              id: null,
              title: todoTitle,
              description: "test",
              done: false,
            })
          }
        >
          Add todo
        </button>
      </form>
      {data.map((todo: Todo) => (
        <div key={todo.id}>
          <h1>{todo.title}</h1>
          <p>{todo.description}</p>
          <p>{todo.done ? "Done" : "Not done"}</p>
          <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
          <button
            onClick={() =>
              updateMutation.mutate({
                id: todo.id,
                title: todo.title,
                description: todo.description,
                done: !todo.done,
              })
            }
          >
            Update
          </button>
        </div>
      ))}
    </>
  );
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default App;
