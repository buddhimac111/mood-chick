import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import AboutPage from "../page";

// Mock Next.js Link component
jest.mock("next/link", () => {
    const MockedLink = ({
        children,
        href,
    }: {
        children: React.ReactNode;
        href: string;
    }) => {
        return <a href={href}>{children}</a>;
    };
    MockedLink.displayName = "Link";
    return MockedLink;
});

describe("AboutPage", () => {
    it("renders the about page heading", () => {
        render(<AboutPage />);
        expect(screen.getByText("About MoodChick")).toBeInTheDocument();
    });

    it("renders the story section", () => {
        render(<AboutPage />);
        expect(screen.getByText("Our Story")).toBeInTheDocument();
        // Check for part of the story content
        const storyText = screen.getByText(/finding the right words/i);
        expect(storyText).toBeInTheDocument();
    });

    it("renders mission and vision sections", () => {
        render(<AboutPage />);
        expect(screen.getByText("Our Mission")).toBeInTheDocument();
        expect(screen.getByText("Our Vision")).toBeInTheDocument();
    });

    it("renders core values", () => {
        render(<AboutPage />);
        expect(screen.getByText("Our Core Values")).toBeInTheDocument();
        expect(screen.getByText("Authenticity")).toBeInTheDocument();
        expect(screen.getByText("Innovation")).toBeInTheDocument();
        expect(screen.getByText("Community")).toBeInTheDocument();
    });

    it("renders special features section", () => {
        render(<AboutPage />);
        expect(screen.getByText("What Makes Us Special")).toBeInTheDocument();
        expect(screen.getByText("AI-Powered Intelligence")).toBeInTheDocument();
        expect(screen.getByText("Lightning Fast")).toBeInTheDocument();
        expect(screen.getByText("Mood-Centric Design")).toBeInTheDocument();
        expect(screen.getByText("Quality Guaranteed")).toBeInTheDocument();
    });

    it("renders stats section", () => {
        render(<AboutPage />);
        expect(
            screen.getByText("MoodChick by the Numbers")
        ).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("Mood Categories")).toBeInTheDocument();
        expect(screen.getByText("100%")).toBeInTheDocument();
        expect(screen.getByText("Free to Use")).toBeInTheDocument();
    });

    it("renders technology stack section", () => {
        render(<AboutPage />);
        expect(screen.getByText("Built with Modern Tech")).toBeInTheDocument();
        expect(screen.getByText("Next.js 15")).toBeInTheDocument();
        expect(screen.getByText("TypeScript")).toBeInTheDocument();
        expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
    });

    it("renders connect section with social links", () => {
        render(<AboutPage />);
        expect(screen.getByText(/Let's Connect!/i)).toBeInTheDocument();

        // Check for social media links
        const githubLink = screen.getByText("GitHub").closest("a");
        const twitterLink = screen.getByText("Twitter").closest("a");
        const emailLink = screen.getByText("Email Us").closest("a");

        expect(githubLink).toHaveAttribute(
            "href",
            "https://github.com/yourusername/mood-chick"
        );
        expect(twitterLink).toHaveAttribute(
            "href",
            "https://twitter.com/moodchick"
        );
        expect(emailLink).toHaveAttribute("href", "mailto:hello@moodchick.com");
    });

    it("renders back to home link", () => {
        render(<AboutPage />);
        const backLink = screen.getByText("Back to Home").closest("a");
        expect(backLink).toHaveAttribute("href", "/");
    });

    it("renders CTA button to try MoodChick", () => {
        render(<AboutPage />);
        expect(screen.getByText("Ready to express your mood?")).toBeInTheDocument();
        const ctaLink = screen.getByText("Try MoodChick Now").closest("a");
        expect(ctaLink).toHaveAttribute("href", "/");
    });

    it("renders all lucide icons without errors", () => {
        const { container } = render(<AboutPage />);
        // Check that SVG icons are rendered (Lucide icons render as SVG)
        const svgs = container.querySelectorAll("svg");
        expect(svgs.length).toBeGreaterThan(0);
    });

    it("has proper dark mode classes", () => {
        const { container } = render(<AboutPage />);
        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv.className).toContain("dark:from-gray-900");
        expect(mainDiv.className).toContain("dark:via-purple-900");
    });

    it("renders all mood-related content", () => {
        render(<AboutPage />);
        expect(
            screen.getByText(
                /Bringing your emotions to life with AI-powered captions/i
            )
        ).toBeInTheDocument();
    });

    it("renders mission text correctly", () => {
        render(<AboutPage />);
        expect(
            screen.getByText(
                /To democratize creative expression by providing AI-powered tools/i
            )
        ).toBeInTheDocument();
    });

    it("renders vision text correctly", () => {
        render(<AboutPage />);
        expect(
            screen.getByText(
                /To become the go-to platform for emotional expression online/i
            )
        ).toBeInTheDocument();
    });

    it("has external links with proper attributes", () => {
        render(<AboutPage />);

        const githubLink = screen.getByText("GitHub").closest("a");
        expect(githubLink).toHaveAttribute("target", "_blank");
        expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

        const twitterLink = screen.getByText("Twitter").closest("a");
        expect(twitterLink).toHaveAttribute("target", "_blank");
        expect(twitterLink).toHaveAttribute("rel", "noopener noreferrer");
    });
});

