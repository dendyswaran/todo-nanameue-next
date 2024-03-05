'use server'

import { TodoFormStateProps } from "@/lib/types"
import { invokeAPI, sanitizeInput } from "@/lib/utils"
import { revalidatePath } from "next/cache"

const API_BASE_URL = process.env.API_BASE_URL
const API_USERNAME = process.env.API_USERNAME
const API_URL = `${API_BASE_URL}/api/${API_USERNAME}`

export const createTodo = async (prevState: any, formData: FormData): Promise<TodoFormStateProps> => {
    try {
        const text = formData.get('text');
        if (!text || text.toString().trim().length === 0) {
            return { message: "Please input a text" }
        }

        const clearText = sanitizeInput(text.toString())
        await invokeAPI(`${API_URL}/todos/create`, {
            method: 'POST',
            body: JSON.stringify({ text: clearText }),
        })
        revalidatePath("/")
        return {
            message: null
        }
    } catch (e) {
        return { message: 'Something went wrong!' }
    }
}

export const fetchTodos = async () => {
    const response = await invokeAPI(`${API_URL}/todos`, { method: 'GET' })
    return await response.json()
}

export const updateTodoById = async (id: string) => {
    try {
        await invokeAPI(`${API_URL}/todos/${id}/toggle`, { method: 'PUT' })
        revalidatePath("/")
    } catch (e) {
        return { message: 'Something went wrong!' }
    }
}

export const deleteTodoById = async (id: string) => {
    try {
        await invokeAPI(`${API_URL}/todos/${id}`, { method: 'DELETE' })
        revalidatePath("/")
    } catch (e) {
        return { message: 'Something went wrong!' }
    }
}