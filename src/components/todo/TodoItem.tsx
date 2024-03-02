import { Checkbox } from "@/components/ui/checkbox";
import { useState, useTransition } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LoaderIcon, MoreHorizontalIcon } from "lucide-react";
import { TodoItemProps } from "@/lib/types";

export default function TodoItem({ todo, onCheck, onDelete }: TodoItemProps) {
    const { _id, isDone, text } = todo
    const [pending, startTransition] = useTransition()
    const [isComplete, setIsComplete] = useState<boolean>(isDone || false)

    return (
        <div data-testid="listitem" className="flex items-center justify-between rounded-full bg-white h-12 py-2 px-4 mt-4" aria-disabled={pending}>
            <div className="flex items-center gap-4 ml-2">
                <Checkbox
                    disabled={pending}
                    checked={isComplete}
                    onCheckedChange={() => {
                        startTransition(() => {
                            onCheck?.(_id)
                            setIsComplete(!isComplete)
                        })

                    }}
                />

                <span className={`${isComplete ? 'line-through text-gray-done' : 'text-black'}`}>{text}</span>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger data-testid="dropdown-trigger">
                    {pending ? <LoaderIcon className="text-black animate-spin" /> : <MoreHorizontalIcon className="text-gray-more" />}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="shadow-lg">
                    <DropdownMenuItem
                        data-testid="dropdown-menu-item"
                        className="cursor-pointer text-delete"
                        onClick={() => startTransition(() => onDelete?.(_id))}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}