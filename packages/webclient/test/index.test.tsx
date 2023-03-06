import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../src/pages/index'
import { Form, Projects, Button } from '../src/components/'



describe('Home component', () => {
  test('renders Projects and Add Project+ button', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: 'Projects' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add Project+' })
    ).toBeInTheDocument()
  })

  test('clicking Add Project+ button opens Form component', () => {
    render(<Home />)
    fireEvent.click(screen.getByRole('button', { name: 'Add Project+' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  test('submitting form closes Form component', () => {
    render(<Form onClick={() => ({})} isOpen={true} handleSubmit={() => ({})} />)
    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('clicking cancel button closes Form component', () => {
    render(<Form onClick={() => ({})} isOpen={true} handleSubmit={() => ({})} />)
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('renders Projects component', () => {
    render(<Projects />)
    expect(
      screen.getByRole('heading', { name: 'Projects' })
    ).toBeInTheDocument()
  })

  test('renders Button component', () => {
    render(<Button name="Add Project+" onClick={() => ({})} isOpen={false} handleSubmit={() => ({})} />)
    expect(
      screen.getByRole('button', { name: 'Add Project+' })
    ).toBeInTheDocument()
  })
})
