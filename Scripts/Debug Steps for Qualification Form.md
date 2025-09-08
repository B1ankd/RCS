# Debug Steps for Qualification Form Issue

## Step 1: Verify Google Apps Script Setup

1. **Open your Google Apps Script project**
2. **Run the test function** `testSpreadsheetAccess()`:
   - Click on the function dropdown
   - Select `testSpreadsheetAccess`
   - Click the Run button
   - Check the execution log for any errors

3. **If that works, test the full function** `testQualificationForm()`:
   - Select `testQualificationForm` 
   - Click Run
   - Check the execution log

## Step 2: Check Web App Deployment

1. **Verify Web App is deployed correctly**:
   - Click "Deploy" → "Manage Deployments"
   - Make sure there's an active web app deployment
   - Copy the Web App URL again

2. **Test the Web App URL directly**:
   - You can test POST requests to your Web App URL using a tool like Postman
   - Or create a simple test HTML file to verify

## Step 3: Check Browser Console

1. **Open qualification.html in your browser**
2. **Open Developer Tools** (F12)
3. **Go to Console tab**
4. **Complete the questionnaire and submit the form**
5. **Check console logs** - you should see:
   - "Collecting questionnaire answers..."
   - "Questions answered: 10"  
   - "Risk score calculated: XX%"
   - "Form data prepared: {object}"
   - "Sending data to: [URL]"
   - "Response received: {response}"

## Step 4: Common Issues and Solutions

### Issue 1: Permissions
- **Problem**: Google Apps Script doesn't have permission to access the spreadsheet
- **Solution**: Run `testSpreadsheetAccess()` and grant permissions when prompted

### Issue 2: Wrong Spreadsheet ID
- **Problem**: The SPREADSHEET_ID in the script doesn't match your actual spreadsheet
- **Solution**: 
  1. Open your Google Sheet
  2. Copy the ID from the URL: `https://docs.google.com/spreadsheets/d/[THIS_IS_THE_ID]/edit`
  3. Update the SPREADSHEET_ID in your Google Apps Script

### Issue 3: Web App URL Issues
- **Problem**: Using wrong Web App URL or old deployment
- **Solution**: 
  1. Create a NEW deployment (don't update existing one)
  2. Make sure "Execute as" is set to "Me"  
  3. Make sure "Who has access" is set to "Anyone"
  4. Copy the NEW Web App URL

### Issue 4: CORS Issues
- **Problem**: Browser blocking the request
- **Solution**: The `mode: 'no-cors'` should handle this, but you can also try:
  1. Testing from a proper web server (not file://)
  2. Checking if the request is actually reaching the server

## Step 5: Manual Test

If automated tests fail, try this manual approach:

1. **Open Google Apps Script**
2. **Create a simple test function**:
```javascript
function manualTest() {
  const testData = {
    firstName: 'Test',
    lastName: 'User', 
    companyName: 'Test Company',
    email: 'test@example.com',
    phone: '(555) 123-4567',
    totalRiskScore: 50,
    questionsAnswered: [
      { question: 'Test Question', answer: 'Test Answer', score: 2, risk: 'medium' }
    ]
  };
  
  saveToSpreadsheet(testData);
  Logger.log('Manual test completed - check your spreadsheet');
}
```
3. **Run this function**
4. **Check your Google Sheet** for the new "QualificationResults" tab

## Step 6: Check Email Functionality

After data saving works:

1. **Uncomment email lines in testQualificationForm()**:
```javascript
sendUserConfirmationEmail(testData.email, testData);
sendManagementNotificationEmail(testData);
```

2. **Run the test again**
3. **Check both email addresses for test emails**

## Step 7: If All Else Fails

**Simplify the approach:**

1. **Use the existing contact form script** as a base
2. **Add qualification-specific fields** to the existing system
3. **Use the same spreadsheet** but add columns for qualification data

Let me know what you find at each step, and I can help troubleshoot the specific issue!