import { NextRequest, NextResponse } from "next/server";
import { sendErrorResponse } from "./app/utils/apiResponse";

// Simple in-memory store for rate limiting
const rateLimit = new Map<string, { count: number; timestamp: number }>();

export async function middleware(request: NextRequest) {
  // Only apply to API routes
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Apply rate limiting
  const ip = request.ip || "anonymous";
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 60; // 60 requests per minute

  const current = rateLimit.get(ip) || { count: 0, timestamp: now };

  // Reset if outside window
  if (now - current.timestamp > windowMs) {
    current.count = 0;
    current.timestamp = now;
  }

  current.count++;
  rateLimit.set(ip, current);

  if (current.count > maxRequests) {
    return sendErrorResponse(
      NextResponse,
      "Too many requests, please try again later.",
      429
    );
  }

  // Validate content type for POST, PUT, PATCH requests
  if (["POST", "PUT", "PATCH"].includes(request.method)) {
    const contentType = request.headers.get("content-type");

    // Check if the content type is valid
    if (
      !contentType ||
      (!contentType.includes("application/json") &&
        !contentType.includes("multipart/form-data"))
    ) {
      return sendErrorResponse(
        NextResponse,
        "Invalid Content-Type. Expected 'application/json' or 'multipart/form-data'.",
        400
      );
    }

    // Clone the request to avoid consuming the body
    const clonedRequest = request.clone();

    // Validate and parse body based on content type
    try {
      let body;
      if (contentType.includes("application/json")) {
        body = await clonedRequest.json();
      } else if (contentType.includes("multipart/form-data")) {
        const formData = await clonedRequest.formData();
        body = Object.fromEntries(formData.entries());
      }

      if (!body || Object.keys(body).length === 0) {
        return sendErrorResponse(
          NextResponse,
          "Request body cannot be empty.",
          400
        );
      }
    } catch (error: any) {
      return sendErrorResponse(
        NextResponse,
        error.message || "Failed to parse request body.",
        400
      );
    }
  }

  // Continue with the request
  return NextResponse.next();
}
