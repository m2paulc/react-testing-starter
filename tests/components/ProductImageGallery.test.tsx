import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
	it("should render nothing if array is empty", () => {
		const { container } = render(<ProductImageGallery imageUrls={[]} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("should render list of images if array is not empty", () => {
		const imageUrls = [
			"https://picsum.photos/id/100/200/300",
			"https://picsum.photos/id/101/200/300",
		];
		render(<ProductImageGallery imageUrls={imageUrls} />);
		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(2);
		imageUrls.forEach((url, index) => {
			expect(images[index]).toHaveAttribute("src", url);
		});
	});
});
