# Momentum — Progress Tracking Software

Momentum is a web-based application designed for companies, to manage employees and the tasks assigned to them. The app allows for detailed task management and tracking, including the ability to filter tasks by department, employee, and priority. It also supports real-time collaboration through task comments and user-friendly features for task creation and management.

---

## 🚀 Technologies Used

- **React** — Front-end library for building the user interface
- **Vite** - for faster build times
- **Axios** — For making HTTP requests to interact with the backend API
- **React Query & Mutation** - for data fetching
- **React Hook Form** — For form validation and submission
- **Tailwind CSS** - for styling
- **Shadcn UI** - for UI components
- **Zod** — TypeScript-first schema validation for form inputs
- **React Router DOM** — For routing and navigation across pages

---

## 📋 Key Features

### ✅ Task List Page (Home Page)

When users enter the application, they land on the **Task List Page**, where all tasks are displayed as cards showing:

- Task Name
- Short Description (up to 100 characters, ellipsed if longer)
- Task Priority (displayed with an icon)
- Due Date
- Department Name
- Assigned Employee's Avatar

#### Task Status Columns:

- **Started**
- **In Progress**
- **Ready for Testing**
- **Completed**

#### Filters:

- **Department** — Multi-select
- **Priority** — Multi-select
- **Employee** — Single-select, showing name, surname, and avatar

---

### ✅ Task Details Page

The **Task Details Page** provides complete information about a specific task:

- Task Title
- Full Description
- Priority
- Assigned Employee’s name, surname, avatar, and department
- Due Date

#### Comments Section:

- Add comments (only non-empty allowed)
- One-level replies per comment
- Comments update dynamically, with the newest appearing at the top
- Task status can be updated directly from the details page

---

### ✅ Task Creation Page

Users can create a new task by filling out a form with the following fields:

- **Title** — Required (3-255 characters)
- **Description** — Optional (minimum 4 words, max 255 characters)
- **Priority** — Required (High, Medium, Low)
- **Status** — Required (Started, In Progress, Ready for Testing, Completed)
- **Department** — Required (dropdown selection)
- **Assigned Employee** — Required (dropdown populated by department)
- **Due Date** — Required (defaults to tomorrow, no past dates allowed)

✅ All fields are validated in real-time; the form cannot be submitted until all validations pass.

---

### ✅ Create Employee Modal

Accessible via navigation or the task creation page.

#### Fields:

- **First Name** — Required (2+ characters, only Latin or Georgian letters)
- **Last Name** — Required (2+ characters, only Latin or Georgian letters)
- **Avatar** — Required (image upload, max 600KB)
- **Department** — Required (dropdown with API data)

Newly created employees appear in the employee list and can be assigned tasks immediately.

---

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Omiadze/Momentum---Progress-Tracking-Software.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Momentum---Progress-Tracking-Software
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

# Live Site

Access the live application at [Momentum](https://momentum-redberry.netlify.app/home).

# Author

Hi, my name is Teo and I am a front-end developer.
