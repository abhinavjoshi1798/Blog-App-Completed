import vine from "@vinejs/vine"
import { CustomErrorReporter } from "./CustomErrorReporter.js"

vine.errorReporter = () => new CustomErrorReporter();

export const registerSchema = vine.object({
 name:vine.string().minLength(2).maxLength(150),
 email:vine.string().email(),
 pass:vine.string().minLength(6).maxLength(100).confirmed(),
 role:vine.string()
})

export const loginSchema = vine.object({
 email:vine.string().email(),
 pass:vine.string()
})