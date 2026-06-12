/**
 * Google Apps Script - Inquiry Ledger handler
 * 
 * INSTRUCTIONS FOR DEPLOYMENT:
 * 1. Open your Google Sheet where you want to collect space inquiries.
 * 2. In the top menu, go to Extensions > Apps Script.
 * 3. Delete any existing code in the editor (e.g. Code.gs) and paste this script.
 * 4. Save the project (click the disk icon or Ctrl+S / Cmd+S).
 * 5. Click "Deploy" (top right blue button) > "New deployment".
 * 6. Under "Select type" (gear icon), select "Web app".
 * 7. Configure the deployment details:
 *    - Description: Buffalo Stays Inquiry Web App
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (Required so the Server Action can post data securely)
 * 8. Click "Deploy".
 * 9. Authorize access if prompted.
 * 10. Copy the generated "Web app URL" (it will end in `/exec`).
 * 11. Paste this URL in your Next.js project's `.env.local` file as `GOOGLE_SHEETS_WEBAPP_URL`.
 * 
 * Note: If you make edits to this script in the future, you MUST create a NEW deployment version
 * and use the updated URL, or edit the existing deployment and select "New version" for changes to take effect.
 */

function doPost(e) {
  try {
    // Parse the JSON payload from the request body
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Invalid request: No post body contents found.");
    }
    
    var data = JSON.parse(e.postData.contents);
    
    var spaceTitle = data.spaceTitle || "Unknown Space";
    var clientName = data.clientName || "";
    var clientEmail = data.clientEmail || "";
    var clientPhone = data.clientPhone || "";
    var targetStartDate = data.targetStartDate || "";
    var stayDuration = data.stayDuration || "";
    
    // Open the active spreadsheet and get the active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // If the sheet is completely empty, write headers first
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Space Title",
        "Client Name",
        "Client Email",
        "Client Phone",
        "Target Start Date",
        "Stay Duration"
      ]);
    }
    
    // Create timestamp
    var timestamp = new Date();
    
    // Append the incoming fields as a perfectly structured row
    sheet.appendRow([
      timestamp,
      spaceTitle,
      clientName,
      clientEmail,
      clientPhone,
      targetStartDate,
      stayDuration
    ]);
    
    // Return a clean JSON success response with appropriate MIME type
    // Google Apps Script Web Apps automatically handle CORS redirect headers
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return a clean JSON error response
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional GET handler to verify the service is running
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: "online", 
    message: "Buffalo Stays inquiry handler is active. Send POST requests to write to the spreadsheet." 
  })).setMimeType(ContentService.MimeType.JSON);
}
