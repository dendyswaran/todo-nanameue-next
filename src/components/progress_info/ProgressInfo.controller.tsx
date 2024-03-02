import { TodoProps } from "@/lib/types";
import { useEffect, useState } from "react";

export default function useController(props: { todos: TodoProps[] }) {
    const { todos } = props
    const [indicator, setIndicator] = useState<number>(0)
    const [completed, setCompleted] = useState<number>(0)

    useEffect(() => {
        if (todos?.length > 0) {
            const _completed = todos.filter(t => t.isDone).length || 0
            setCompleted(_completed)
            setIndicator(Math.abs((todos.length - _completed) / todos.length * 100))
        } else {
            setCompleted(0)
            setIndicator(0)
        }
    }, [todos])

    return {
        indicator,
        completed
    }
}