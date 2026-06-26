# TinkerHub Core Team Application Portal

The TinkerHub Campus Core Team Application Portal for the Cape college of engineering alappuzha is a multi-step web application used for core team recruitment.

The application uses a brutalist design system and integrates directly with Google Forms to collect submissions without requiring a dedicated backend server.

## Features

- **Brutalist UI**: High-contrast, responsive interface with micro-interactions.
- **Dark Mode**: Integrated light and dark themes using CSS custom properties.
- **Dynamic Multi-Step Form**: Form routing adjusts based on the applicant's selected roles.
- **Multi-Role Support**: Compiles relevant questions when an applicant selects multiple roles.
- **Serverless Integration**: Submits data directly to a Google Form using payload mapping and hidden iframes.
- **Client-side Validation**: Verifies required fields and role-specific answers prior to submission.

## Technology Stack

- **HTML5**: Semantic document structure.
- **CSS3**: Variables, Flexbox/Grid layouts, and CSS animations.
- **Vanilla JavaScript**: DOM manipulation, state management, validation, and form submission logic.

## Getting Started

The project is a static web application. No build step is required.

1. Clone the repository:
   ```bash
   git clone https://github.com/Lunarmist-byte/CCEA-Tinkerhubsite
   ```
2. Serve the directory locally:
   ```bash
   npx serve .
   ```
3. Access the application at `http://localhost:3000`.

## Architecture

1. **State Management**: Application state including current step, selected roles, and input answers is managed within `script.js`.
2. **Google Forms Mapping**: Form data is mapped to specific Google Form `entry.*` IDs. Array fields are processed into multiple hidden inputs.
3. **Form Submission**: Submissions are executed by generating a hidden form containing the mapped data and necessary Google Forms tracking metadata (`pageHistory`, `fvv`, `fbzx`). The payload targets a hidden iframe to prevent page redirection upon submission.

## Made by Lunarmist-byte

This project was developed by Amal S Kumar.
- [GitHub](https://github.com/Lunarmist-byte)
- [LinkedIn](https://www.linkedin.com/in/amal-s-kumar-ba69a1290/)
