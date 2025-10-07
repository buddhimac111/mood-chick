# MoodChick 🐥✨

![CI](https://github.com/YOUR_USERNAME/mood-chick/actions/workflows/ci.yml/badge.svg)

**MoodChick** is a fun, AI-powered caption and quote generator that creates social media captions based on your mood.  
Select your mood, click generate, and let AI craft the perfect line for your post!  

## Features

- 🎨 Generate captions/quotes based on your mood (happy, sad, love, motivational, funny, etc.)  
- 🤖 AI-powered text generation using HuggingFace `flan-t5-small` (free, lightweight)  
- 📋 Copy-to-clipboard functionality  
- 🔄 "Generate Again" button for endless inspiration  
- ⚡ Easily extendable with more moods or AI models  
- 📱 Responsive design for desktop and mobile
- 🚀 Automated CI pipeline for code quality
- 🔒 Pre-push git hooks to ensure quality before pushing

## Table of Contents

- [Getting Started](#getting-started)
- [CI/CD Pipeline](#cicd-pipeline)
- [Git Hooks](#git-hooks)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm (recommended) or npm/yarn
- HuggingFace API key (optional, required for AI integration)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/mood-chick.git
   cd mood-chick
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. Set up environment variables (create `.env.local`):
   ```env
   NEXT_PUBLIC_HUGGINGFACE_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking
- `pnpm test` - Run tests (placeholder for now)

## CI/CD Pipeline

MoodChick uses GitHub Actions to automate code quality checks and ensure stability. The CI pipeline runs automatically on every push and pull request.

### Workflows

#### 1. **CI Workflow** (`.github/workflows/ci.yml`)

Runs on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Jobs:**

##### Lint and Build
- Tests on Node.js 18.x and 20.x
- Runs ESLint for code quality
- Performs TypeScript type checking
- Builds the project to ensure compilation succeeds
- Caches dependencies and Next.js build for faster runs
- Uploads build artifacts (Node 20.x only)

##### Code Quality Checks
- Checks for console statements (warning only)
- Scans for TODO comments
- Ensures code meets quality standards

##### Status Check
- Final job that ensures all previous jobs passed
- Blocks merging if any check fails

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
- ✅ ESLint checks

```bash
git commit -m "your message"
# 🐥 Running pre-commit checks...
# 🔍 Linting...
# ✅ Linting passed!
```

### Pre-push Hook

Runs automatically before pushing to remote:
- ✅ TypeScript type checking
- ✅ ESLint checks
- ✅ Production build

```bash
git push
# 🐥 Running pre-push checks...
# 📝 Type checking...
# 🔍 Linting...
# 🏗️  Building project...
# ✅ All checks passed! Pushing...
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
   # Pre-push hook runs type-check, lint, and build
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

All checks must pass before the PR can be merged.

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Clone your fork**
3. **Install dependencies:** `pnpm install`
4. **Create a branch:** `git checkout -b feature/amazing-feature`
5. **Make your changes**
6. **Run checks locally:**
   ```bash
   pnpm lint
   pnpm type-check
   pnpm build
   ```
7. **Commit your changes:** Git hooks will run automatically
8. **Push to your fork:** `git push origin feature/amazing-feature`
9. **Open a Pull Request**

### Code Quality Standards

- Write clean, readable code
- Follow TypeScript best practices
- Use meaningful variable and function names
- Comment complex logic
- Ensure all CI checks pass
- Test your changes locally before pushing

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

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **AI Model:** HuggingFace `flan-t5-small`
- **CI/CD:** GitHub Actions
- **Git Hooks:** Husky
- **Package Manager:** pnpm

## Project Structure

```
mood-chick/
├── .github/
│   └── workflows/
│       └── ci.yml          # CI pipeline configuration
├── .husky/                 # Git hooks
│   ├── pre-commit         # Linting before commit
│   └── pre-push           # Full checks before push
├── public/                # Static assets
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   └── lib/              # Utility functions
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── eslint.config.mjs     # ESLint configuration
└── README.md             # This file
```

## Troubleshooting

### Git Hooks Not Running

```bash
# Reinstall Husky
pnpm run prepare

# Check hook permissions
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

### CI Checks Failing

```bash
# Run checks locally to debug
pnpm lint
pnpm type-check
pnpm build
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
pnpm install

# Rebuild
pnpm build
```

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with ❤️ using Next.js and React
- AI powered by HuggingFace
- Icons by Lucide

---

Made with 🐥 by the MoodChick team
