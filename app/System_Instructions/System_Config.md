### Styling

- **Method:** Use **Tailwind CSS ONLY**.
- **Setup:** Must load Tailwind with `<script src="https://cdn.tailwindcss.com"></script>` in `index.html`. Do not generate any Tailwind configuration code.
- **Guidance:** Implement layout, color palette, and specific styles based on the web app's features. Implement animations with Tailwind, if possible.

### Libraries

- Use `d3` for data visualization.
- Use `recharts` for charts.

### Images

- Use `https://picsum.photos/width/height` for placeholder images.

PROMPT START (SYSTEM INSTRUCTION)
Architectural Mandate: The Unidirectional Dependency Rule
Core Rule: To prevent recurring SyntaxError: Missing initializer errors caused by circular dependencies, this project will strictly adhere to a unidirectional (one-way) data and import flow. The project's architecture is a hierarchy, and imports must only flow downwards.
The Project Hierarchy (from top to bottom):
pages/ (Top Level):
Can Import From: components/, hooks/, engine/, utils/, types/, constants/.
CANNOT Import From: Other pages/.
components/ (Mid Level):
Can Import From: Other components/ (if they are smaller, "UI primitive" components), hooks/, engine/, utils/, types/, constants/.
CANNOT Import From: pages/.
engine/ & hooks/ & utils/ (Low Level):
Can Import From: types/, constants/, other utils/.
CANNOT Import From: pages/, components/, hooks/ (hooks can't import other hooks that depend on components), engine/ (engine logic should be self-contained).
types/ & constants/ (Foundation Level):
Can Import From: Nothing (except other types within types/).
CANNOT Import From: Any other directory. These are the foundation and must have zero outgoing dependencies.
Actionable Directive: Before writing any import statement, you must mentally verify that it respects this downward flow. If an import would violate this rule, it is a sign of an architectural problem that must be solved by lifting state up or refactoring the component structure, not by forcing the import.


Objective: Debug and Eliminate a Circular Dependency Error
Context: We are encountering a recurring Uncaught SyntaxError: Missing initializer in const declaration. This is a critical sign of a circular dependency issue in our module imports. Your task is to act as a Software Architect and perform a dependency audit to find and fix the root cause.
Your Analysis Protocol:
Identify Potential Culprits: The error is likely occurring between two or more files that import each other. The files mentioned in the current task (e.g., prepilotEngine.ts, PlaygroundPage.tsx) are the primary suspects.
Map the Import Graph: For each suspect file, perform the following analysis:
List all of its import statements.
For each import, list what that imported file then imports.
Continue this process until you find a loop.
Example Analysis Thought Process:
PlaygroundPage.tsx imports preflightValidation from prepilotEngine.ts.
Does prepilotEngine.ts import anything from PlaygroundPage.tsx? No. Okay.
Does prepilotEngine.ts import anything from a file that then imports from PlaygroundPage.tsx?
prepilotEngine.ts imports PLATFORMS from constants.ts.
Let's check constants.ts. Does it import anything from PlaygroundPage.tsx? If it does, that is the circular dependency.
Propose a Refactoring Solution: Once you have identified the loop, propose a solution based on the Unidirectional Dependency Rule. The solution is almost always one of the following:
Move the Shared Logic Down: If a constant, type, or utility function is needed by two files at different levels, move that logic down to a lower-level file that both can safely import from. For example, if both prepilotEngine.ts and PlaygroundPage.tsx need a utility function, it should be moved to src/utils/.
Lift State Up: If a component needs data from its parent page, that data should be passed down as a prop, not imported directly.
Create a New Foundational File: If a shared type or constant is causing the issue, create a new file for it at the lowest level (e.g., src/types/index.ts or src/constants.ts) and have both files import from there.
Execute the Fix: Apply the proposed refactoring to the code, ensuring the circular import is broken and the Unidirectional Dependency Rule is restored.