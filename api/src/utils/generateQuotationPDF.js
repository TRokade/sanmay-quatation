const PDFDocument = require('pdfkit');

async function generateQuotationPDF(quotation) {
    return new Promise((resolve, reject) => {
        try {
            // Create PDF with better default settings
            const doc = new PDFDocument({
                margins: {
                    top: 50,
                    bottom: 50,
                    left: 50,
                    right: 50
                },
                size: 'A4',
                bufferPages: true // Enable buffer pages for better page management
            });

            const chunks = [];
            doc.on('data', chunks.push.bind(chunks));
            doc.on('end', () => resolve(Buffer.concat(chunks)));

            // Helper function to check page space and add new page if needed
            function ensureSpace(requiredSpace) {
                const currentPosition = doc.y;
                if (currentPosition + requiredSpace > doc.page.height - 100) {
                    doc.addPage();
                    addHeader(); // Add header to new page
                    return true;
                }
                return false;
            }

            // Header function for consistency across pages
            function addHeader() {
                doc.rect(0, 0, doc.page.width, 120).fill('#f8f9fa');

                // Logo and company details
                doc.fontSize(24)
                    .font('Helvetica-Bold')
                    .fillColor('#2c3e50')
                    .text('WARSTO', 50, 40);

                doc.fontSize(10)
                    .font('Helvetica')
                    .fillColor('#555')
                    .text('Rajshree Plaza, L.B.S Road,\nGhatkopar(W), Mumbai\nMaharashtra', 50, 70);

                // Quotation details
                doc.fontSize(16)
                    .font('Helvetica-Bold')
                    .fillColor('#2c3e50')
                    .text('QUOTATION', doc.page.width - 200, 40, { align: 'right' });

                doc.fontSize(10)
                    .font('Helvetica')
                    .text(`Date: ${new Date().toLocaleDateString()}`, doc.page.width - 200, 65, { align: 'right' })
                    .text(`Valid Until: ${new Date(quotation.validUntil).toLocaleDateString()}`, doc.page.width - 200, 80, { align: 'right' });

                doc.moveDown(2);
            }

            // Add initial header
            addHeader();

            // Project Details Section
            doc.fontSize(14)
                .font('Helvetica-Bold')
                .fillColor('#2c3e50')
                .text('PROJECT DETAILS', 50, 140);

            doc.fontSize(11)
                .font('Helvetica')
                .fillColor('#555')
                .text(`BHK Type: ${quotation.bhkType}`, 50, 165)
                .text(`Carpet Area: ${quotation.carpetArea} sq ft`, 50, 185);

            let yPosition = 220;

            // Group items by room
            const rooms = quotation.details.reduce((acc, item) => {
                if (!acc[item.room]) acc[item.room] = [];
                acc[item.room].push(item);
                return acc;
            }, {});

            // Table settings
            const tableHeaders = ['Item', 'Size', 'Description', 'Price (INR)'];
            const columnWidths = [150, 100, 200, 100];
            const tableWidth = doc.page.width - 100;

            Object.entries(rooms).forEach(([room, items]) => {
                ensureSpace(150); // Check space for room section

                // Room Header
                doc.rect(50, doc.y, tableWidth, 30)
                    .fillColor('#f0f2f5')
                    .fill();

                doc.fontSize(12)
                    .font('Helvetica-Bold')
                    .fillColor('#2c3e50')
                    .text(room, 60, doc.y - 25);

                doc.moveDown();

                // Table Header
                doc.fontSize(10)
                    .font('Helvetica-Bold')
                    .fillColor('#666');

                let xPosition = 50;
                tableHeaders.forEach((header, index) => {
                    doc.text(header, xPosition, doc.y);
                    xPosition += columnWidths[index];
                });

                doc.moveDown();

                // Table Content
                items.forEach((item, index) => {
                    ensureSpace(40);

                    // Alternate row colors for better readability
                    if (index % 2 === 0) {
                        doc.rect(50, doc.y - 5, tableWidth, 25)
                            .fillColor('#f8f9fa')
                            .fill();
                    }

                    doc.fontSize(10)
                        .font('Helvetica')
                        .fillColor('#555');

                    xPosition = 50;
                    doc.text(item.item, xPosition, doc.y);
                    doc.text(item.size, xPosition + columnWidths[0], doc.y);
                    doc.text(item.description, xPosition + columnWidths[0] + columnWidths[1], doc.y, {
                        width: columnWidths[2] - 10,
                        align: 'left'
                    });
                    doc.text(item.price.toLocaleString('en-IN'), xPosition + columnWidths[0] + columnWidths[1] + columnWidths[2], doc.y, {
                        align: 'right'
                    });

                    doc.moveDown();
                });

                // Room Total
                const roomTotal = items.reduce((sum, item) => sum + (item.price || 0), 0);
                doc.fontSize(11)
                    .font('Helvetica-Bold')
                    .text(`Room Total: ₹${roomTotal.toLocaleString('en-IN')}`,
                        doc.page.width - 150, doc.y + 10, { align: 'right' });

                doc.moveDown(2);
            });

            // Footer section
            ensureSpace(100);
            doc.rect(0, doc.page.height - 100, doc.page.width, 100)
                .fill('#f8f9fa');

            // Grand Total
            doc.fontSize(14)
                .font('Helvetica-Bold')
                .fillColor('#2c3e50')
                .text(`Total Cost: ₹${quotation.totalCost.toLocaleString('en-IN')}`,
                    doc.page.width - 200, doc.page.height - 80, { align: 'right' });

            // Signature lines
            doc.fontSize(10)
                .font('Helvetica')
                .fillColor('#555');

            doc.text('For Customer', 50, doc.page.height - 80);
            doc.text('For Warsto', doc.page.width - 150, doc.page.height - 80);

            doc.text('_________________', 50, doc.page.height - 60);
            doc.text('_________________', doc.page.width - 150, doc.page.height - 60);

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { generateQuotationPDF };