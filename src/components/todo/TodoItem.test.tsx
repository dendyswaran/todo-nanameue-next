import { TodoProps } from "@/lib/types";
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event'
import TodoItem from './TodoItem';

describe('TodoItem Component', () => {
    const mockTodo: TodoProps = { _id: '1', text: 'Test Todo', isDone: false };
    const handleCheckMock = jest.fn();
    const handleDeleteMock = jest.fn();

    it('calls onCheck when the checkbox is changed', async () => {
        const { getByRole } = render(<TodoItem todo={mockTodo} onCheck={handleCheckMock} onDelete={handleDeleteMock} />);

        await fireEvent.click(getByRole('checkbox'));
        expect(handleCheckMock).toHaveBeenCalledWith(mockTodo._id);
    });

    it('calls onDelete when clicked', async () => {
        const { findByTestId, findByText, getByTestId } = render(<TodoItem todo={mockTodo} onCheck={handleCheckMock} onDelete={handleDeleteMock} />);
        userEvent.click(getByTestId("dropdown-trigger"));

        const menuItem = await findByTestId("dropdown-menu-item");
        expect(menuItem).toBeInTheDocument();
        expect(await findByText("Delete")).toBeInTheDocument()

        await userEvent.click(menuItem)
        expect(handleDeleteMock).toHaveBeenCalledWith(mockTodo._id)
    })

});