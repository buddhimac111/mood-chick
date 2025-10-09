/**
 * @jest-environment @edge-runtime/jest-environment
 */

import { POST } from "../route";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createMockRequest = (body: any) => {
    return {
        json: async () => body,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
};

describe("POST /api/generate-caption", () => {
    it("should generate a caption for happy mood", async () => {
        const request = createMockRequest({ mood: "happy" });
        const response = await POST(request);

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty("caption");
        expect(data).toHaveProperty("mood", "happy");
        expect(data).toHaveProperty("timestamp");
        expect(typeof data.caption).toBe("string");
        expect(data.caption.length).toBeGreaterThan(0);
    });

    it("should generate a caption for sad mood", async () => {
        const request = createMockRequest({ mood: "sad" });
        const response = await POST(request);

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data.mood).toBe("sad");
        expect(typeof data.caption).toBe("string");
    });

    it("should generate a caption for love mood", async () => {
        const request = createMockRequest({ mood: "love" });
        const response = await POST(request);

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data.mood).toBe("love");
        expect(typeof data.caption).toBe("string");
    });

    it("should generate a caption for motivational mood", async () => {
        const request = createMockRequest({ mood: "motivational" });
        const response = await POST(request);

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data.mood).toBe("motivational");
        expect(typeof data.caption).toBe("string");
    });

    it("should generate a caption for funny mood", async () => {
        const request = createMockRequest({ mood: "funny" });
        const response = await POST(request);

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data.mood).toBe("funny");
        expect(typeof data.caption).toBe("string");
    });

    it("should default to happy mood for unknown mood", async () => {
        const request = createMockRequest({ mood: "unknown-mood" });
        const response = await POST(request);

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data.mood).toBe("unknown-mood");
        expect(typeof data.caption).toBe("string");
        expect(data.caption.length).toBeGreaterThan(0);
    });

    it("should return correct timestamp format", async () => {
        const request = createMockRequest({ mood: "happy" });
        const response = await POST(request);

        const data = await response.json();
        expect(data.timestamp).toBeDefined();
        expect(() => new Date(data.timestamp)).not.toThrow();
        expect(new Date(data.timestamp).toISOString()).toBe(data.timestamp);
    });

    it("should handle missing mood parameter gracefully", async () => {
        const request = createMockRequest({});
        const response = await POST(request);

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty("caption");
    });

    it("should handle invalid JSON body", async () => {
        const request = {
            json: async () => {
                throw new Error("Invalid JSON");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;
        const response = await POST(request);

        expect(response.status).toBe(500);
        const data = await response.json();
        expect(data).toHaveProperty("error", "Failed to generate caption");
    });

    it("should return different captions on multiple calls (randomness)", async () => {
        const captions = new Set();

        for (let i = 0; i < 10; i++) {
            const request = createMockRequest({ mood: "happy" });
            const response = await POST(request);
            const data = await response.json();
            captions.add(data.caption);
        }

        // With 10 requests and 5 possible captions, we should get at least 2 different ones
        expect(captions.size).toBeGreaterThanOrEqual(2);
    }, 15000);

    it("should include mood in response even when defaulted", async () => {
        const request = createMockRequest({ mood: "custom-mood" });
        const response = await POST(request);

        const data = await response.json();
        expect(data.mood).toBe("custom-mood");
    });

    it("should handle empty mood string", async () => {
        const request = createMockRequest({ mood: "" });
        const response = await POST(request);

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty("caption");
    });

    it("should return valid JSON response", async () => {
        const request = createMockRequest({ mood: "happy" });
        const response = await POST(request);

        expect(response.headers.get("content-type")).toContain(
            "application/json"
        );
    });

    it("should have caption property as string", async () => {
        const moods = ["happy", "sad", "love", "motivational", "funny"];

        for (const mood of moods) {
            const request = createMockRequest({ mood });
            const response = await POST(request);
            const data = await response.json();
            expect(typeof data.caption).toBe("string");
            expect(data.caption.length).toBeGreaterThan(10);
        }
    }, 10000);

    it("should not include error when successful", async () => {
        const request = createMockRequest({ mood: "happy" });
        const response = await POST(request);

        const data = await response.json();
        expect(data).not.toHaveProperty("error");
    });

    it("should handle additional properties in request body", async () => {
        const request = createMockRequest({
            mood: "happy",
            extraProperty: "should be ignored",
            anotherOne: 123,
        });
        const response = await POST(request);

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data.mood).toBe("happy");
        expect(data).toHaveProperty("caption");
    });
});
