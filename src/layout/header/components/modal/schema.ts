import { z } from "zod";

export const modalSchema = z.object({
  name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(255, "First name must be at most 255 characters")
    .regex(
      /^[a-zA-Zა-ჰ]+$/,
      "First name can only contain Latin and Georgian characters"
    ),
  surname: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(255, "Last name must be at most 255 characters")
    .regex(
      /^[a-zA-Zა-ჰ]+$/,
      "Last name can only contain Latin and Georgian characters"
    ),
  avatar: z
    .union([z.instanceof(File), z.null()]) // Allow null or File
    .refine(
      (file) => file === null || file.size <= 600000,
      "Avatar must be less than 600KB"
    )
    .refine(
      (file) => file === null || file.type.startsWith("image/"),
      "Avatar must be an image file"
    ),
  department_id: z.string().min(1, "Department is required"),
});
