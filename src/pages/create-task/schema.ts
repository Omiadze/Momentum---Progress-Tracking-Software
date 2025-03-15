import { z } from "zod";

export const taskSchema = z.object({
  name: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must be at most 255 characters"),

  description: z
    .string()
    .max(255, "Description must be at most 255 characters")
    .optional()
    .refine((desc) => {
      if (!desc) return true; // Allow empty descriptions
      return desc.trim().split(/\s+/).length >= 4;
    }, "Description must be at least 4 words if provided"),

  priority_id: z.string().min(1, "სავალდებულოა"), // Only ensures a value is selected

  status_id: z.string().min(1, "სავალდებულოა"), // Only ensures a value is selected

  department: z.string().min(1, "სავალდებულოა"), // Ensures a selection

  employee_id: z.string().min(1, "სავალდებულოა"),

  due_date: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return selectedDate >= tomorrow;
  }, "დედლაინის მინიჭება შეიძლება ხვალინდელი დღიდან"),
});
