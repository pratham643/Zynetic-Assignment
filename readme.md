# Zynetic Assignment

This is a **Full Stack Product Management Web App** built using **React.js** for the frontend and **Node.js (Express with PostgreSQL)** for the backend. It allows users to authenticate, manage products (CRUD), and filter/search products efficiently.

## 🚀 Features
### ✅ User Authentication (JWT-based)
- User Signup (email, password)
- User Login (returns JWT token)
- Logout functionality
- Protect product routes using JWT

### ✅ Product Management
- Create Product (name, description, category, price, rating)
- View all products
- Update product
- Delete product

### ✅ Product Filtering & Search
- Filter products by **category, price range, or rating**
- Search products by **name or description**

## 🖥 Frontend (React.js)
- **React with functional components & hooks**
- **React Router** for navigation & protected routes
- **Tailwind CSS** for UI styling
- **Axios** for API integration
- **React Hot Toast** for notifications
- **Context API** for global state management

## 🧰 Backend (Node.js with PostgreSQL)
- **Express.js** for REST API
- **PostgreSQL** as the database
- **JWT Authentication** for user security
- **TypeORM / Prisma** for database ORM
- **CORS & dotenv** for security & environment management

## 📦 Installation & Setup

### 🔹 1. Clone the Repository
```sh
git clone https://github.com/your-repo-name.git
cd your-repo-name
```

### 🔹 2. Install Dependencies
#### **Frontend:**
```sh
cd frontend
npm install
```
#### **Backend:**
```sh
cd backend
npm install
```

### 🔹 3. Setup Environment Variables
Create a `.env` file in the **backend** folder:
```env
PORT=3000
DATABASE_URL=postgresql://your_user:your_password@your_host:5432/your_database
JWT_SECRET=your_jwt_secret
```

### 🔹 4. Run the App
#### **Start Backend**
```sh
npm run dev
```
#### **Start Frontend**
```sh
npm run dev
```

## 🎯 Fix for `product.price.toFixed` Error
If you encounter the error:
```sh
TypeError: product.price.toFixed is not a function
```
Update the code to ensure `product.price` is treated as a number:
```tsx
{Number(product.price).toFixed(2)}
```

## 🚀 Deployment
#### **To Build for Production:**
```sh
npm run build
```
Then deploy the `dist/` folder using **Vercel, Netlify, or any hosting service**.


## 📜 License
This project is licensed under the **MIT License**.

---
