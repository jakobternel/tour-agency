import { z } from "zod";
import { ValidationType } from "../types/FormValidation";
import validator from "validator";

export const validationSchemas: ValidationType = {
    firstName: z.string().min(1, "Please enter a first name"),
    surname: z.string().min(1, "Please enter a surname"),
    address: z.string().min(10, "Please enter a valid address"),
    postcode: z.string().min(1, "Please enter a postcode"),
    city: z.string().min(4, "Please enter a city"),
    cardholder: z.string().min(4, "Please enter cardholder's name"),
    cardNo: z
        .string()
        .min(12, "Card number is too short")
        .max(19, "Card number is too long")
        .transform((val) => val.replace(/\s+/g, ""))
        .refine((val) => validator.isCreditCard(val), {
            message: "Invalid credit card number",
        }),
    expiry: z
        .string()
        .regex(
            /^(0?[1-9]|1[0-2])\/\d{4}$/,
            "Enter a valid expiry in MM/YYYY format"
        )
        .refine(
            (val) => {
                const [monthStr, yearStr] = val.split("/");
                const month = parseInt(monthStr, 10);
                const year = parseInt(yearStr, 10);
                if (!month || !year) return false;

                const now = new Date();
                const currentMonth = now.getMonth() + 1;
                const currentYear = now.getFullYear();

                return (
                    year > currentYear ||
                    (year === currentYear && month >= currentMonth)
                );
            },
            {
                message: "Card has expired",
            }
        ),
    cvc: z.string().min(3, "Please enter a valid CVC"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z
        .string()
        .transform((val) => val.replace(/\s+/g, ""))
        .refine(
            (val) => validator.isMobilePhone(val, "any", { strictMode: true }),
            {
                message: "Invalid phone number",
            }
        ),
    date: z.string().refine(
        (val) => {
            const match = val.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
            if (!match) return false;

            const [_, day, month, year] = match.map(Number);
            const date = new Date(year, month - 1, day);

            return (
                date.getFullYear() === year &&
                date.getMonth() === month - 1 &&
                date.getDate() === day
            );
        },
        {
            message: "Invalid departure date. Please enter DD/MM/YYYY",
        }
    ),
};