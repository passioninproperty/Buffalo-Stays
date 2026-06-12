/**
 * Google Apps Script - Inquiry Ledger & Email Notification Handler
 * 
 * CONFIGURATION:
 * Update the email address below to define where booking alerts are sent.
 */
const NOTIFICATION_EMAIL = "YOUR_PERSONAL_OR_TEAM_EMAIL_HERE"; // The address that receives the instant booking alerts

/**
 * INSTRUCTIONS FOR DEPLOYMENT:
 * 1. Open your Google Sheet where you want to collect space inquiries.
 * 2. In the top menu, go to Extensions > Apps Script.
 * 3. Delete any existing code in the editor (e.g. Code.gs) and paste this script.
 * 4. Update NOTIFICATION_EMAIL at the top with your target email.
 * 5. Save the project (click the disk icon or Ctrl+S / Cmd+S).
 * 6. Click "Deploy" (top right blue button) > "New deployment".
 * 7. Under "Select type" (gear icon), select "Web app".
 * 8. Configure the deployment details:
 *    - Description: Buffalo Stays Inquiry & Email Notification Web App
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (Required so the Server Action can post data securely)
 * 9. Click "Deploy".
 * 10. Authorize access if prompted (Google will request authorization to send emails on your behalf and modify spreadsheets).
 * 11. Copy the generated "Web app URL" (it will end in `/exec`).
 * 12. Paste this URL in your Next.js project's `.env.local` file as `GOOGLE_SHEETS_WEBAPP_URL`.
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
    
    // Trigger the email notification inside a try-catch safety block
    // Ensures mailing issues or limits do not block spreadsheet logging success
    try {
      sendEmailNotification(data);
    } catch (emailError) {
      console.error("Email notification failed to send: " + emailError.toString());
    }
    
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
 * Dedicated helper function to send structured HTML email notifications
 */
function sendEmailNotification(data) {
  // If no email is configured, or placeholder is left, skip
  if (!NOTIFICATION_EMAIL || NOTIFICATION_EMAIL === "YOUR_PERSONAL_OR_TEAM_EMAIL_HERE") {
    console.warn("Notification email address has not been configured. Skipping alert dispatch.");
    return;
  }
  
  var spaceTitle = data.spaceTitle || "Unknown Space";
  var clientName = data.clientName || "N/A";
  var clientEmail = data.clientEmail || "N/A";
  var clientPhone = data.clientPhone || "N/A";
  var targetStartDate = data.targetStartDate || "N/A";
  var stayDuration = data.stayDuration || "N/A";
  
  // Construct a subject line with clear high-intent urgency
  var subject = "🚨 New Lead Action Required: Corporate Booking Request for " + spaceTitle;
  
  // Construct premium, highly responsive HTML email body using inline styles matching charcoal/beige theme
  var htmlBody = 
    '<div style="background-color: #EAE6E1; padding: 30px; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #2B2B2A; line-height: 1.6;">' +
      '<div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.03);">' +
        '<!-- Header -->' +
        '<div style="background-color: #1D2A3A; padding: 30px 24px; text-align: center;">' +
          '<h2 style="color: #F4F2EE; margin: 0; font-family: Georgia, serif; font-size: 24px; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase;">Buffalo Stays</h2>' +
          '<p style="color: #8C867E; margin: 5px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: bold;">Corporate Inquiry Alert</p>' +
        '</div>' +
        
        '<!-- Body -->' +
        '<div style="padding: 30px 24px;">' +
          '<h3 style="margin-top: 0; font-family: Georgia, serif; font-size: 18px; font-weight: bold; color: #1D2A3A; border-bottom: 2px solid #EAE6E1; padding-bottom: 12px;">' +
            'New Lead for: ' + spaceTitle +
          '</h3>' +
          
          '<p style="font-size: 14px; color: #2B2B2A; margin-bottom: 24px;">' +
            'A customer has submitted a new corporate housing booking inquiry through the native details page form. Below are the submission details:' +
          '</p>' +
          
          '<!-- Data Grid -->' +
          '<table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">' +
            '<tbody>' +
              '<tr>' +
                '<td style="padding: 10px 0; font-weight: bold; color: #8C867E; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em; width: 40%; border-bottom: 1px solid #F4F2EE;">Client Name</td>' +
                '<td style="padding: 10px 0; color: #2B2B2A; font-weight: 500; border-bottom: 1px solid #F4F2EE;">' + clientName + '</td>' +
              '</tr>' +
              '<tr>' +
                '<td style="padding: 10px 0; font-weight: bold; color: #8C867E; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em; border-bottom: 1px solid #F4F2EE;">Email Address</td>' +
                '<td style="padding: 10px 0; border-bottom: 1px solid #F4F2EE;">' +
                  '<a href="mailto:' + clientEmail + '" style="color: #1D2A3A; text-decoration: underline; font-weight: 500;">' + clientEmail + '</a>' +
                '</td>' +
              '</tr>' +
              '<tr>' +
                '<td style="padding: 10px 0; font-weight: bold; color: #8C867E; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em; border-bottom: 1px solid #F4F2EE;">Phone Number</td>' +
                '<td style="padding: 10px 0; border-bottom: 1px solid #F4F2EE;">' +
                  '<a href="tel:' + clientPhone + '" style="color: #1D2A3A; text-decoration: underline; font-weight: 500;">' + clientPhone + '</a>' +
                '</td>' +
              '</tr>' +
              '<tr>' +
                '<td style="padding: 10px 0; font-weight: bold; color: #8C867E; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em; border-bottom: 1px solid #F4F2EE;">Move-in Date</td>' +
                '<td style="padding: 10px 0; color: #2B2B2A; font-weight: 500; border-bottom: 1px solid #F4F2EE;">' + targetStartDate + '</td>' +
              '</tr>' +
              '<tr>' +
                '<td style="padding: 10px 0; font-weight: bold; color: #8C867E; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em; border-bottom: 1px solid #F4F2EE;">Stay Duration</td>' +
                '<td style="padding: 10px 0; color: #2B2B2A; font-weight: 500; border-bottom: 1px solid #F4F2EE;">' + stayDuration + '</td>' +
              '</tr>' +
            '</tbody>' +
          '</table>' +
          
          '<!-- CTA Block -->' +
          '<div style="background-color: #F4F2EE; padding: 20px; border-radius: 12px; text-align: center; border: 1px solid rgba(0,0,0,0.02);">' +
            '<p style="margin: 0 0 10px 0; font-size: 11px; color: #8C867E; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Action Required</p>' +
            '<p style="margin: 0 0 15px 0; font-size: 13px; color: #2B2B2A;">' +
              'Please review the master spreadsheet row entry or reach out to the customer immediately.' +
            '</p>' +
            '<a href="mailto:' + clientEmail + '?subject=Buffalo Stays Inquiry: ' + encodeURIComponent(spaceTitle) + '" style="display: inline-block; background-color: #1D2A3A; color: #F4F2EE; padding: 12px 24px; border-radius: 8px; font-size: 11px; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">' +
              'Contact Lead Directly' +
            '</a>' +
          '</div>' +
        '</div>' +
        
        '<!-- Footer -->' +
        '<div style="background-color: #F4F2EE; padding: 20px; text-align: center; font-size: 11px; color: #8C867E; border-top: 1px solid rgba(0,0,0,0.03);">' +
          '<p style="margin: 0;">This email was automatically generated by the Buffalo Stays booking ledger.</p>' +
          '<p style="margin: 5px 0 0 0;">&copy; 2026 Buffalo Stays. All rights reserved.</p>' +
        '</div>' +
      '</div>' +
    '</div>';

  // Send the system email alert
  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * Optional GET handler to verify the service is running
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: "online", 
    message: "Buffalo Stays inquiry & notification handler is active. Send POST requests to write to the spreadsheet." 
  })).setMimeType(ContentService.MimeType.JSON);
}
