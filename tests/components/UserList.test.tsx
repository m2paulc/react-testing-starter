import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
	it("should render a list of users", () => {
		const users: User[] = [
			{
				id: 1,
				name: "John",
				isAdmin: false,
			},
			{
				id: 2,
				name: "Jane",
				isAdmin: false,
			},
		];
		render(<UserList users={users} />);

		users.forEach((user) => {
			const link = screen.getByRole("link", { name: user.name });
			expect(screen.getByText(user.name)).toBeInTheDocument();
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute("href", `/users/${user.id}`);
		});
	});

	it("should render a message when no users are available", () => {
		render(<UserList users={[]} />);
		expect(screen.getByText(/no users/i)).toBeInTheDocument();
	});
});
