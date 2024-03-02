'use client'

import { TodoProps } from "@/lib/types";
import { Progress } from "../ui/progress";
import useController from "./ProgressInfo.controller";

export default function ProgressInfo(props: { todos: TodoProps[] }) {
    const {
        indicator,
        completed } = useController(props)

    return (
        <div className="bg-gray-progress rounded-[20px] min-h-[123px] flex flex-col gap-2 px-4 py-6">
            <h1 className="text-white text-2xl">Progress</h1>
            <Progress value={indicator} className="w-full" />
            <span className="text-gray-info">{completed} Completed</span>
        </div>
    )
}