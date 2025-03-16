import axios from "axios";
import { httpClient } from "..";
import { MOMENTUM_ENDPOINTS } from "./index.enum";
import {
  CommentsResponse,
  CreateEmployeeData,
  CreateEmployeeResponse,
  CreateTaskData,
  TaskResponse,
  TasksResponse,
} from "./index.types";

export const GetStatuses = async () => {
  try {
    const result = await httpClient.get(MOMENTUM_ENDPOINTS.STATUSES);
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to Get User");
    }
  }
};

export const GetDepartments = async () => {
  try {
    const result = await httpClient.get(MOMENTUM_ENDPOINTS.DEPARTMENTS);
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to Get User");
    }
  }
};

export const GetPriorities = async () => {
  try {
    const result = await httpClient.get(MOMENTUM_ENDPOINTS.PRIORITIES);
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to Get User");
    }
  }
};
export const GetEmployees = async () => {
  try {
    const result = await httpClient.get(MOMENTUM_ENDPOINTS.EMPLOYEES);
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to Get User");
    }
  }
};

export const getAllTasks = async (): Promise<TasksResponse> => {
  try {
    const { data } = await httpClient.get<TasksResponse>(
      MOMENTUM_ENDPOINTS.TASKS
    );
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to Get Tasks");
    }
    throw error;
  }
};

export const getSingleTask = async (id: string): Promise<TaskResponse> => {
  try {
    const { data } = await httpClient.get<TaskResponse>(
      `${MOMENTUM_ENDPOINTS.TASKS}${id}/`
    );
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to Get Tasks");
    }
    throw error;
  }
};

export const getComments = async (id: string): Promise<CommentsResponse> => {
  try {
    const { data } = await httpClient.get<CommentsResponse>(
      `${MOMENTUM_ENDPOINTS.TASKS}${id}/comments/`
    );
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to Get Tasks");
    }
    throw error;
  }
};

export const createComment = async (
  id: string,
  data: any
): Promise<Comment> => {
  console.log(data, "data");
  try {
    const result = await httpClient.post<Comment>(
      `${MOMENTUM_ENDPOINTS.TASKS}${id}/comments/`,
      {
        text: data.text,
        parent_id: data.commentId, // Include parent_id
      }
    );
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to Get Tasks");
    }
    throw error;
  }
};

export const createTask = async (
  data: CreateTaskData
): Promise<TaskResponse> => {
  try {
    const result = await httpClient.post<TaskResponse>(
      MOMENTUM_ENDPOINTS.TASKS,
      data
    );
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        alert("could not Create Task");
      }
      throw new Error(error.response?.data?.message || "Failed to create task");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createEmployee = async (
  data: CreateEmployeeData
): Promise<CreateEmployeeResponse> => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    if (data.avatar) formData.append("avatar", data.avatar);
    formData.append("department_id", data.department_id.toString());

    const result = await httpClient.post<CreateEmployeeResponse>(
      MOMENTUM_ENDPOINTS.EMPLOYEES,
      formData
    );
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        alert("Could not create employee");
      }
      throw new Error(error.response?.data?.message || "Failed to create task");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const changeTaskStatusId = async (
  taskId: string,
  statusId: string
): Promise<TaskResponse> => {
  try {
    const result = await httpClient.put<TaskResponse>(
      `${MOMENTUM_ENDPOINTS.TASKS}${taskId}/`,
      { status_id: statusId }
    );
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        alert("could not Create Task");
      }
      throw new Error(error.response?.data?.message || "Failed to create task");
    }
    throw new Error("An unexpected error occurred");
  }
};
