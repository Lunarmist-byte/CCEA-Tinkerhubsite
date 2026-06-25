# TinkerHub Core Team Application Portal 🚀

Welcome to the **TinkerHub Campus Core Team Application Portal** for the College of Engineering and Management, Punnapra. This is a dynamic, multi-step web application built to streamline the recruitment process for new core team members. 

It features a modern brutalist design, dynamic role-based question routing, and direct, serverless integration with Google Forms to securely collect applications.

## 🌟 Features

- **Modern Brutalist UI**: A bold, high-contrast, and responsive interface that stands out, complete with micro-interactions and hover effects.
- **Dark Mode Support**: Seamlessly toggle between light and dark themes. The design fully adapts to provide an optimal viewing experience.
- **Dynamic Multi-Step Form**: Users are guided through a structured application process. The form dynamically routes applicants to specific questions based on the role(s) they select.
- **Multi-Role Application**: Applicants can apply for multiple roles at once (e.g., Learning Coordinator and Outreach Lead), and the form will intelligently compile all required questions.
- **Serverless Google Forms Integration**: Form submissions are securely POSTed directly to a Google Form using hidden iframes and payload formatting. No backend server is required!
- **Real-time Validation**: Ensures all required fields, including role-specific questions, are answered before allowing the user to proceed.

## 🛠️ Technology Stack

- **HTML5**: Semantic structure.
- **CSS3**: Custom properties (variables) for theming, Flexbox/Grid for layout, and modern animations.
- **Vanilla JavaScript**: DOM manipulation, form state management, validation, and Google Forms integration logic.

## 🚀 Getting Started

Since this is a static web application, no complex build tools or backend environments are needed.

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```
2. Open `index.html` in your favorite browser, or serve it locally using a simple HTTP server:
   ```bash
   npx serve .
   ```
3. The application will run at `http://localhost:3000`.

## ⚙️ How it Works

1. **State Management**: The application state (current step, selected roles, answers) is managed entirely in `script.js`.
2. **Google Forms Mapping**: The form data is mapped to specific Google Form `entry.*` IDs. When the user hits submit, the JavaScript dynamically generates a hidden form, populates it with the mapped data (handling array fields automatically), and submits it to a hidden iframe.
3. **Required Fields**: To satisfy Google Forms' strict validation on multi-page forms, the submission includes necessary metadata (`pageHistory`, `fvv`, `fbzx`).

## 🤝 Made by Lunarmist-byte

This project was developed by Amal S Kumar.
- [GitHub](https://github.com/Lunarmist-byte)
- [LinkedIn](https://www.linkedin.com/in/amal-s-kumar-ba69a1290/)
