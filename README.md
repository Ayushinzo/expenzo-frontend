# Finance Tracker Frontend

This is the frontend part of the Finance Tracker application, built with React and Vite. It provides a user interface for managing personal finances, tracking transactions, and visualizing spending habits.

## Features

- **Dashboard:** Overview of income, expenses, and recent transactions.
- **Transactions:** Add, view, edit, and delete transactions. Filter transactions by date, category, and type.
- **Categories:** Create, view, edit, and delete categories for income and expenses.
- **Recurring Transactions:** Manage recurring transactions for automated tracking.
- **Profile:** User profile management with image upload and email preferences.
- **Authentication:** Secure user authentication using Firebase.
- **Data Visualization:** Charts and graphs for visualizing financial data.
- **Responsive Design:** User interface adapts to different screen sizes.

## Tech Stack

- **React:** JavaScript library for building user interfaces.
- **Vite:** Build tool for fast development and optimized production builds.
- **React Router DOM:** Library for handling navigation and routing.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Material-UI:** React UI framework for pre-built components.
- **React Icons:** Library for including icons in React components.
- **Axios:** HTTP client for making API requests.
- **React Infinite Scroll Component:** For implementing infinite scrolling in transaction lists.
- **React Toastify:** Library for displaying toast notifications.
- **jsPDF and export-to-csv:** Libraries for exporting data to PDF and CSV formats.
- **Firebase:** Authentication and hosting platform.
- **Emoji Picker React:** For selecting emojis in category creation.

## Project Structure
```
frontend/
├── .env                           # Environment variables
├── .gitignore                     # Specifies intentionally untracked files that Git should ignore
├── eslint.config.js               # ESLint configuration file
├── index.html                     # Main HTML file
├── package.json                   # Lists project dependencies and scripts
├── README.md                      # Project documentation
├── vercel.json                    # Configuration file for Vercel deployment
├── vite.config.js                 # Vite configuration file
├── public/                        # Public assets
│   ├── auth.webp                  # Authentication image
│   ├── balance.svg                # Balance SVG image
│   ├── expense.svg                # Expense SVG image
│   ├── facebook.svg               # Facebook SVG image
│   ├── google.svg                 # Google SVG image
│   ├── income.svg                 # Income SVG image
│   ├── logo-192-192.png           # Logo (192x192)
│   ├── logo-512-512.png           # Logo (512x512)
│   ├── logo.png                   # Logo image
│   ├── microsoft.svg              # Microsoft SVG image
│   └── user.avif                  # Default user avatar
├── src/                           # Source code
│   ├── App.css                    # Global CSS styles
│   ├── App.jsx                    # Main application component
│   ├── index.css                  # Index CSS styles
│   ├── main.jsx                   # Entry point for React application
│   ├── Authenticate/              # Authentication wrapper
│   │   └── Authenticate.jsx       # Component to protect routes
│   ├── components/                # Reusable components
│   │   ├── AddCategory.jsx        # Component to add categories
│   │   ├── AddRecurring.jsx       # Component to add recurring transactions
│   │   ├── AddTransaction.jsx     # Component to add transactions
│   │   ├── CategoryTemplate.jsx   # Component to display category templates
│   │   ├── DashboardAreaChart.jsx # Component for dashboard area chart
│   │   ├── DashboardPieChart.jsx  # Component for dashboard pie chart
│   │   ├── EditCategory.jsx       # Component to edit categories
│   │   ├── InfinityLoader.jsx     # Component for infinite scroll loader
│   │   ├── ListRecurring.jsx      # Component to list recurring transactions
│   │   ├── Loader.jsx             # Component for loading state
│   │   ├── Navbar.jsx             # Component for navigation bar
│   │   ├── NoMoreTransaction.jsx  # Component when no more transactions are available
│   │   ├── RecentTransaction.jsx  # Component to display recent transactions
│   │   ├── Sidebar.jsx            # Component for sidebar navigation
│   │   └── SingleTransaction.jsx  # Component to display single transactions
│   ├── Context/                   # Context providers
│   │   └── ContextProvider.jsx    # Context provider component
│   ├── firebase/                  # Firebase configuration
│   │   └── firebase.js            # Firebase configuration file
│   ├── pages/                     # Page components
│   │   ├── Auth.jsx               # Authentication layout
│   │   ├── Categories.jsx         # Page to manage categories
│   │   ├── CompleteSignIn.jsx     # Page for completing sign-in process
│   │   ├── Dashboard.jsx          # Main dashboard page
│   │   ├── LandingPage.jsx        # Landing page
│   │   ├── Profile.jsx            # User profile page
│   │   ├── Recurring.jsx          # Page to manage recurring transactions
│   │   ├── SignIn.jsx             # Sign-in page
│   │   ├── SignUp.jsx             # Sign-up page
│   │   ├── Transactions.jsx       # Page to view transactions
│   │   ├── User.jsx               # User layout
│   │   └── ViewCategory.jsx       # Page to view a single category
│   ├── services/                  # Authentication services
│   │   ├── LoginWithFacebook.jsx  # Service to sign in with Facebook
│   │   └── loginWithGoogle.jsx    # Service to sign in with Google
```


## Setup Instructions

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```
2.  Navigate to the frontend directory:

    ```bash
    cd frontend
    ```
3.  Install dependencies:

    ```bash
    npm install
    ```
4.  Configure environment variables:

    Create a `.env` file in the root of the frontend directory and add the following variables:

    ```
    VITE_BACKEND_URL=<your_backend_url>
    VITE_FRONTEND_URL=http://localhost:5173
    VITE_API_KEY=<your_firebase_api_key>
    VITE_AUTH_DOMAIN=<your_firebase_auth_domain>
    VITE_PROJECT_ID=<your_firebase_project_id>
    VITE_STORAGE_BUCKET=<your_firebase_storage_bucket>
    VITE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
    VITE_APP_ID=<your_firebase_app_id>
    VITE_MEASUREMENT_ID=<your_firebase_measurement_id>
    ```

    Replace the placeholder values with your actual Firebase project credentials and backend URL.
5.  Start the development server:

    ```bash
    npm run dev
    ```

    This will start the development server and open the application in your browser.

## Key Components

-   **`src/App.jsx`:** The main application component that sets up the routing and context providers.
-   **`src/pages/`:** Contains page-level components for different routes, such as `Dashboard`, `Transactions`, `Categories`, and `Profile`.
-   **`src/components/`:** Contains reusable components used throughout the application, such as `AddTransaction`, `SingleTransaction`, `CategoryTemplate`, and `Sidebar`.
-   **`src/firebase/firebase.js`:** Initializes the Firebase application and exports the necessary modules.
-   **`src/Context/ContextProvider.jsx`:** Provides context for managing user authentication and other global state.

## Authentication

The application uses Firebase Authentication for user authentication. The following authentication methods are supported:

-   Email/Password
-   Google Sign-In

The authentication logic is implemented in the `src/services/` directory and the `src/pages/Auth.jsx` component.

## API Endpoints

The frontend communicates with the backend API to fetch and manage data. The following API endpoints are used:

-   `/transaction/getTransactions`: Get paginated transactions
-   `/transaction/add`: Add a new transaction
-   `/transaction/deleteTrans`: Delete a transaction
-   `/category/typeCategories`: Get categories by type
-   `/category/add`: Add a new category
-   `/profile/getStats`: Get financial statistics
-   `/profile/getExpenseByCategory`: Get category-wise expenses
-   `/profile/recentTransactions`: Get recent transactions
-   `/mail/addEmail`: Add email for notifications
-   `/profile/delete-image`: Delete profile image

## Contributing

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.

## License

This project is licensed under the MIT License.