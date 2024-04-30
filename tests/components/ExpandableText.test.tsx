import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
	const limit = 255;
	const shortText = "a".repeat(limit);
	const longText = "text".repeat(300);
	const truncatedText = longText.substring(0, limit) + "...";

	it("text is short then show more button is not visible", () => {
		render(<ExpandableText text={shortText} />);

		const content = screen.getByText(shortText);
		expect(content).toBeInTheDocument();
		expect(content).toHaveTextContent(shortText);

		const button = screen.queryByRole("button");
		expect(button).not.toBeInTheDocument();
	});

	it("should truncate text if longer than 255 characters then show more button is visible", () => {
		render(<ExpandableText text={truncatedText} />);

		expect(screen.getByText(truncatedText)).toBeInTheDocument();

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Show More");
	});

	it("should show more text when Show More button is clicked", async () => {
		render(<ExpandableText text={longText} />);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();

		const user = userEvent.setup();
		await user.click(button);

		expect(screen.getByText(longText)).toBeInTheDocument();
		expect(button).toHaveTextContent(/less/i);
	});

	it("should show less text when Show Less button is clicked", async () => {
		render(<ExpandableText text={longText} />);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();

		const user = userEvent.setup();
		//Show more button clicked
		await user.click(button);
		//Show less button clicked
		await user.click(button);

		expect(screen.getByText(truncatedText)).toBeInTheDocument();
		expect(button).toHaveTextContent(/more/i);
	});
});
