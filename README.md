# Notes App

<h1 align="center">
	<img
		width="250"
		alt="Invoicify"
		src="public/logo.png">
</h1>

This is a **Notes web application** built with **React**, **TypeScript**, **Redux Toolkit**, and **Bootstrap/React-Bootstrap**, featuring **tag management**, **note creation/editing**, and **persistent storage** using **Redux-Persist**.

## 🛠 Technologies Used

- **React + TypeScript** – Strongly typed, modern frontend.
- **Redux Toolkit** – State management for notes and tags.
- **Redux-Persist** – Data persistence across page reloads.
- **React-Bootstrap** – Responsive UI components.
- **React Router** – Navigation between pages.
- **UUID** – Unique IDs for notes and tags.
- **Framer Motion (optional)** – Smooth UI animations (if used).


## 🚀 Features

- Create, edit, and delete notes.
- Add tags to organize notes.
- Filter notes by title and tags.
- Persistent state across sessions using Redux Persist.
- Reusable form component for adding and editing notes.
- Responsive and clean UI design.



## 💻 How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/yourusername/notes-app.git
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```


##  🏷️ Notes About Implementation

Redux slices manage notes and tags.

UUID generates unique IDs for notes and tags.

NoteForm is a reusable component for creating/editing notes.

Redux-Persist stores your notes in local storage automatically.
