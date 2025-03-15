# Frontend Project with React and Next.js

[![es](https://img.shields.io/badge/lang-es-yellow)](https://github.com/darioplazaleon/Employee-Hub/blob/master/README.es.md)
[![en](https://img.shields.io/badge/lang-en-red)](https://github.com/darioplazaleon/Employee-Hub/blob/master/README.md)

This project is a frontend application developed with React and Next.js. The application is designed to interact with a separate backend project, providing a user interface for various functionalities.

## Features

- **User Authentication**: Users can log in and register.
- **User Management**: Administrators can view, create, edit, and delete users.
- **Position Management**: Administrators can manage available positions.
- **Vacation Management**: Users can request vacations and view the status of their requests.
- **User Settings**: Users can change their password and update their profile.

## Project Structure

- **src/middleware.ts**: Middleware for route and user permission management.
- **pages/**: Contains the application pages.
- **components/**: Reusable user interface components.
- **lib/**: Helper functions and utilities.

## Requirements

- Node.js
- npm or yarn

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repository.git
    ```
2. Install the dependencies:
    ```bash
    cd your-repository
    npm install
    # or
    yarn install
    ```

## Running

To start the development server:

```bash
npm run dev
# or
yarn dev
```

## Configuration

Make sure to configure the necessary environment variables in a .env or .env.local file.
```yaml
API_BASE_URL=http://localhost:8080
JWT_SECRET=secret # Secret key for generating JWT tokens,
                  # use the same as in the backend project
```

## Backend Project

This frontend project is designed to work alongside a separate [backend project](https://github.com/darioplazaleon/Employee-Hub). Make sure to have the backend running and properly configured so that the frontend application can interact with it.  
