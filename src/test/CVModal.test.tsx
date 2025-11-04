import { render, screen } from "@testing-library/react";
import CVModal from "../components/CVModal";

describe("CVModal", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("should render an iframe to display the PDF resume", () => {
    render(<CVModal isOpen={true} onClose={mockOnClose} />);

    const iframe = screen.getByTitle("Ben Hankins Resume");
    expect(iframe).toBeInTheDocument();
    expect(iframe.tagName).toBe("IFRAME");
    expect(iframe).toHaveAttribute(
      "src",
      "/benhankins-solutions-engineer-resume.pdf"
    );
  });

  it("should have a download link that correctly points to '/current-solutions-engineer-resume.pdf'", () => {
    render(<CVModal isOpen={true} onClose={mockOnClose} />);

    const downloadLink = screen.getByRole("link", { name: /download pdf/i });
    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink).toHaveAttribute(
      "href",
      "/current-solutions-engineer-resume.pdf"
    );
    expect(downloadLink).toHaveAttribute("download");
  });
});
