export type Department = {
  id: number;
  name: string;
};

export type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: Department;
};

export type Status = {
  id: number;
  name: string;
};

export type Priority = {
  id: number;
  name: string;
  icon: string;
};

export type Task = {
  id: number;
  name: string;
  description: string;
  due_date: string; // ISO string
  department: Department;
  employee: Employee;
  status: Status;
  priority: Priority;
  total_comments: number;
};

export type CreateTaskData = {
  name: string;
  description: string;
  due_date: string;
  status_id: string;
  employee_id: string;
  priority_id: string;
};

export type TaskResponse = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  department: Department;
  employee: Employee;
  status: Status;
  priority: Priority;
};

export type TasksResponse = Task[];

export type CreateEmployeeData = {
  name: string;
  surname: string;
  avatar: File | null;
  department_id: number;
};

export type CreateEmployeeResponse = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
};

export type Comment = {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
  sub_comments?: Comment[]; // რექურსიული სტრუქტურისთვის
};

export type CommentsResponse = Comment[];
