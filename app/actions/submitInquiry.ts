"use server";

export interface InquiryInput {
  spaceTitle: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  checkInDate: string;
  checkOutDate: string;
  totalNightsDuration: string;
  countAdults: number;
  countChildren: number;
  countInfants: number;
  hasPetsIncluded: boolean;
}

export interface InquiryResponse {
  success: boolean;
  error?: string;
}

/**
 * Server Action to securely submit booking inquiries directly to Google Sheets via
 * a Google Apps Script web app endpoint.
 */
export async function submitInquiry(formData: InquiryInput): Promise<InquiryResponse> {
  const webappUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;

  if (!webappUrl) {
    console.error("GOOGLE_SHEETS_WEBAPP_URL environment variable is missing.");
    return {
      success: false,
      error: "Inquiry system is temporarily unavailable. Please try again later.",
    };
  }

  try {
    // Basic server-side verification of fields
    if (
      !formData.spaceTitle.trim() ||
      !formData.clientName.trim() ||
      !formData.clientEmail.trim() ||
      !formData.clientPhone.trim() ||
      !formData.checkInDate.trim() ||
      !formData.checkOutDate.trim() ||
      !formData.totalNightsDuration.trim()
    ) {
      return {
        success: false,
        error: "All inquiry fields must be filled out.",
      };
    }

    // Post inquiry details to the Google Apps Script Web App
    const response = await fetch(webappUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      // Google Apps Script requires redirection handling to retrieve results
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Failed to submit data to the endpoint. Status: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: data.error || "The destination script returned a non-success response.",
      };
    }
  } catch (error: unknown) {
    console.error("Error dispatching inquiry to Apps Script webapp:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
