# Intern Dashboard Project

This project is a web application designed to provide a dashboard for interns, displaying their profile, donation stats, and a dynamic leaderboard. The application is built as a monorepo with a React-based front-end and a Python back-end.

## Features

  * **Intern Dashboard:** Displays the intern's name, referral code, total donations raised, and a list of earned rewards.
  * **Leaderboard:** Shows a ranked list of interns based on their donations. The leaderboard can be filtered by time period (all-time, week, month).
  * **User Authentication:** Secure login and signup pages for interns.
  * **Dark Mode:** A toggleable dark theme for a better user experience.
  * **Animations:** Smooth UI transitions and animations powered by `framer-motion`.

## Technology Stack

### Front-End

  * **React:** A JavaScript library for building user interfaces.
  * **Vite:** A fast build tool for the development server.
  * **Tailwind CSS:** A utility-first CSS framework for rapid styling.
  * **Framer Motion:** A production-ready animation library for React.
  * **React Router:** For handling client-side routing.

### Back-End

  * **Python:** The core language for the back-end logic.
  * **Flask/FastAPI:** (Assumed) A lightweight web framework to handle API requests.

## Project Structure

The project is organized as a monorepo to host both the front-end and back-end in a single repository.

```
my-intern-project/
├── BackEnd/
│   ├── api/
│   ├── database/
│   └── venv/
├── FrontEnd/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
└── vercel.json
```

## Getting Started

### Prerequisites

  - Node.js & npm
  - Python & pip

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Set up the Front-End:**

    ```bash
    cd FrontEnd
    npm install
    ```

3.  **Set up the Back-End:**

    ```bash
    cd ../BackEnd
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```

### Running Locally

1.  **Run the Back-End server:**
    Open a new terminal, navigate to the `BackEnd` directory, activate the virtual environment, and run your server.

    ```bash
    cd BackEnd
    source venv/bin/activate
    # Example for Flask:
    flask run
    # Example for FastAPI:
    uvicorn main:app --reload
    ```

2.  **Run the Front-End development server:**
    Open another terminal, navigate to the `FrontEnd` directory, and run the development server.

    ```bash
    cd FrontEnd
    npm run dev
    ```

    The front-end application should now be available at `http://localhost:5173`.
