import { NextResponse } from "next/server";

/**
 * Sends a standardized success response.
 *
 * @param res - Next.js API Response object
 * @param data - The payload data to send in the response
 * @param message - Optional message describing the response
 * @param statusCode - HTTP status code (default: 200)
 */
export function sendSuccessResponse(
  res: typeof NextResponse,
  data: any,
  message: string = "Request successful",
  statusCode: number = 200
) {
  return res.json(
    {
      success: true,
      message,
      data,
    },
    { status: statusCode }
  );
}

/**
 * Sends a standardized error response.
 *
 * @param res - Next.js API Response object
 * @param error - The error message or object to send
 * @param statusCode - HTTP status code (default: 500)
 */
export function sendErrorResponse(
  res: typeof NextResponse,
  error: string | Record<string, any>,
  statusCode: number = 500
) {
  const errorMessage =
    typeof error === "string"
      ? error
      : error.message || "An unexpected error occurred";

  return res.json(
    {
      success: false,
      message: errorMessage,
      error: typeof error === "object" ? error : undefined,
    },
    { status: statusCode }
  );
}
