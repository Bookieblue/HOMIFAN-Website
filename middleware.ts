import { NextRequest, NextResponse } from "next/server";
import { sendErrorResponse } from "./app/utils/apiResponse";

export async function middleware(request: NextRequest) {
    if (request.method === "POST" || request.method === "PUT") {
        const contentType = request.headers.get("content-type");

        console.log({ contentType });

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
        let body;

        // Validate and parse body based on content type
        try {
            if (contentType.includes("application/json")) {
                body = await request.json();
            } else if (contentType.includes("multipart/form-data")) {
                const formData = await request.formData();
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
                error.message || "Failed to parse request body."
            );
        }
    }

    // Continue with the request
    return NextResponse.next();
}
