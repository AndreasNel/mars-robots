# Copilot Instructions & Style Guide

Welcome, Copilot! Please follow these guidelines when contributing code to this repository.

## Style Guide

- **Modules:** Use ES Modules (`.js` with `export`/`import`) for all files.
- **Formatting:**
  - 2 spaces for indentation
  - Use semicolons at the end of statements
  - Single quotes for strings
- **Naming:**
  - Variables & functions: `camelCase`
  - Classes: `PascalCase`
  - Constants: `UPPER_CASE`
- **Comments:**
  - Use JSDoc for function and class documentation
  - Write clear, concise comments for complex code blocks
- **Best Practices:**
  - Prefer `const` and `let` over `var`
  - Avoid magic numbers; use named constants
  - Write small, single-purpose functions
  - Validate all user input

## Project Structure

- All source code should be placed in the `src/` directory
- Entry point is `src/index.js`
- Tests (if any) should go in `test/`

## Copilot Prompts

- When generating code, follow the structure and conventions above
- If unsure about a function or API, add a `TODO` comment

Thank you!
