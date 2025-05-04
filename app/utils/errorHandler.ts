import { NextRequest, NextResponse } from "next/server";
import { sendErrorResponse } from "./apiResponse";
import { ZodError } from "zod";
import { formatZodError } from "./formatter";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

/**
 * A higher-order function that wraps API route handlers with error handling
 *
 * @param handler - The API route handler function
 * @returns A function that handles errors and calls the original handler
 */
export function withErrorHandler(
  handler: (req: NextRequest, params?: any) => Promise<NextResponse>
) {
  return async (req: NextRequest, params?: any): Promise<NextResponse> => {
    try {
      return await handler(req, params);
    } catch (error: any) {
      console.error("API Error:", error);

      // Handle Zod validation errors
      if (error instanceof ZodError) {
        return sendErrorResponse(NextResponse, formatZodError(error), 400);
      }

      // Handle Prisma errors
      if (error instanceof PrismaClientKnownRequestError) {
        // Handle specific Prisma error codes
        switch (error.code) {
          case "P2002": // Unique constraint violation
            return sendErrorResponse(
              NextResponse,
              "A record with this information already exists.",
              409
            );
          case "P2025": // Record not found
            return sendErrorResponse(
              NextResponse,
              "The requested resource was not found.",
              404
            );
          default:
            return sendErrorResponse(
              NextResponse,
              "Database operation failed.",
              500
            );
        }
      }

      // Handle other types of errors
      const statusCode = error.statusCode || 500;
      const message = error.message || "An unexpected error occurred";

      return sendErrorResponse(NextResponse, message, statusCode);
    }
  };
}

/**
 * Creates a custom error with status code
 *
 * @param message - Error message
 * @param statusCode - HTTP status code
 * @returns Custom error object with status code
 */
export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}
