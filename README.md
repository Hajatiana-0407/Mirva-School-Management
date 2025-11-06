# 🎓 Mirva School Management  

A modern **school management system** built with **React + TypeScript + Redux (frontend)** and **CodeIgniter 3 (backend)**.  
It provides a complete set of tools to manage students, teachers, subjects, levels, classes, enrollments, and payments efficiently.

---

## ✨ Features  

- 🧑‍🎓 **Student Management** – Add, edit, delete, list, search, and paginate students.  
- 👨‍🏫 **Teacher Management** – Organize and manage teacher data.  
- 📚 **Subjects & Coefficients** – Assign subjects and coefficients to each level.  
- 🏫 **Levels & Classes** – Create and manage educational levels and class structures.  
- 📝 **Enrollments** – Register students by class and academic year.  
- 💰 **Payments** – Track student payments and generate reports.  
- 🔐 **Authentication System** – Secure login and user access control.  
- 🔍 **Search & Filtering** – Smart filtering across modules.  
- 📊 **Dashboard** – Overview of key statistics.  
- 📱 **Responsive UI** – Accessible across devices.  
- 💾 **Database integration** with MySQL.  
- 🧱 **Clean project architecture** separating client and server.  

---

## 🧠 Tech Stack  

### 🖥️ Frontend (Client)
- **React 19** – Component-based UI  
- **TypeScript** – Type-safe codebase  
- **Redux Toolkit** – State management  
- **Axios** – API communication  
- **React Hook Form + Yup** – Form management and validation  
- **Tailwind CSS** – Styling framework  
- **Vite** – Build and dev server  

### ⚙️ Backend (Server)
- **CodeIgniter 3** – Lightweight and fast PHP MVC framework  
- **PHP 8.1+** – Required version  
- **MySQL** – Relational database  
- **Faker** – Fake data generator for testing and fixtures  
- **RESTful API** – Communication layer between backend and frontend  

---

## 🧩 Project Structure  

```
Mirva-School-Management/
├── Client/                   # React + TypeScript + Redux frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Pages (Students, Levels, Payments, etc.)
│   │   ├── store/            # Redux slices and configuration
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # Axios API setup and requests
│   │   └── assets/           # Static assets (images, icons, etc.)
│   ├── public/
│   └── package.json
│
├── Server/                   # CodeIgniter 3 backend
│   ├── application/
│   │   ├── controllers/      # API endpoints
│   │   ├── models/           # Database models
│   │   ├── config/           # DB and app configuration
│   │   └── views/            # (Optional views)
│   ├── system/               # Core framework files
│   ├── index.php             # Entry point for backend
│   └── .htaccess             # URL rewriting rules
│
└── Docs/                     # Documentation and database
    ├── mirva.sql             # Database schema & sample data
    ├── ERD.png               # Entity-Relationship Diagram (optional)
    ├── API_Documentation.md  # API endpoints documentation
    └── Notes.txt             # Developer notes or setup guide
```

---

## ⚡ Quick Start  

### 🧾 Prerequisites  

Make sure you have these installed before running the project:  
- **Node.js (v18+)**  
- **PHP (v8.1+)**  
- **Composer**  
- **MySQL**  

---

### 🧑‍💻 Installation  

#### 1️⃣ Clone the repository  
```bash
git clone https://github.com/Hajatiana-0407/Mirva-School-Management.git
cd Mirva-School-Management
```

#### 2️⃣ Import the database  
- Open **phpMyAdmin** or your MySQL client.  
- Create a database named `mirva`.  
- Import the file located at:  
  ```
  Docs/mirva.sql
  ```

#### 3️⃣ Configure the backend  
In the `Server/application/config/database.php` file, configure your database connection:  
```php
$db['default'] = array(
    'hostname' => 'localhost',
    'username' => 'root',
    'password' => '',
    'database' => 'mirva',
    'dbdriver' => 'mysqli',
    'dbprefix' => '',
    'pconnect' => FALSE,
    'db_debug' => TRUE,
);
```

#### 4️⃣ Install frontend dependencies  
```bash
cd Client
npm install
```

#### 5️⃣ Start the backend server  
From the root directory:  
```bash
cd Server
php -S 127.0.0.1:8000
```
➡️ The backend API will now be accessible at: **http://127.0.0.1:8000**

#### 6️⃣ Start the frontend  
Open a new terminal and run:  
```bash
cd Client
npm run dev
```
➡️ The frontend will run on: **http://localhost:5173**

---

## 🌐 Access Points  

| Component | URL |
|------------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://127.0.0.1:8000 |
| Database | Docs/mirva.sql |

---

## 📌 Development Notes  

- Ensure your backend server (CodeIgniter) runs before the frontend.  
- API base URL should be configured in the frontend `.env` or Axios service.  
- Use `php -S 127.0.0.1:8000` instead of XAMPP for simplicity in development.  
- To reset data, re-import `Docs/mirva.sql`.  

---
