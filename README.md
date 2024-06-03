# Co_Adviser

Co_Adviser is a web application that provides advice to users using the OpenAI API. The frontend is built with React, and the backend is developed with Django.

## Project Structure

- **public/**
  - Contains the static assets and the HTML file for the React frontend.

- **server/**
  - Contains the backend code, developed with Django.

- **src/**
  - Contains the source code for the React frontend.

- **.gitignore**
  - Specifies files and directories that should be ignored by Git.

- **package-lock.json**
  - Automatically generated file that contains the exact versions of npm dependencies.

- **package.json**
  - Contains metadata about the project and the list of dependencies.

## Getting Started

### Prerequisites

- Node.js and npm installed
- Python and pip installed
- Django installed

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/EhsanAmini770/Co_Adviser.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Co_Adviser
    ```

#### Frontend Setup

1. Navigate to the `src` directory:
    ```bash
    cd src
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Start the React development server:
    ```bash
    npm start
    ```

#### Backend Setup

1. Navigate to the `server` directory:
    ```bash
    cd ../server
    ```
2. Create a virtual environment:
    ```bash
    python -m venv venv
    ```
3. Activate the virtual environment:

    - On Windows:
      ```bash
      venv\Scripts\activate
      ```
    - On macOS and Linux:
      ```bash
      source venv/bin/activate
      ```
4. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5. Run the Django development server:
    ```bash
    python manage.py runserver
    ```

## Using the Application

1. Open your browser and navigate to `http://localhost:3000` to access the frontend.
2. The frontend will interact with the backend via API calls to provide advice using the OpenAI API.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to create a pull request or open an issue.

## License

---

**Author:** Ehsan Amini

**GitHub:** [EhsanAmini770](https://github.com/EhsanAmini770)
