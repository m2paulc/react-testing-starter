import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
	const renderComponent = () => {
		render(<TermsAndConditions />);
		return {
			heading: screen.getByRole("heading"),
			checkbox: screen.getByRole("checkbox"),
			button: screen.getByRole("button", { name: /submit/i }),
		};
	};

	it("should render title and initial state", () => {
		const { heading, checkbox, button } = renderComponent();

		expect(heading).toHaveTextContent(/terms & conditions/i);
		expect(checkbox).not.toBeChecked();
		expect(button).toBeDisabled();
	});

	it("should enable button when user checked the checkbox", async () => {
		const { checkbox, button } = renderComponent();

		const user = userEvent.setup();
		await user.click(checkbox);

		expect(button).toBeEnabled();
	});
});
