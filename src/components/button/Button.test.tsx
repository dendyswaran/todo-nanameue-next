import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { LoaderIcon } from "lucide-react";
import Button from './Button';

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormStatus: () => [() => { }, { pending: true }]
}));

describe('Button Component', () => {

    it('renders the button with the provided children', () => {
        const { getByRole } = render(<Button>Click me</Button>);
        expect(getByRole('button')).toHaveTextContent('Click me');
    });

    it('shows a loader icon when pending', () => {
        const { getByTestId } = render(<Button pending icon={<LoaderIcon />}>Click me</Button>);
        expect(getByTestId('button-icon')).toContainHTML('svg');
        expect(getByTestId('button-label').textContent).toBe('Loading..');
    });

    it('displays the provided icon when not pending', () => {
        const TestIcon = () => <svg data-testid="test-icon"></svg>;
        const { getByTestId } = render(<Button pending={false} icon={<TestIcon />}>Click me</Button>);
        expect(getByTestId('button-icon')).toContainHTML('svg');
        expect(getByTestId('button-label')).toHaveTextContent('Click me');
    });
});