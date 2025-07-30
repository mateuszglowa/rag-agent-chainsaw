import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateEnvironmentVariables() {
  const requiredEnvVars = [
    "OPENAI_API_KEY",
    "PINECONE_API_KEY",
    "PINECONE_ENVIRONMENT",
    "PINECONE_INDEX_NAME"
  ];

for (const variable of requiredEnvVars) {
    if (!process.env[variable]) {
      throw new Error(`Missing required environment variable: ${variable}`);
    }
  }