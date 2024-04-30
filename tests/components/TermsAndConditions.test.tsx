import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
	it("should render title and initial state", () => {
		render(<TermsAndConditions />);
		const heading = screen.getByRole("heading");
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent(/terms & conditions/i);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).not.toBeChecked();

		const button = screen.getByRole("button", { name: /submit/i });
		expect(button).toBeDisabled();
	});

	it("should enable button when user checked the checkbox", async () => {
		render(<TermsAndConditions />);

		const checkbox = screen.getByRole("checkbox");
		const user = userEvent.setup();
		await user.click(checkbox);

		const button = screen.getByRole("button", { name: /submit/i });
		expect(button).toBeEnabled();
	});
});
