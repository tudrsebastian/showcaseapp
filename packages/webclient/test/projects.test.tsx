import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { Projects } from '../src/components';
import mockAxios from 'jest-mock-axios';

jest.mock('axios');

describe('Projects', () => {
    const mockProjects = [
        {
            id: 1,
            customerLink: 'http://example.com',
            description: 'Example project',
            title: 'Example',
            images: [
                {
                    id: 1,
                    filename: 'example.jpg',
                    mimetype: 'image/jpeg',
                },
            ],
        },
    ];

    beforeEach(() => {
        mockAxios.get.mockResolvedValue({ data: mockProjects });
    });

    afterEach(() => {
        mockAxios.reset()
    });

    test('renders the component with project data', async () => {
        render(<Projects />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/example/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/example project/i)).toBeInTheDocument();
        expect(screen.getByText(/http:\/\/example\.com/i)).toBeInTheDocument();
        expect(screen.getByText(/edit/i)).toBeInTheDocument();
        expect(screen.getByText(/delete/i)).toBeInTheDocument();
    });

    test('deletes a project when the delete button is clicked', async () => {
        render(<Projects />);

        await waitFor(() => {
            expect(screen.getByText(/example/i)).toBeInTheDocument();
        });

        mockAxios.delete.mockResolvedValueOnce({ data: {} });

        fireEvent.click(screen.getByText(/delete/i));

        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith('http://localhost:3001/projects/1');
            expect(screen.queryByText(/example/i)).not.toBeInTheDocument();
        });
    });

    test('updates a project when the save button is clicked', async () => {
        render(<Projects />);

        await waitFor(() => {
            expect(screen.getByText(/example/i)).toBeInTheDocument();
        });

        mockAxios.put.mockResolvedValueOnce({ data: {} });

        fireEvent.click(screen.getByText(/edit/i));

        const titleInput = screen.getByPlaceholderText(/edit title/i);
        const linkInput = screen.getByPlaceholderText(/edit link/i);
        const descriptionInput = screen.getByPlaceholderText(/edit description/i);

        fireEvent.change(titleInput, { target: { value: 'Updated Example' } });
        fireEvent.change(linkInput, { target: { value: 'http://updated.example.com' } });
        fireEvent.change(descriptionInput, { target: { value: 'Updated example project' } });

        fireEvent.click(screen.getByText(/save/i));

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith('http://localhost:3001/projects/1', {
                title: 'Updated Example',
                customerLink: 'http://updated.example.com',
                description: 'Updated example project',
            });
            expect(screen.getByText(/updated example/i)).toBeInTheDocument();
            expect(screen.getByText(/updated example project/i)).toBeInTheDocument();
            expect(screen.getByText(/http:\/\/updated\.example\.com/i)).toBeInTheDocument();
            expect(screen.getByText(/edit/i)).toBeInTheDocument();
            expect(screen.getByText(/delete/i)).toBeInTheDocument();
        });
    });
});