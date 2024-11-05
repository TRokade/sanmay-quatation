const { google } = require('googleapis');
const sheets = google.sheets('v4');
const path = require('path');
const { Readable } = require('stream');

// Update scopes to explicitly include all required permissions
const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file',  // Add this scope
    'https://www.googleapis.com/auth/drive'
];

const SPREADSHEET_ID = '1MjAwmmZxCGlxpm8_ExD3Sm_qDSim_k6qASnwwTz0UWM';
const SHEET_NAME = 'Warsto Quotation';

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../utils/quixotic-card-428217-m6-991872c2add4.json'),
    scopes: SCOPES,
});

async function appendToSheet(formData, pdfBuffer) {
    try {
        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: 'v4', auth: client });
        const drive = google.drive({ version: 'v3', auth: client });

        let pdfUrl = '';
        if (pdfBuffer) {
            try {
                // Create file metadata
                const fileMetadata = {
                    name: `Quotation_${formData.name || 'Customer'}_${new Date().toISOString()}.pdf`,
                    mimeType: 'application/pdf',
                };

                // Create media stream
                const bufferStream = new Readable();
                bufferStream.push(pdfBuffer);
                bufferStream.push(null);

                // Upload file
                const pdfResponse = await drive.files.create({
                    requestBody: fileMetadata,
                    media: {
                        mimeType: 'application/pdf',
                        body: bufferStream
                    },
                    fields: 'id'  // Only return the file ID
                });

                // Set file permissions to anyone with the link can view
                await drive.permissions.create({
                    fileId: pdfResponse.data.id,
                    requestBody: {
                        role: 'reader',
                        type: 'anyone'
                    }
                });

                pdfUrl = `https://drive.google.com/file/d/${pdfResponse.data.id}/view`;
                console.log('PDF uploaded successfully:', pdfUrl);
            } catch (uploadError) {
                console.error('Error uploading PDF:', uploadError);
                throw uploadError;
            }
        }

        // Rest of your code for appending to sheet...
        const formattedOptions = Object.entries(formData.selectedOptions || {})
            .map(([room, options]) => `${room}: ${Array.isArray(options) ? options.join(', ') : options}`)
            .join('\n');

        const values = [
            [
                new Date().toLocaleString(),
                formData.bhkType || '',
                formattedOptions || '',
                formData.carpetArea || '',
                formData.name || '',
                formData.email || '',
                formData.phoneNumber || '',
                formData.propertyName || '',
                pdfUrl
            ]
        ];

        const request = {
            spreadsheetId: SPREADSHEET_ID,
            range: 'A:I',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: { values },
        };

        const response = await googleSheets.spreadsheets.values.append(request);
        console.log('Sheet append response:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error in appendToSheet:', error);
        throw new Error(`Error appending to sheet: ${error.message}`);
    }
}

module.exports = { appendToSheet };