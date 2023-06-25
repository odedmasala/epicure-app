# Epicure App

Epicure App is a web application designed for chef restaurants. It allows users to explore different restaurants and place orders for dishes from their favorite restaurant. The client-side is developed using React.js and TypeScript, while the server-side is built with Node.js, Express, and TypeScript.

## Project Description

The Epicure App is a web application developed specifically for chef restaurants. Its primary goal is to provide users with the ability to browse restaurants, view their menus, and place orders for dishes. The project was a collaborative effort, with the aim of creating a user-friendly and feature-rich application. The team focused on implementing essential functionalities such as restaurant search, menu display, and order management.

The user interface of the Epicure App was designed using Figma, a collaborative design tool. The design files served as a reference for implementing the UI components and styling the application. The stylesheets were written in Sass, a CSS preprocessor that enhances the styling capabilities with features like variables and nesting.

## Notable Features

- **Authentication:** Users can create accounts and log in to the application. The authentication process is implemented using Formik for form validation and state management.
- **Authorization:** The Epicure App allows users to place orders for dishes from their favorite restaurant. The application focuses on a single restaurant per order.
- **Restaurant Search:** Users can search for restaurants based on various criteria such as cuisine type, location, or restaurant name. The search functionality provides a convenient way to find desired restaurants quickly.
- **Order Management:** Users can add dishes to their order cart, customize dish options, and proceed with the checkout process. The application allows users to manage their orders effectively.

## Environment Variables

The following environment variables are used in the Epicure App:

### Client-side (.env in the client folder)
- **VITE_LOCAL_SERVER_API_URL:** The API URL for the local server.
- **VITE_PRODUCTION_SERVER_API_URL:** The API URL for the production server.

### Server-side (.env in the server folder)
- **PORT:** The port on which the server should run. 
- **MONGO_URL:** The URL for the MongoDB database. Set it to your MongoDB database URL.
- **epicureDB:** The name of the MongoDB database. Set it to the name of your Epicure App database.
- **JWT_SECRET:** The secret key used for JSON Web Token (JWT) generation and verification. Set it to a secure secret key of your choice.

Make sure to set up these environment variables before running the Epicure App.

## Server-side Data Validation

To ensure data integrity, the Epicure App implements server-side data validation. When data is submitted from the client-side, the server validates it before processing. The validation checks include verifying required fields, validating data types, and checking for length limits. Additionally, the server performs format validation to ensure data adheres to specific patterns or formats.

If any data fails the validation checks, the server responds with appropriate error messages, guiding the user to correct the data.

## Getting Started

To get started with the Epicure App, follow these steps:
1. Clone the repository to your local machine using the command: `git clone https://github.com/odedmasala/epicure-app.git`.
2. Navigate to the project directory.
3. Install the dependencies for the client-side by running `npm install` in the client folder.
4. Install the dependencies for the server-side by running `npm install` in the server folder.
5. Create a file named `.env` in the server folder and set the required environment variables mentioned in
6. Make sure the environment variables are properly set in the `.env` file.
7. Start the server by running `npm run dev` in the server folder.
8. In a separate terminal, navigate to the client folder and run `npm run dev` to start the client-side development server.
9. Access the Epicure App in your web browser at http://localhost:5173.
Congratulations! You have successfully set up and started the Epicure App on your local machine. Feel free to explore different restaurants, view menus, and place orders for your favorite dishes.

## Contributing

If you would like to contribute to the Epicure App, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

Please ensure that your code adheres to the project's coding standards and includes appropriate documentation.
