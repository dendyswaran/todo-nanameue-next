'use client'

import { TodoProps } from "@/lib/types"
import { PlusIcon } from "@heroicons/react/16/solid"
import Button from "../button/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import useController from "./Todo.controller"
import TodoItem from "./TodoItem"
import ProgressInfo from "../progress_info/ProgressInfo"
import { ScrollArea } from "../ui/scroll-area"

export default function Todo(props: { todos: TodoProps[] }) {
    const {
        formRef,
        formAction,
        todoList,
        handleFilterChange,
        handleCheckedChange,
        handleDelete
    } = useController(props)

    return (
        <div className="flex flex-col max-sm:w-full max-sm:px-3 w-1/2 gap-6 h-full pb-10">
            <ProgressInfo todos={props.todos} />

            <div className="flex justify-between">
                <h1 className="text-black text-2xl">To-dos</h1>
                <Select onValueChange={handleFilterChange}>
                    <SelectTrigger name="filter-combobox" className="w-[180px] rounded-2xl">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                        <SelectItem value="undone">Undone</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <form role="form" ref={formRef} action={formAction}>
                <div className="flex items-center justify-between rounded-full bg-white h-12 p-2 mt-4 gap-2">
                    <input
                        data-testid="input"
                        name="text"
                        type="text"
                        placeholder="Add your to-do ..."
                        className="placeholder:text-gray-400 flex-1 outline-none text-black pl-2" />
                    <Button icon={<PlusIcon className="text-gray-700 w-4 h-4" />}>Add</Button>
                </div>
            </form>

            <ScrollArea className="flex flex-col gap-2 flex-1">
                {todoList?.map((data) => (
                    <TodoItem key={data._id}
                        todo={data}
                        onCheck={handleCheckedChange}
                        onDelete={handleDelete} />
                ))}
            </ScrollArea>

        </div>
    )
}