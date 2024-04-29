import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
	it("should render user name when login is successful", () => {
		const user: User = {
			id: 1,
			name: "John",
			isAdmin: false,
		};
		render(<UserAccount user={user} />);
		expect(screen.getByText(user.name)).toBeInTheDocument();
	});

	it("should render edit button when user is admin", () => {
		const user: User = {
			id: 1,
			name: "John",
			isAdmin: true,
		};
		render(<UserAccount user={user} />);
		const button = screen.getByRole("button", { name: /edit/i });
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent(/edit/i);
	});

	it("should not render edit button when user is not admin", () => {
		const user: User = {
			id: 1,
			name: "John",
			isAdmin: false,
		};
		render(<UserAccount user={user} />);
		const button = screen.queryByRole("button", { name: /edit/i });
		expect(button).not.toBeInTheDocument();
	});
});
