RecipeAgenda is a full-stack web application where users can create, manage, and view recipes with categorized cards, images, and nutritional info. Built using Node.js, Express, MongoDB, and HTML/CSS/JS.

Live Site:
Frontend: https://recipeagenda-frontend.onrender.com

Backend: https://recipeagenda-backend.onrender.com

Technologies Used:
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB Atlas
Auth: JWT-based authentication
Hosting: Render (Frontend + Backend)

App Features:
Signup and Login
Create new recipes
View a personal recipe book
Edit and delete recipes
Logout functionality
Nutrition info integration (for future support)

How to Use:

Open the live frontend URL: https://recipeagenda-frontend.onrender.com

Create an account via the Sign Up form.

Log in with your credentials. Also check out username- test5 password- test5, to see a already created page with recipes.

Navigate using the top nav:

Create: Add a new recipe with a title, ingredients, steps, and image URL.

Recipe Book: View all your created recipes and their nutritional facts. Edit or delete your recipes. If no recipes exist, you’ll see a friendly message.

Logout: Ends your session.

Notes:
Backend is protected via JWT, so all actions require login.
MongoDB Atlas IP whitelist allows open access (0.0.0.0/0) for testing.

Folder Structure (Important Parts):

RecipeAgenda/
├── client/
│   ├── js/
│   │   └── main.js
│   ├── create.html
│   ├── detail.html
│   ├── index.html
│   ├── recipeBook.html
├── server/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── models/

Author:
Alyssa Grigg