import axios from "axios";
import { httpClient } from "..";
import { MOMENTUM_ENDPOINTS } from "./index.enum";
import { TasksResponse } from "./index.types";

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
