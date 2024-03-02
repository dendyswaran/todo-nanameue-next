import { fetchTodos } from "@/services/actions/todo.action";
import Todo from "../components/todo/Todo";

export default async function Home() {
  const data = await fetchTodos()

  return (
    <div className="flex flex-col items-center pt-4 pb-5 h-screen bg-white-main">
      <Todo todos={data} />
    </div>
  );
}
