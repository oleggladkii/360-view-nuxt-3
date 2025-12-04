## 0. Project-Specific
* 	**Stack:** Nuxt 3 + Supabase + Tailwind CSS + Pinia + TypeScript.
* 	**Code Style:** Prettier (double quotes, semicolons, 2 spaces, 100 cols).
* 	**Architecture:** 
    *   **Nuxt 3:** File-system based routing, server-side rendering (SSR) capabilities, auto-imports.
    *   **Supabase:** Backend-as-a-Service (BaaS) for Authentication, Database (PostgreSQL), and Realtime subscriptions.
    *   **Tailwind CSS:** Utility-first CSS framework for styling.
    *   **Pinia:** State management.
*   **Structure:** 
    ```
    src/
        assets/         # Static assets (images, fonts, global CSS)
        components/     # Reusable Vue components
        composables/    # Auto-imported Vue composables
        layouts/        # Nuxt layouts
        middleware/     # Route middleware
        pages/          # File-system based routing
        plugins/        # Nuxt plugins
        public/         # Publicly accessible files
        server/         # Server routes (API endpoints)
        stores/         # Pinia stores
        utils/          # Auto-imported utility functions
        app.vue         # Root component
        error.vue       # Error page
    ```
    **Rules**
    *	**Composables:** Use `composables/` for shared logic. They are auto-imported.
    *	**Server Routes:** Use `server/api/` for backend logic and Supabase interactions that need to be secure.
    *	**Components:** Keep components focused on UI. Business logic should move to composables or stores.
    *   **Tailwind:** Use utility classes for styling. Avoid custom CSS unless necessary.
    *   **Supabase:** Use the `@nuxtjs/supabase` module composables (`useSupabaseClient`, `useSupabaseUser`) for client-side interactions.

---

## 1. Core Coding Principles

*   **Language:** All code, comments, variable names, function names, class names, and commit messages must be **strictly in English**.
*   **Idiomatic Style:**
    *   Write code that adheres to the idiomatic style, conventions, and official style guides of the target language. This includes formatting, naming, and general structure.
    *   Assume a linter or formatter will eventually run; aim to produce code that is already close to passing common linting rules.
*   **Clarity and Readability:**
    *   Prioritize clarity, readability, and maintainability over unnecessary "cleverness" or extreme brevity if it sacrifices understanding.
    *   Write self-documenting code.
    *   Follow the **Principle of Least Surprise**: code should behave in a way that users and other developers would naturally expect.
*   **Conciseness:**
    *   Avoid superfluous adjectives, adverbs, or phrases in code, comments, or explanations that do not add essential technical information. Be direct.
*   **Return Early Pattern:** Always prefer the "return early" pattern to reduce nesting and improve code flow legibility.
    *   *Example:* Instead of `if (condition) { /* long block */ } else { return; }`, use `if (!condition) { return; } /* long block */`.

---

## 2. Naming and Structure

*   **Naming Conventions:**
    *   Use descriptive, clear, and unambiguous names for variables, functions, classes, constants, and methods. Prefer explicit names over abbreviated ones.
    *   Follow standard naming patterns of the target language.
    *   Use verbs or verb phrases for functions/methods that perform an action. Use nouns or noun phrases for variables, classes, and constants.
*   **Modularity and Responsibility (SRP):**
    *   Keep functions, methods, and classes small and focused on a **single, well-defined responsibility (Single Responsibility Principle)**.
    *   Decompose complex tasks into smaller, cohesive units.
    *   Group related functionality logically (e.g., within the same file or module).
*   **DRY (Don't Repeat Yourself):** Avoid code duplication. Re-use code through functions, classes, helper utilities, or modules.
*   **KISS (Keep It Simple, Stupid):** Favor simpler solutions over complex ones, as long as they meet requirements.

---

## 3. Error Handling and Validation

*   **Explicit Error Handling:**
    *   Implement robust and explicit error handling. Avoid silent failures.
    *   Use language-appropriate mechanisms like `try-catch` blocks, error return values, or `Option`/`Result` types.
*   **Fail Fast:**
    *   Validate inputs and preconditions early in a function or method.
    *   Return or throw errors at the earliest point of failure rather than deep inside nested blocks.
*   **Meaningful Errors:**
    *   Provide clear, specific, and useful error messages (in English) that aid in debugging.
    *   Use specific error types/classes when appropriate, rather than generic ones (e.g., `FileNotFoundError` instead of a generic `Exception`).
*   **Logging:** Log errors with sufficient context for troubleshooting when appropriate for the application type.

---

## 4. Comments and Documentation

*   **Purposeful Comments:**
    *   Write comments to explain the "why" (intent, design decisions, non-obvious logic) rather than the "what" (which the code itself should make clear).
    *   Document complex algorithms, business rules, edge cases, or trade-offs made.
*   **API Documentation:** For public functions, methods, and classes, consider using standard documentation formats to describe purpose, parameters, return values, and any exceptions thrown.
*   **Conciseness:** Keep comments concise and to the point.
*   **Maintenance:** Keep comments up-to-date with code changes. Remove outdated comments.
*   **No Dead Code:** Do not include commented-out code blocks. Use version control for history.

---

## 5. Security Best Practices

*   **Input Validation and Sanitization:**
    *   Validate and sanitize ALL external inputs (user input, API responses, file contents) to prevent injection attacks (XSS, SQL Injection, etc.) and other vulnerabilities.
    *   Check boundaries and expected formats.
*   **No Hardcoded Secrets:** **Never** hardcode sensitive information (API keys, passwords, tokens, connection strings). Use environment variables, configuration files, or secret management services. Clearly mark placeholders (e.g., `YOUR_API_KEY_HERE`) and instruct where to replace them.
*   **Parameterized Queries:** Always use parameterized queries or prepared statements for database interactions to prevent SQL injection.
*   **Least Privilege:** Follow the principle of least privilege for file access, database permissions, and API scopes.
*   **Dependency Management:** Keep dependencies updated to patch known vulnerabilities. Be mindful of adding new dependencies and their security implications.
*   **Secure Defaults:** Favor secure defaults (e.g., HTTPS over HTTP, strong encryption algorithms). Avoid disabling security features (e.g., SSL/TLS certificate validation) without strong justification.

---

## 6. Performance and Optimization

*   **Clarity First:** Write readable and maintainable code first.
*   **Optimize When Necessary:** Avoid premature optimization. Profile and measure performance to identify bottlenecks before attempting optimizations.
*   **Algorithmic Efficiency:** Be mindful of time and space complexity for critical code paths. If a simple solution is inherently inefficient (e.g., O(n^2) when O(n log n) is readily available and not significantly more complex), consider or propose the more efficient alternative.
*   **Resource Management:** Ensure proper handling and release of resources (e.g., file handles, network connections, database connections).

---

## 7. Dependencies, Imports, and Configuration

*   **Minimal Dependencies:**
    *   Only import or require libraries/modules that are strictly necessary for the task.
    *   Prefer solutions using the language's standard library whenever possible and efficient.
*   **External Libraries:**
    *   If using external libraries, choose popular, well-maintained, and reputable ones appropriate for the task.
    *   Mention the library and, if necessary, how to install it.
    *   Justify the use of an external library if the functionality is complex to replicate with standard tools.
*   **Configuration:** Use environment variables or dedicated configuration files for application settings rather than hardcoding them.

---

## 8. Testing Considerations

*   **Goals:** Clarity, determinism, and maintainability.
*   **Simplicity:** Tests should be "boringly" explicit (setup, execute, verify). Minimize logic in tests.
*   **Determinism:** Use fixed, hardcoded data (IDs, timestamps) to ensure repeatability. Avoid `Math.random()` or `Date.now()`.
*   **Assertions:** Prefer static expected results (e.g., raw JSON strings) over dynamically constructed ones.
*   **Coverage:** Test happy paths, edge cases, filtering, ordering, and error conditions.
*   **Business Outcome:** Validate the business logic result, not just implementation details.

---

## 9. LLM Interaction and Output Format

*   **Complete and Usable Code:**
    *   Strive to provide complete, functional code snippets or solutions that can be readily used or integrated.
    *   Include necessary imports, declarations, and basic setup.
*   **Explanations:**
    *   If explanations are requested or beneficial, provide them concisely and directly, typically after the code block.
    *   Focus on explaining the "why" of significant design choices, complex logic, or trade-offs.
*   **Handling Ambiguity:** If a request is ambiguous or lacks crucial details:
    *   Ask clarifying questions if interaction is possible.
    *   Otherwise, explicitly state any reasonable assumptions made to proceed.
*   **Alternatives:** If multiple valid approaches exist, you may briefly mention key alternatives and justify your chosen solution, especially if it has significant implications.
*   **Placeholders:** Clearly mark any placeholders in the code (e.g., `YOUR_API_KEY`, `// implement specific logic here`) and explain what they represent.

---

## 10. LLM Attitude and Proactivity

*   **Role of Expert Assistant:** Act as an experienced, collaborative, and helpful senior developer.
*   **Constructive Proactivity:**
    *   If you identify an obvious improvement, a potential issue (e.g., a security risk, a performance pitfall not mentioned in the prompt), or a more idiomatic way to implement something in the target language, feel free to suggest or implement it, briefly explaining the reasoning.
*   **Avoid TODO/FIXME:** Do not include `TODO`, `FIXME`, or similar placeholder comments in the final generated code unless they are part of a formal, explicitly requested issue-tracking workflow or a clear instruction to the user.