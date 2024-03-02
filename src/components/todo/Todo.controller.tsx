import { TodoFormStateProps, TodoProps } from "@/lib/types"
import { createTodo, deleteTodoById, updateTodoById } from "@/services/actions/todo.action"
import { useCallback, useEffect, useOptimistic, useRef, useState } from "react"
import { useFormState } from "react-dom"
import { useToast } from "../ui/use-toast"

type FilterType = 'all' | 'done' | 'undone'

const initialState: TodoFormStateProps = {
    message: null,
}

export default function useController(props: { todos: TodoProps[] }) {
    const { todos } = props
    const { toast } = useToast()
    const [todoList, setTodoList] = useState<TodoProps[]>(todos || [])
    const [filterType, setFilterType] = useState<FilterType>('all')
    const [state, formAction] = useFormState(createTodo, initialState)
    const formRef = useRef<HTMLFormElement>(null)

    const handleFilterChange = useCallback((value: FilterType) => {
        setFilterType(value)

        switch (value) {
            case 'done':
                setTodoList(todos.filter(_todo => _todo.isDone))
                break
            case 'undone':
                setTodoList(todos.filter(_todo => !_todo.isDone))
                break
            default:
                setTodoList(todos)
                break
        }
    }, [todos])

    const handleCheckedChange = async (_id: string) => {
        updateTodoById(_id)
    }

    const handleDelete = async (_id: string) => {
        deleteTodoById(_id)
    }

    useEffect(() => {
        if (state.message) {
            toast({
                variant: "destructive",
                title: "Error",
                description: state.message,
            })
        }

        formRef.current?.reset()
    }, [state, toast])

    useEffect(() => {
        handleFilterChange(filterType)
    }, [todos, filterType, handleFilterChange])

    return {
        todoList,
        formRef,
        formAction,
        handleFilterChange,
        handleCheckedChange,
        handleDelete
    }
}