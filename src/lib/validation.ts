import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().transform((val) => val.trim().toLowerCase()),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});
