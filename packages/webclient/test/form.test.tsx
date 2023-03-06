import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from '../src/components'

describe('Form', () => {
    const handleSubmit = jest.fn()

    beforeEach(() => {
        handleSubmit.mockClear()
    })

    test('renders form fields', () => {
        render(<Form onClick={() => (({}))} isOpen={true} handleSubmit={handleSubmit} />)

        expect(screen.getByLabelText(/project title/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/project description/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/project link/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/upload images/i)).toBeInTheDocument()
    })

    test('displays validation errors', async () => {
        render(<Form onClick={() => ({})} isOpen={true} handleSubmit={handleSubmit} />)

        const submitButton = screen.getByText(/add project/i)

        await userEvent.click(submitButton)

        expect(screen.getByText(/title is a required field/i)).toBeInTheDocument()
        expect(screen.getByText(/description is a required field/i)).toBeInTheDocument()
        expect(screen.getByText(/customerLink is a required field/i)).toBeInTheDocument()
    })

    test('uploads files', () => {
        render(<Form onClick={() => ({})} isOpen={true} handleSubmit={handleSubmit} />)

        const files = [
            new File(['file1'], 'file1.png', { type: 'image/png' }),
            new File(['file2'], 'file2.png', { type: 'image/png' }),
        ]

        const input = screen.getByLabelText(/upload images/i)
        fireEvent.change(input, { target: { files } })

        expect(screen.getByText(/file1.png/i)).toBeInTheDocument()
        expect(screen.getByText(/file2.png/i)).toBeInTheDocument()
    })

    test('submits form', async () => {
        render(<Form onClick={() => ({})} isOpen={true} handleSubmit={handleSubmit} />)

        const submitButton = screen.getByText(/add project/i)

        const titleInput = screen.getByLabelText(/project title/i)
        userEvent.type(titleInput, 'Project Title')

        const descriptionInput = screen.getByLabelText(/project description/i)
        userEvent.type(descriptionInput, 'Project Description')

        const customerLinkInput = screen.getByLabelText(/project link/i)
        userEvent.type(customerLinkInput, 'https://www.example.com')

        const files = [
            new File(['file1'], 'file1.png', { type: 'image/png' }),
            new File(['file2'], 'file2.png', { type: 'image/png' }),
        ]

        const input = screen.getByLabelText(/upload images/i)
        fireEvent.change(input, { target: { files } })

        await userEvent.click(submitButton)

        expect(handleSubmit).toHaveBeenCalled()
    })
})