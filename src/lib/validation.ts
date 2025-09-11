import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().transform((val) => val.trim().toLowerCase()),
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one digit")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol"),
});
