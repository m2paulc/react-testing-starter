import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";
import "@testing-library/jest-dom/vitest";

describe("Greet", () => {
	it("should render Hello with the name when name is provided", () => {
		render(<Greet name="John" />);

		const heading = screen.getByRole("heading", { name: /Hello John/i });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent(/hello john/i);
	});

	it("should render login button when name is not provided", () => {
		render(<Greet />);

		const button = screen.getByRole("button", { name: /login/i });
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent(/login/i);
	});
});
