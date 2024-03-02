import React from 'react';
import { render, screen } from '@testing-library/react';
import useController from './ProgressInfo.controller';
import { TodoProps } from "@/lib/types";
import ProgressInfo from './ProgressInfo';

const todos: TodoProps[] = [
    { _id: '1', text: 'Todo 1', isDone: false },
    { _id: '2', text: 'Todo 2', isDone: true },
    { _id: '3', text: 'Todo 3', isDone: true },
];

function TestComponent({ todos }: { todos: TodoProps[] }) {
    const { indicator, completed } = useController({ todos });
    return (
        <div>
            <div data-testid="indicator">{indicator}</div>
            <div data-testid="completed">{completed}</div>
        </div>
    );
}

describe('useController', () => {
    it('correctly calculates the progress indicator and completed todos', () => {
        render(<TestComponent todos={todos} />);
        expect(screen.getByTestId('completed').textContent).toBe('2');
        expect(screen.getByTestId('indicator').textContent).toBe(String(Math.abs(3 - 2) / 3 * 100));
    });

    it('handles empty todos array', () => {
        const emptyTodos: TodoProps[] = [];
        render(<TestComponent todos={emptyTodos} />);

        expect(screen.getByTestId('completed').textContent).toBe('0');
        expect(screen.getByTestId('indicator').textContent).toBe('0');
    });
});

describe('ProgressInfo Component', () => {
    it('renders correctly with given todos', () => {
        render(<ProgressInfo todos={todos} />);
        expect(screen.getByText('2 Completed')).toBeDefined();
    });

});