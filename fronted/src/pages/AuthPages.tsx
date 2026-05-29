import { AxiosError } from "axios";
import { ApiError } from "../types";

export interface FieldError {
    [key: string]: string;
}

function extractErrors(error: unknown): FieldError {
    if (error instanceof AxiosError) {
        const data = error.response?.data as ApiError | undefined;
        if (data?.errors) {
            const flat: FieldError = {};

            Object.entries(data.errors).forEach(([key, msgs]) => {
                flat[key] = msgs[0];
            });
            return flat;
        }
        if (data?.message) return { general: data.message };
    };
    return { general: 'Une Erreur est survenu.' }
}

export default extractErrors;

