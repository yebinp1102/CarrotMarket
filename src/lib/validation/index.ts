import * as z from 'zod';

// Sign up form Schema
export const SignupValidation = z.object({
  name: z.string().min(2, {message: "Name must be longer than 2 characters. 이름은 최소한 2글자 이상이어야 합니다."}),
  username: z.string().min(2, {message: "Username must be at least 2 characters. 유저 이름은 최소한 2글자 이상이어야 합니다."}),
  email: z.string().email(),
  password: z.string().min(8, {message: "Password must be longer than 8 characters. 비밀번호는 최소한 8자리 이상이어야 합니다."})
})

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, {message: "Password must be longer than 8 characters. 비밀번호는 최소한 8자리 이상이어야 합니다."})
})

export const PostValidation = z.object({
  caption: z.string().min(5, { message: "Minimum 5 characters. 최소 5글자여야 합니다." }).max(2200, { message: "Maximum 2,200 caracters. 최대 2200자까지 허용합니다." }),
  file: z.custom<File[]>(),
  location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
})