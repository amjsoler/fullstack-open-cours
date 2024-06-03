import { render, screen } from '@testing-library/react'
import Blog from "./Blog.jsx";

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: "Matti Luukkainen",
        url: "https://reactpatterns.com/",
        likes: 7
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('Component testing is done with react-testing-library')

    expect(element).toBeDefined()
})