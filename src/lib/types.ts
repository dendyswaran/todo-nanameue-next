export interface TodoProps {
    _id: string;
    text: string;
    isDone: boolean;
}

export interface TodoItemProps {
    todo: TodoProps;
    onCheck?: (_id: string) => void;
    onDelete?: (_id: string) => void;
}

export interface TodoFormStateProps {
    message: string | null
}