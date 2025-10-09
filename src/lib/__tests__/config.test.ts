import { config, moodPrompts } from "../config";

describe("config", () => {
    describe("huggingface configuration", () => {
        it("should have huggingface configuration object", () => {
            expect(config.huggingface).toBeDefined();
            expect(typeof config.huggingface).toBe("object");
        });

        it("should have apiKey property", () => {
            expect(config.huggingface).toHaveProperty("apiKey");
            expect(typeof config.huggingface.apiKey).toBe("string");
        });

        it("should have model property with default value", () => {
            expect(config.huggingface).toHaveProperty("model");
            expect(typeof config.huggingface.model).toBe("string");
            // Should have a default model name
            expect(config.huggingface.model).toBeTruthy();
        });

        it("should have apiUrl property with default value", () => {
            expect(config.huggingface).toHaveProperty("apiUrl");
            expect(typeof config.huggingface.apiUrl).toBe("string");
            expect(config.huggingface.apiUrl).toMatch(/^https?:\/\//);
        });

        it("should use environment variables or defaults", () => {
            const { apiKey, model, apiUrl } = config.huggingface;

            // These should be either from env or defaults
            if (!process.env.HUGGINGFACE_API_KEY) {
                expect(apiKey).toBe("");
            }

            if (!process.env.HUGGINGFACE_MODEL) {
                expect(model).toBe("google/flan-t5-small");
            }

            if (!process.env.HUGGINGFACE_API_URL) {
                expect(apiUrl).toContain("huggingface.co");
            }
        });
    });

    describe("app configuration", () => {
        it("should have app configuration object", () => {
            expect(config.app).toBeDefined();
            expect(typeof config.app).toBe("object");
        });

        it("should have correct app name", () => {
            expect(config.app.name).toBe("MoodChick");
        });

        it("should have app description", () => {
            expect(config.app.description).toBeDefined();
            expect(typeof config.app.description).toBe("string");
            expect(config.app.description.length).toBeGreaterThan(0);
        });

        it("should have version property", () => {
            expect(config.app.version).toBeDefined();
            expect(typeof config.app.version).toBe("string");
            // Check if version follows semver-like pattern
            expect(config.app.version).toMatch(/^\d+\.\d+\.\d+$/);
        });
    });

    describe("ui configuration", () => {
        it("should have ui configuration object", () => {
            expect(config.ui).toBeDefined();
            expect(typeof config.ui).toBe("object");
        });

        it("should have animationDuration as a number", () => {
            expect(config.ui.animationDuration).toBeDefined();
            expect(typeof config.ui.animationDuration).toBe("number");
            expect(config.ui.animationDuration).toBeGreaterThan(0);
        });

        it("should have maxRetries as a number", () => {
            expect(config.ui.maxRetries).toBeDefined();
            expect(typeof config.ui.maxRetries).toBe("number");
            expect(config.ui.maxRetries).toBeGreaterThanOrEqual(0);
        });

        it("should have defaultTimeout as a number", () => {
            expect(config.ui.defaultTimeout).toBeDefined();
            expect(typeof config.ui.defaultTimeout).toBe("number");
            expect(config.ui.defaultTimeout).toBeGreaterThan(0);
        });

        it("should have reasonable timeout value", () => {
            expect(config.ui.defaultTimeout).toBeGreaterThan(1000);
            expect(config.ui.defaultTimeout).toBeLessThan(60000);
        });
    });

    describe("complete config structure", () => {
        it("should have all required top-level properties", () => {
            expect(config).toHaveProperty("huggingface");
            expect(config).toHaveProperty("app");
            expect(config).toHaveProperty("ui");
        });

        it("should not have unexpected properties", () => {
            const expectedKeys = ["huggingface", "app", "ui"];
            const actualKeys = Object.keys(config);
            expect(actualKeys.sort()).toEqual(expectedKeys.sort());
        });
    });
});

describe("moodPrompts", () => {
    it("should be defined", () => {
        expect(moodPrompts).toBeDefined();
        expect(typeof moodPrompts).toBe("object");
    });

    it("should have prompt for happy mood", () => {
        expect(moodPrompts.happy).toBeDefined();
        expect(typeof moodPrompts.happy).toBe("string");
        expect(moodPrompts.happy.toLowerCase()).toContain("happy");
    });

    it("should have prompt for sad mood", () => {
        expect(moodPrompts.sad).toBeDefined();
        expect(typeof moodPrompts.sad).toBe("string");
        expect(moodPrompts.sad.toLowerCase()).toContain("sad");
    });

    it("should have prompt for love mood", () => {
        expect(moodPrompts.love).toBeDefined();
        expect(typeof moodPrompts.love).toBe("string");
        expect(moodPrompts.love.toLowerCase()).toContain("romantic");
    });

    it("should have prompt for motivational mood", () => {
        expect(moodPrompts.motivational).toBeDefined();
        expect(typeof moodPrompts.motivational).toBe("string");
        expect(moodPrompts.motivational.toLowerCase()).toContain(
            "motivational"
        );
    });

    it("should have prompt for funny mood", () => {
        expect(moodPrompts.funny).toBeDefined();
        expect(typeof moodPrompts.funny).toBe("string");
        expect(moodPrompts.funny.toLowerCase()).toContain("funny");
    });

    it("should have exactly 5 mood prompts", () => {
        const prompts = Object.keys(moodPrompts);
        expect(prompts.length).toBe(5);
    });

    it("should have all expected moods", () => {
        const expectedMoods = ["happy", "sad", "love", "motivational", "funny"];
        const actualMoods = Object.keys(moodPrompts);
        expect(actualMoods.sort()).toEqual(expectedMoods.sort());
    });

    it("should have non-empty prompts", () => {
        Object.values(moodPrompts).forEach((prompt) => {
            expect(prompt.length).toBeGreaterThan(10);
        });
    });

    it("should have prompts that mention social media", () => {
        Object.values(moodPrompts).forEach((prompt) => {
            expect(prompt.toLowerCase()).toContain("social media");
        });
    });

    it("should have prompts that mention caption", () => {
        Object.values(moodPrompts).forEach((prompt) => {
            expect(prompt.toLowerCase()).toContain("caption");
        });
    });

    it("should match mood types from config", () => {
        const configMoods = ["happy", "sad", "love", "motivational", "funny"];
        const promptMoods = Object.keys(moodPrompts);
        expect(promptMoods.sort()).toEqual(configMoods.sort());
    });
});
