# MoodChick 🐥✨

![CI](https://github.com/YOUR_USERNAME/mood-chick/actions/workflows/ci.yml/badge.svg)
![Tests](https://github.com/YOUR_USERNAME/mood-chick/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/gh/YOUR_USERNAME/mood-chick/branch/main/graph/badge.svg)](https://codecov.io/gh/YOUR_USERNAME/mood-chick)

**MoodChick** is a fun, AI-powered caption and quote generator that creates social media captions based on your mood.  
Select your mood, click generate, and let AI craft the perfect line for your post!

## Features

-   🎨 Generate captions/quotes based on your mood (happy, sad, love, motivational, funny, etc.)
-   🤖 AI-powered text generation using HuggingFace `flan-t5-small` (free, lightweight)
-   📋 Copy-to-clipboard functionality
-   🔄 "Generate Again" button for endless inspiration
-   ⚡ Easily extendable with more moods or AI models
-   📱 Responsive design for desktop and mobile
-   🚀 Automated CI pipeline for code quality
-   🔒 Pre-push git hooks to ensure quality before pushing
-   🧪 Comprehensive test suite with 85%+ coverage
-   📊 Automated coverage reporting

## Table of Contents

-   [Getting Started](#getting-started)
-   [Testing](#testing)
-   [CI/CD Pipeline](#cicd-pipeline)
-   [Git Hooks](#git-hooks)
-   [Development Workflow](#development-workflow)
-   [Contributing](#contributing)

## Getting Started

### Prerequisites

-   [Bun](https://bun.sh) >= 1.0 (recommended) or Node.js >= 18
-   HuggingFace API key (optional, required for AI integration)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/YOUR_USERNAME/mood-chick.git
    cd mood-chick
    ```

2. Install dependencies:

    ```bash
    bun install
    ```

3. Set up environment variables (create `.env.local`):

    ```env
    NEXT_PUBLIC_HUGGINGFACE_API_KEY=your_api_key_here
    ```

4. Run the development server:

    ```bash
    bun dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

6. (Optional) Run tests to ensure everything is working:
    ```bash
    bun test
    ```

### Available Scripts

-   `bun dev` - Start development server with Turbopack
-   `bun build` - Build for production
-   `bun start` - Start production server
-   `bun lint` - Run ESLint
-   `bun type-check` - Run TypeScript type checking
-   `bun test` - Run all tests
-   `bun test:watch` - Run tests in watch mode
-   `bun test:coverage` - Run tests with coverage report
-   `bun test:ci` - Run tests in CI mode with coverage

## Testing

MoodChick has a comprehensive test suite to ensure code quality and prevent regressions.

### Test Coverage

-   ✅ **Unit Tests** - Testing individual functions and utilities
-   ✅ **API Route Tests** - Testing all API endpoints (90%+ coverage)
-   ✅ **Component Tests** - Testing React components (85%+ coverage)
-   ✅ **Integration Tests** - Testing complete user workflows

### Running Tests

#### Run All Tests

```bash
bun test
```

#### Run Tests in Watch Mode

Perfect for development - tests re-run automatically when files change:

```bash
bun test:watch
```

#### Run Tests with Coverage Report

```bash
bun test:coverage
```

This generates a coverage report in the `coverage/` directory. Open `coverage/lcov-report/index.html` in your browser to see detailed coverage information.

#### Run Tests in CI Mode

```bash
bun test:ci
```

### Test Structure

Tests are located alongside the code they test:

```
src/
├── app/
│   ├── __tests__/
│   │   └── page.test.tsx          # Home page component tests
│   ├── api/
│   │   └── generate-caption/
│   │       ├── __tests__/
│   │       │   └── route.test.ts  # API route tests
│   │       └── route.ts
│   └── page.tsx
└── lib/
    ├── __tests__/
    │   └── config.test.ts          # Config tests
    └── config.ts
```

### What's Tested

#### API Routes (90%+ coverage)

-   ✅ Caption generation for all moods (happy, sad, love, motivational, funny)
-   ✅ Error handling for invalid requests
-   ✅ Response format validation
-   ✅ Edge cases (missing parameters, invalid JSON, etc.)
-   ✅ Randomness in caption selection

#### Components (85%+ coverage)

-   ✅ Rendering of all UI elements
-   ✅ Mood selection and state management
-   ✅ Caption generation flow
-   ✅ Copy to clipboard functionality
-   ✅ Loading states and error handling
-   ✅ User interactions and events
-   ✅ Complete user workflows

#### Configuration & Utilities

-   ✅ Config object structure
-   ✅ Environment variable handling
-   ✅ Mood prompts validation

### Writing Tests

When adding new features, follow these guidelines:

#### 1. Test File Naming

-   Component tests: `ComponentName.test.tsx`
-   Unit tests: `fileName.test.ts`
-   Place tests in `__tests__/` directories

#### 2. Test Structure

```typescript
import { render, screen } from "@testing-library/react";
import MyComponent from "../MyComponent";

describe("MyComponent", () => {
    it("should render correctly", () => {
        render(<MyComponent />);
        expect(screen.getByText("Hello")).toBeInTheDocument();
    });
});
```

#### 3. Coverage Requirements

-   API routes: 90%+ coverage
-   Components: 85%+ coverage
-   Utilities: 90%+ coverage

### Mocking

#### Mocking API Calls

```typescript
global.fetch = jest.fn();
(global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ caption: "Test caption" }),
});
```

#### Mocking Clipboard API

The clipboard API is automatically mocked in `jest.setup.ts`.

### Coverage Thresholds

The project enforces minimum coverage thresholds:

```javascript
{
  global: {
    branches: 80,
    functions: 85,
    lines: 85,
    statements: 85,
  },
  './src/app/api/**/*.ts': {
    branches: 90,
    functions: 90,
    lines: 90,
    statements: 90,
  },
}
```

Tests will fail if coverage drops below these thresholds.

### Continuous Integration

Tests run automatically:

-   ✅ On every push to `main` or `develop`
-   ✅ On every pull request
-   ✅ Before every push (via git hook)

See the [CI/CD Pipeline](#cicd-pipeline) section for more details.

## CI/CD Pipeline

MoodChick uses GitHub Actions to automate code quality checks and ensure stability. The CI pipeline runs automatically on every push and pull request.

### Workflows

#### 1. **CI Workflow** (`.github/workflows/ci.yml`)

Runs on:

-   Push to `main` or `develop` branches
-   Pull requests to `main` or `develop` branches

**Jobs:**

##### Lint and Build

-   Tests on Node.js 18.x and 20.x
-   Runs ESLint for code quality
-   Performs TypeScript type checking
-   Builds the project to ensure compilation succeeds
-   Caches dependencies and Next.js build for faster runs
-   Uploads build artifacts (Node 20.x only)

##### Code Quality Checks

-   Checks for console statements (warning only)
-   Scans for TODO comments
-   Ensures code meets quality standards

##### Status Check

-   Final job that ensures all previous jobs passed
-   Blocks merging if any check fails

#### 2. **Test Workflow** (`.github/workflows/test.yml`)

Runs on:

-   Push to `main` or `develop` branches
-   Pull requests to `main` or `develop` branches

**Jobs:**

##### Test

-   Runs complete test suite
-   Executes type checking and linting
-   Generates coverage reports
-   Uploads coverage to Codecov
-   Comments PR with coverage details
-   Enforces coverage thresholds

##### Integration

-   Runs integration tests
-   Verifies build succeeds
-   Ensures all components work together

### CI Features

✅ **Multi-Node Testing** - Tests on Node.js 18.x and 20.x  
✅ **Smart Caching** - Caches pnpm store and Next.js build for faster runs  
✅ **Build Artifacts** - Saves build output for inspection  
✅ **Code Quality** - Automated linting and type checking  
✅ **Parallel Jobs** - Runs lint/build and code quality checks simultaneously

### CI Status Badges

Add these badges to show CI status:

```markdown
![CI](https://github.com/YOUR_USERNAME/mood-chick/actions/workflows/ci.yml/badge.svg)
```

Replace `YOUR_USERNAME` with your GitHub username.

## Git Hooks

MoodChick uses [Husky](https://typicode.github.io/husky/) to enforce code quality before commits and pushes. This ensures that only validated code reaches the repository.

### Pre-commit Hook

Runs automatically when you commit:

-   ✅ ESLint checks

```bash
git commit -m "your message"
# 🐥 Running pre-commit checks...
# 🔍 Linting...
# ✅ Linting passed!
```

### Pre-push Hook

Runs automatically before pushing to remote:

-   ✅ Complete test suite with coverage
-   ✅ Coverage threshold enforcement

```bash
git push
# 🧪 Running tests before push...
# PASS  src/app/__tests__/page.test.tsx
# PASS  src/app/api/generate-caption/__tests__/route.test.ts
# PASS  src/lib/__tests__/config.test.ts
# ✅ All tests passed!
```

### Bypassing Hooks (Not Recommended)

If you need to bypass hooks in an emergency (not recommended):

```bash
# Skip pre-commit
git commit --no-verify -m "emergency fix"

# Skip pre-push
git push --no-verify
```

**⚠️ Warning:** Bypassing hooks can introduce bugs. Use only in emergencies.

### Setting Up Hooks for Contributors

Hooks are automatically installed when running `pnpm install` thanks to the `prepare` script in `package.json`. If hooks aren't working:

```bash
# Manually reinstall Husky
pnpm run prepare
```

## Development Workflow

### Making Changes

1. **Create a new branch:**

    ```bash
    git checkout -b feature/your-feature-name
    ```

2. **Make your changes and commit:**

    ```bash
    git add .
    git commit -m "Add your feature"
    # Pre-commit hook runs linting
    ```

3. **Push your changes:**

    ```bash
    git push origin feature/your-feature-name
    # Pre-push hook runs all tests
    ```

4. **Create a Pull Request:**
    - Go to GitHub and create a PR
    - CI will automatically run all checks
    - Wait for all checks to pass before merging

### Pull Request Checks

When you open a PR, the following checks run automatically:

1. ✅ Linting (ESLint)
2. ✅ Type checking (TypeScript)
3. ✅ Build verification
4. ✅ Code quality scans
5. ✅ Multi-version Node.js testing
6. ✅ Complete test suite
7. ✅ Coverage threshold validation
8. ✅ Coverage report generation

All checks must pass before the PR can be merged.

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Clone your fork**
3. **Install dependencies:** `bun install`
4. **Create a branch:** `git checkout -b feature/amazing-feature`
5. **Make your changes**
6. **Run checks locally:**
    ```bash
    bun lint
    bun type-check
    bun test
    bun build
    ```
7. **Write tests for your changes** (if applicable)
8. **Commit your changes:** Git hooks will run automatically
9. **Push to your fork:** `git push origin feature/amazing-feature`
10. **Open a Pull Request**

### Code Quality Standards

-   Write clean, readable code
-   Follow TypeScript best practices
-   Use meaningful variable and function names
-   Comment complex logic
-   **Write tests for new features and bug fixes**
-   **Maintain or improve code coverage**
-   Ensure all CI checks pass
-   Test your changes locally before pushing

### Commit Message Guidelines

Use clear, descriptive commit messages:

```bash
# Good
git commit -m "Add mood selector component"
git commit -m "Fix caption generation API error"
git commit -m "Update README with installation steps"

# Bad
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
```

## Tech Stack

-   **Framework:** [Next.js 15](https://nextjs.org/)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS 4
-   **Icons:** Lucide React
-   **AI Model:** HuggingFace `flan-t5-small`
-   **Testing:** Jest + React Testing Library
-   **CI/CD:** GitHub Actions
-   **Git Hooks:** Husky
-   **Package Manager:** Bun

## Project Structure

```
mood-chick/
├── .github/
│   └── workflows/
│       ├── ci.yml          # CI pipeline configuration
│       └── test.yml        # Test workflow
├── .husky/                 # Git hooks
│   ├── pre-commit         # Linting before commit
│   └── pre-push           # Tests before push
├── __mocks__/             # Jest mocks
│   ├── fileMock.js
│   └── styleMock.js
├── public/                # Static assets
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── __tests__/    # Component tests
│   │   ├── api/          # API routes
│   │   │   └── generate-caption/
│   │   │       ├── __tests__/  # API route tests
│   │   │       └── route.ts
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   └── lib/              # Utility functions
│       ├── __tests__/    # Unit tests
│       └── config.ts
├── coverage/             # Test coverage reports (generated)
├── jest.config.ts        # Jest configuration
├── jest.setup.ts         # Jest setup file
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── eslint.config.mjs     # ESLint configuration
└── README.md             # This file
```

## Troubleshooting

### Git Hooks Not Running

```bash
# Reinstall Husky
bun run prepare

# Check hook permissions
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

### CI Checks Failing

```bash
# Run checks locally to debug
bun lint
bun type-check
bun test
bun build
```

### Tests Failing

```bash
# Run tests in watch mode to debug
bun test:watch

# Run specific test file
bun test path/to/test.test.ts

# Run with coverage to see what's missing
bun test:coverage
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
bun install

# Rebuild
bun build
```

## License

This project is open source and available under the MIT License.

## Acknowledgments

-   Built with ❤️ using Next.js and React
-   AI powered by HuggingFace
-   Icons by Lucide

---

Made with 🐥 by the MoodChick team
