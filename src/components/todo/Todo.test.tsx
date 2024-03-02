import { TodoProps } from "@/lib/types";
import '@testing-library/jest-dom';
import { render, renderHook, waitFor } from '@testing-library/react';
import Todo from "./Todo";
import useController from './Todo.controller';

const todos: TodoProps[] = [
    { _id: '1', text: 'Todo 1', isDone: false },
    { _id: '2', text: 'Todo 2', isDone: true },
    { _id: '3', text: 'Todo 3', isDone: true },
];

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [() => { }, null],
    useFormStatus: () => [() => { }, null]
}));

describe('useController', () => {

    it('todoList has the equal value as todos', () => {
        const { result } = renderHook(() => useController({ todos }));
        expect(result.current.todoList).toEqual(todos)
    })

    it('filters todos based on filter type', async () => {
        const { result } = renderHook(() => useController({ todos }));

        await waitFor(() => result.current.handleFilterChange("done"))
        expect(result.current.todoList.length).toEqual(2)

        await waitFor(() => result.current.handleFilterChange("undone"))
        expect(result.current.todoList.length).toEqual(1)

        await waitFor(() => result.current.handleFilterChange("all"))
        expect(result.current.todoList.length).toEqual(3)
    });

});

describe('todo', () => {
    it('renders correctly', async () => {
        const { container, getAllByTestId, getByText } = render(<Todo todos={todos} />)
        expect(container).toBeDefined()

        const items = getAllByTestId('listitem');

        expect(items.length).toBe(3)
        expect(getByText('Todo 1')).toBeDefined();
        expect(getByText('Todo 2')).toBeDefined();
        expect(getByText('Todo 3')).toBeDefined();

    })
})
