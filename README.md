
# Employee Management System

A full-stack **Employee Management** web application built with **Node.js**, **React**, and **MongoDB Atlas**.  
This system allows **admins** to manage employees and **employees** to view their own details.

---

## 🚀 Live Demo
Click here to view the application: [Employee Management App](http://192.168.1.12:3000/)

---

## 🛠 Tech Stack

- **Frontend:** React  
- **Backend:** Node.js, Express  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT or Sessions  
- **Styling:** CSS / any UI library you used  

---

## 💡 Features

### Admin Features
- Add new employees  
- Edit employee details  
- Mark employees as **Active / Inactive**  
- Manage **attendance** and **salary**  
- View **dashboard** with overall employee stats  

### Employee Features
- Employee login  
- View own profile, attendance, and salary  
- Dashboard to track personal information  

---

## ⚙️ Installation / Setup

1. **Clone the repository**
```bash
git clone https://github.com/rutujatanpure/Employee_Management_Project.git
Install backend dependencies

bash
Copy code
cd backend
npm install
Install frontend dependencies

bash
Copy code
cd ../frontend
npm install
Create .env file for backend

ini
Copy code
MONGO_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<your-secret-key>
PORT=5000
Run backend

bash
Copy code
cd backend
npm start
Run frontend

bash
Copy code
cd frontend
npm start
Open browser
http://192.168.1.12:3000

📝 Notes
Ensure MongoDB Atlas connection string is correct
.env file should never be pushed to GitHub

