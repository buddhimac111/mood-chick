// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
import { ReadableStream } from "stream/web";

// Polyfill TextEncoder/TextDecoder for Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextEncoder = TextEncoder as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextDecoder = TextDecoder as any;

// Polyfill ReadableStream for Next.js Edge Runtime
if (!global.ReadableStream) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.ReadableStream = ReadableStream as any;
}

// Mock crypto.randomUUID for Next.js
if (!global.crypto) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.crypto = {} as any;
}
if (!global.crypto.randomUUID) {
    global.crypto.randomUUID = () => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };
}

// Mock window.matchMedia - only in browser environments
if (typeof window !== "undefined") {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
        return [];
    }
    unobserve() {}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

// Mock clipboard API - only in browser environments
if (typeof navigator !== "undefined" && !navigator.clipboard) {
    Object.defineProperty(navigator, "clipboard", {
        value: {
            writeText: jest.fn().mockResolvedValue(undefined),
            readText: jest.fn().mockResolvedValue(""),
        },
        writable: true,
        configurable: true,
    });
}

// Suppress console errors in tests (optional)
const originalError = console.error;
beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error = (...args: any[]) => {
        if (
            typeof args[0] === "string" &&
            (args[0].includes("Warning: ReactDOM.render") ||
                args[0].includes(
                    "Not implemented: HTMLFormElement.prototype.submit"
                ))
        ) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});
