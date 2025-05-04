import { NextRequest, NextResponse } from "next/server";
import { sendErrorResponse } from "./app/utils/apiResponse";

// Simple in-memory store for rate limiting
const rateLimit = new Map<string, { count: number; timestamp: number }>();

// Clean up old entries periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  for (const [ip, entry] of rateLimit.entries()) {
    if (now - entry.timestamp > windowMs) {
      rateLimit.delete(ip);
    }
  }
}, 60 * 1000); // Run every minute

export async function middleware(request: NextRequest) {
  // Only apply to API routes
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  try {
    // Apply rate limiting
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 60; // 60 requests per minute

    const current = rateLimit.get(ip) || { count: 0, timestamp: now };

    // Reset if outside window
    if (now - current.timestamp > windowMs) {
      current.count = 0;
      current.timestamp = now;
    }

    // Check rate limit before incrementing
    if (current.count >= maxRequests) {
      return sendErrorResponse(
        NextResponse,
        "Too many requests, please try again later.",
        429
      );
    }

    current.count++;
    rateLimit.set(ip, current);

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
        if (contentType.includes("application/json")) {
          const body = await clonedRequest.json();
          if (!body || Object.keys(body).length === 0) {
            return sendErrorResponse(
              NextResponse,
              "Request body cannot be empty.",
              400
            );
          }
        } else if (contentType.includes("multipart/form-data")) {
          const formData = await clonedRequest.formData();
          if (formData.entries().next().done) {
            return sendErrorResponse(
              NextResponse,
              "Request body cannot be empty.",
              400
            );
          }
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
  } catch (error) {
    console.error("Middleware error:", error);
    return sendErrorResponse(NextResponse, "Internal server error", 500);
  }
}
