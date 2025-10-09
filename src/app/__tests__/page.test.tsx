import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../page";

// Mock fetch globally
global.fetch = jest.fn();

describe("Home Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (global.fetch as jest.Mock).mockClear();
    });

    describe("Rendering", () => {
        it("should render the main heading", () => {
            render(<Home />);
            expect(screen.getByText("MoodChick")).toBeInTheDocument();
        });

        it("should render the tagline", () => {
            render(<Home />);
            expect(
                screen.getByText(
                    /Select your mood and let AI craft the perfect social media caption/i
                )
            ).toBeInTheDocument();
        });

        it("should render all mood buttons", () => {
            render(<Home />);
            expect(screen.getByText("Happy")).toBeInTheDocument();
            expect(screen.getByText("Sad")).toBeInTheDocument();
            expect(screen.getByText("Love")).toBeInTheDocument();
            expect(screen.getByText("Motivational")).toBeInTheDocument();
            expect(screen.getByText("Funny")).toBeInTheDocument();
        });

        it("should not show generate button initially", () => {
            render(<Home />);
            expect(
                screen.queryByText("Generate Caption")
            ).not.toBeInTheDocument();
        });

        it("should render features section", () => {
            render(<Home />);
            expect(
                screen.getByText("Why Choose MoodChick?")
            ).toBeInTheDocument();
            expect(screen.getByText("AI-Powered")).toBeInTheDocument();
            expect(screen.getByText("Mood-Based")).toBeInTheDocument();
            expect(screen.getByText("Easy to Use")).toBeInTheDocument();
        });
    });

    describe("Mood Selection", () => {
        it("should show generate button when mood is selected", async () => {
            render(<Home />);
            const happyButton = screen.getByText("Happy");

            fireEvent.click(happyButton);

            await waitFor(() => {
                expect(
                    screen.getByText("Generate Caption")
                ).toBeInTheDocument();
            });
        });

        it("should highlight selected mood", () => {
            render(<Home />);
            const happyButton = screen.getByText("Happy").closest("button")!;

            fireEvent.click(happyButton);

            expect(happyButton.className).toContain("ring-purple-500");
        });

        it("should allow changing mood selection", () => {
            render(<Home />);
            const happyButton = screen.getByText("Happy").closest("button")!;
            const sadButton = screen.getByText("Sad").closest("button")!;

            fireEvent.click(happyButton);
            expect(happyButton.className).toContain("ring-purple-500");

            fireEvent.click(sadButton);
            expect(sadButton.className).toContain("ring-purple-500");
        });

        it("should select happy mood", () => {
            render(<Home />);
            const happyButton = screen.getByText("Happy");

            fireEvent.click(happyButton);

            expect(screen.getByText("Generate Caption")).toBeInTheDocument();
        });

        it("should select sad mood", () => {
            render(<Home />);
            const sadButton = screen.getByText("Sad");

            fireEvent.click(sadButton);

            expect(screen.getByText("Generate Caption")).toBeInTheDocument();
        });

        it("should select love mood", () => {
            render(<Home />);
            const loveButton = screen.getByText("Love");

            fireEvent.click(loveButton);

            expect(screen.getByText("Generate Caption")).toBeInTheDocument();
        });

        it("should select motivational mood", () => {
            render(<Home />);
            const motivationalButton = screen.getByText("Motivational");

            fireEvent.click(motivationalButton);

            expect(screen.getByText("Generate Caption")).toBeInTheDocument();
        });

        it("should select funny mood", () => {
            render(<Home />);
            const funnyButton = screen.getByText("Funny");

            fireEvent.click(funnyButton);

            expect(screen.getByText("Generate Caption")).toBeInTheDocument();
        });
    });

    describe("Caption Generation", () => {
        it("should generate caption when button is clicked", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    caption: "Test caption",
                    mood: "happy",
                    timestamp: new Date().toISOString(),
                }),
            });

            render(<Home />);
            const happyButton = screen.getByText("Happy");
            fireEvent.click(happyButton);

            const generateButton = screen.getByText("Generate Caption");
            fireEvent.click(generateButton);

            await waitFor(() => {
                expect(screen.getByText(/Test caption/i)).toBeInTheDocument();
            });
        });

        it("should show loading state during generation", async () => {
            (global.fetch as jest.Mock).mockImplementation(
                () =>
                    new Promise((resolve) =>
                        setTimeout(
                            () =>
                                resolve({
                                    ok: true,
                                    json: async () => ({
                                        caption: "Test caption",
                                        mood: "happy",
                                        timestamp: new Date().toISOString(),
                                    }),
                                }),
                            100
                        )
                    )
            );

            render(<Home />);
            const happyButton = screen.getByText("Happy");
            fireEvent.click(happyButton);

            const generateButton = screen.getByText("Generate Caption");
            fireEvent.click(generateButton);

            expect(screen.getByText("Generating...")).toBeInTheDocument();

            await waitFor(() => {
                expect(screen.getByText(/Test caption/i)).toBeInTheDocument();
            });
        });

        it("should disable button while generating", async () => {
            (global.fetch as jest.Mock).mockImplementation(
                () =>
                    new Promise((resolve) =>
                        setTimeout(
                            () =>
                                resolve({
                                    ok: true,
                                    json: async () => ({
                                        caption: "Test caption",
                                        mood: "happy",
                                        timestamp: new Date().toISOString(),
                                    }),
                                }),
                            100
                        )
                    )
            );

            render(<Home />);
            const happyButton = screen.getByText("Happy");
            fireEvent.click(happyButton);

            const generateButton = screen.getByText("Generate Caption");
            fireEvent.click(generateButton);

            const generatingButton = screen
                .getByText("Generating...")
                .closest("button")!;
            expect(generatingButton).toBeDisabled();

            await waitFor(() => {
                expect(screen.getByText(/Test caption/i)).toBeInTheDocument();
            });
        });

        it("should call API with correct mood", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    caption: "Test caption",
                    mood: "love",
                    timestamp: new Date().toISOString(),
                }),
            });

            render(<Home />);
            const loveButton = screen.getByText("Love");
            fireEvent.click(loveButton);

            const generateButton = screen.getByText("Generate Caption");
            fireEvent.click(generateButton);

            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(
                    "/api/generate-caption",
                    expect.objectContaining({
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: expect.stringContaining("love"),
                    })
                );
            });
        });

        it("should handle API error gracefully", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 500,
            });

            render(<Home />);
            const happyButton = screen.getByText("Happy");
            fireEvent.click(happyButton);

            const generateButton = screen.getByText("Generate Caption");
            fireEvent.click(generateButton);

            await waitFor(() => {
                expect(
                    screen.getByText(
                        /Sorry, couldn't generate a caption right now/i
                    )
                ).toBeInTheDocument();
            });
        });

        it("should handle network error gracefully", async () => {
            (global.fetch as jest.Mock).mockRejectedValueOnce(
                new Error("Network error")
            );

            render(<Home />);
            const happyButton = screen.getByText("Happy");
            fireEvent.click(happyButton);

            const generateButton = screen.getByText("Generate Caption");
            fireEvent.click(generateButton);

            await waitFor(() => {
                expect(
                    screen.getByText(
                        /Sorry, couldn't generate a caption right now/i
                    )
                ).toBeInTheDocument();
            });
        });
    });

    describe("Caption Display and Actions", () => {
        beforeEach(() => {
            jest.clearAllMocks();
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => ({
                    caption: "Sunshine and smiles make everything better! ☀️✨",
                    mood: "happy",
                    timestamp: new Date().toISOString(),
                }),
            });
        });

        it("should display generated caption", async () => {
            render(<Home />);
            const happyButton = screen.getByText("Happy");
            fireEvent.click(happyButton);

            const generateButton = screen.getByText("Generate Caption");
            fireEvent.click(generateButton);

            await waitFor(() => {
                expect(
                    screen.getByText(/Sunshine and smiles/i)
                ).toBeInTheDocument();
            });
        });

        it("should show copy button when caption is generated", async () => {
            render(<Home />);
            const happyButton = screen.getByText("Happy");
            fireEvent.click(happyButton);

            const generateButton = screen.getByText("Generate Caption");
            fireEvent.click(generateButton);

            await waitFor(() => {
                const copyButtons = screen.getAllByText("Copy");
                expect(copyButtons.length).toBeGreaterThan(0);
            });
        });

        it("should copy caption to clipboard", async () => {
            const writeTextMock = jest.fn().mockResolvedValue(undefined);
            Object.defineProperty(navigator, "clipboard", {
                value: { writeText: writeTextMock },
                writable: true,
            });

            render(<Home />);
            const happyButton = screen.getByText("Happy");
            fireEvent.click(happyButton);

            const generateButton = screen.getByText("Generate Caption");
            fireEvent.click(generateButton);

            await waitFor(() => {
                expect(
                    screen.getByText(/Sunshine and smiles/i)
                ).toBeInTheDocument();
            });

            const copyButtons = screen.getAllByText("Copy");
            fireEvent.click(copyButtons[0]);

            await waitFor(() => {
                expect(writeTextMock).toHaveBeenCalledWith(
                    "Sunshine and smiles make everything better! ☀️✨"
                );
            });
        });

        it('should show "Copied!" feedback after copying', async () => {
            render(<Home />);
            const happyButton = screen.getByText("Happy");
            fireEvent.click(happyButton);

            const generateButton = screen.getByText("Generate Caption");
            fireEvent.click(generateButton);

            await waitFor(() => {
                expect(
                    screen.getByText(/Sunshine and smiles/i)
                ).toBeInTheDocument();
            });

            const copyButtons = screen.getAllByText("Copy");
            fireEvent.click(copyButtons[0]);

            await waitFor(() => {
                expect(screen.getByText("Copied!")).toBeInTheDocument();
            });
        });

        it('should show "Generate Again" button', async () => {
            render(<Home />);
            const happyButton = screen.getByText("Happy");
            fireEvent.click(happyButton);

            const generateButton = screen.getByText("Generate Caption");
            fireEvent.click(generateButton);

            await waitFor(() => {
                expect(screen.getByText("Generate Again")).toBeInTheDocument();
            });
        });

        it('should generate new caption when "Generate Again" is clicked', async () => {
            let callCount = 0;
            (global.fetch as jest.Mock).mockImplementation(async () => {
                callCount++;
                return {
                    ok: true,
                    json: async () => ({
                        caption:
                            callCount === 1
                                ? "Sunshine and smiles make everything better! ☀️✨"
                                : "Today I choose joy and gratitude! 🌟",
                        mood: "happy",
                        timestamp: new Date().toISOString(),
                    }),
                };
            });

            render(<Home />);
            const happyButton = screen.getByText("Happy");
            fireEvent.click(happyButton);

            const generateButton = screen.getByText("Generate Caption");
            fireEvent.click(generateButton);

            await waitFor(() => {
                expect(
                    screen.getByText(/Sunshine and smiles/i)
                ).toBeInTheDocument();
            });

            const generateAgainButton = screen.getByText("Generate Again");
            fireEvent.click(generateAgainButton);

            await waitFor(() => {
                expect(
                    screen.getByText(/Today I choose joy/i)
                ).toBeInTheDocument();
            });

            expect(callCount).toBe(2);
        });
    });

    describe("Accessibility", () => {
        it("should have proper button structure", () => {
            render(<Home />);
            const buttons = screen.getAllByRole("button");
            expect(buttons.length).toBeGreaterThan(0);
        });

        it("should have mood buttons that are clickable", () => {
            render(<Home />);
            const happyButton = screen.getByText("Happy").closest("button")!;
            expect(happyButton).toBeEnabled();
        });

        it("should properly disable generate button while loading", async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let resolveFunction: any;
            (global.fetch as jest.Mock).mockImplementation(
                () =>
                    new Promise((resolve) => {
                        resolveFunction = () =>
                            resolve({
                                ok: true,
                                json: async () => ({
                                    caption:
                                        "Sunshine and smiles make everything better! ☀️✨",
                                    mood: "happy",
                                    timestamp: new Date().toISOString(),
                                }),
                            });
                        setTimeout(resolveFunction, 50);
                    })
            );

            render(<Home />);
            fireEvent.click(screen.getByText("Happy"));
            fireEvent.click(screen.getByText("Generate Caption"));

            expect(screen.getByText("Generating...")).toBeInTheDocument();
            const generatingButton = screen
                .getByText("Generating...")
                .closest("button")!;
            expect(generatingButton).toBeDisabled();

            await waitFor(() => {
                expect(
                    screen.getByText(/Sunshine and smiles/i)
                ).toBeInTheDocument();
            });
        });
    });

    describe("User Flow", () => {
        it("should complete full user flow: select mood, generate, copy", async () => {
            const writeTextMock = jest.fn().mockResolvedValue(undefined);
            Object.defineProperty(navigator, "clipboard", {
                value: { writeText: writeTextMock },
                writable: true,
            });
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => ({
                    caption:
                        "Success is not final, failure is not fatal: it is the courage to continue that counts 🚀",
                    mood: "motivational",
                    timestamp: new Date().toISOString(),
                }),
            });

            render(<Home />);

            // Step 1: Select mood
            fireEvent.click(screen.getByText("Motivational"));
            expect(screen.getByText("Generate Caption")).toBeInTheDocument();

            // Step 2: Generate caption
            fireEvent.click(screen.getByText("Generate Caption"));

            await waitFor(() => {
                expect(
                    screen.getByText(/Success is not final/i)
                ).toBeInTheDocument();
            });

            // Step 3: Copy caption
            const copyButtons = screen.getAllByText("Copy");
            fireEvent.click(copyButtons[0]);

            await waitFor(() => {
                expect(screen.getByText("Copied!")).toBeInTheDocument();
            });

            expect(writeTextMock).toHaveBeenCalled();
        });
    });
});
