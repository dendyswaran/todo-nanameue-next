import { TodoProps } from "@/lib/types";
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
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

});