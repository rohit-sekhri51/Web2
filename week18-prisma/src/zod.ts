import z from 'zod';

export const userProfileSchema = z.object({
    username: z.string({
        required_error: "User Name is required",
        invalid_type_error: "Name must be a string",})
    .min(2, { message: "Name cannot be less than 2" })
    .max(10, { message: "Name cannot be more than 10"}),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$/)
    .min(8, { message: "Password cannot be less than 8" })
    .max(20, { message: "Password cannot be more than 20" }),
    firstName: z.string({
        required_error: "First Name is required",
        invalid_type_error: "Name must be a string",})
    .min(3, { message: "Name cannot be less than 3" })
    .max(10, { message: "Name cannot be more than 10"}),
    lastName: z.string({
        required_error: "Last Name is required",
        invalid_type_error: "Name must be a string",})
    .min(3, { message: "Name cannot be less than 3" })
    .max(10, { message: "Name cannot be more than 10"})
  });

  /*email: z
    .string({
      required_error: "Email field is required",
      invalid_type_error: "This field must be in email format",
    })
    .email() 
    
    export type UserModel = z.infer<typeof userSchema>;
    */
