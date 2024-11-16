<body>
    <h1>Product Management Mobile App</h1>
    <p>This mobile app allows users to manage products by creating, deleting, and searching through a list of products. It also includes a login feature to ensure secure access.</p>
    <h2>Features</h2>
    <ul>
        <li><strong>Login Page</strong>: Users can log in using their email and password.</li>
        <li><strong>Home Page</strong>:
            <ul>
                <li>Search bar to filter products by name.</li>
                <li>List of all added products with a delete option.</li>
                <li>Floating action button to navigate to the Add Product page.</li>
            </ul>
        </li>
        <li><strong>Add Product Form</strong>: Users can add a product with a name, price, and image.</li>
        <li><strong>Local Storage</strong>: Products are saved locally on the device.</li>
        <li><strong>Validation</strong>: Ensures product name and price are provided and prevents duplicate entries.</li>
        <li><strong>Loading and Error Handling</strong>: Displays loading indicators and handles errors with toasts or snackbars.</li>
    </ul>
    <h2>Installation</h2>
    <ol>
        <li>Clone the repository:
            <pre><code>git clone https://github.com/yourusername/your-repo-name.git</code></pre>
        </li>
        <li>Navigate to the project directory:
            <pre><code>cd your-repo-name</code></pre>
        </li>
        <li>Install dependencies:
            <pre><code>npm install</code></pre>
        </li>
        <li>Start the app:
            <pre><code>expo start</code></pre>
        </li>
    </ol>
    <h2>Usage</h2>
    <ol>
        <li><strong>Login</strong>: Enter your email and password to log in.</li>
        <li><strong>Home Page</strong>:
            <ul>
                <li>Use the search bar to filter products.</li>
                <li>View the list of products and delete any product by clicking the delete icon.</li>
                <li>Click the add button to navigate to the Add Product page.</li>
            </ul>
        </li>
        <li><strong>Add Product</strong>: Enter the product name, price, and select an image to add a new product.</li>
    </ol>
    <h2>Notes</h2>
    <ul>
        <li>Ensure the user cannot access the home page without logging in.</li>
        <li>Once logged in, the user should not be able to access the login page again.</li>
        <li>Handle API calls with loading indicators and error messages.</li>
        <li>Validate form inputs to prevent empty fields and duplicate products.</li>
    </ul>
    
</body>
</html>
