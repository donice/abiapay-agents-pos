var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import path from 'path';
import QRCode from 'qrcode';
export function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var body, vehicle_type, plate_number, payment_ref, product_code, doc_1, chunks_1, abiaLogoPath, coaLogoPath, jtbLogoPath, pageWidth, topPos, clearanceItems, colWidth_1, startY_1, qrText, qrDataUrl, qrBuffer, pdfBuffer, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, request.json()];
                case 1:
                    body = _a.sent();
                    vehicle_type = body.vehicle_type, plate_number = body.plate_number, payment_ref = body.payment_ref, product_code = body.product_code;
                    // Validate required fields
                    if (!plate_number || !payment_ref) {
                        return [2 /*return*/, NextResponse.json({ error: 'Missing required fields' }, { status: 400 })];
                    }
                    doc_1 = new PDFDocument({
                        size: 'A4',
                        margin: 40,
                    });
                    chunks_1 = [];
                    doc_1.on('data', function (chunk) { return chunks_1.push(chunk); });
                    abiaLogoPath = path.join(process.cwd(), 'public/logos/emblem/abia_@33.jpg');
                    coaLogoPath = path.join(process.cwd(), 'public/logos/emblem/coat_of_arm.png');
                    jtbLogoPath = path.join(process.cwd(), 'public/logos/emblem/jtb.png');
                    pageWidth = 595.28 // A4 width in points
                    ;
                    // Header Logos
                    try {
                        doc_1.image(abiaLogoPath, 50, 40, { width: 60 });
                        doc_1.image(coaLogoPath, pageWidth / 2 - 30, 40, { width: 60 });
                        doc_1.image(jtbLogoPath, pageWidth - 110, 40, { width: 60 });
                    }
                    catch (e) {
                        console.error("Error loading logos:", e);
                    }
                    doc_1.moveDown(5);
                    // Title
                    doc_1
                        .fontSize(18)
                        .font('Helvetica-Bold')
                        .text('ABIA STATE GOVERNMENT', { align: 'center' })
                        .fontSize(14)
                        .text('2025 CONSOLIDATED EMBLEM', { align: 'center' })
                        .fontSize(12)
                        .text("for ".concat(product_code || vehicle_type || 'Transport'), { align: 'center' })
                        .moveDown(1);
                    topPos = doc_1.y;
                    doc_1
                        .fontSize(10)
                        .font('Helvetica-Bold')
                        .text('Plate Number:', 50, topPos)
                        .font('Helvetica')
                        .text(plate_number, 50, topPos + 12);
                    doc_1
                        .font('Helvetica-Bold')
                        .text('Payment Ref:', pageWidth - 200, topPos, { align: 'right' })
                        .font('Helvetica')
                        .text(payment_ref, pageWidth - 200, topPos + 12, { align: 'right' });
                    doc_1.moveDown(2);
                    // Clearance Certificate Section
                    doc_1
                        .rect(40, doc_1.y, pageWidth - 80, 20)
                        .fill('#f0f0f0')
                        .fillColor('#000000')
                        .font('Helvetica-Bold')
                        .text('CLEARANCE CERTIFICATE', 40, doc_1.y + 5, { align: 'center' });
                    doc_1.moveDown(0.5);
                    clearanceItems = [
                        "1. Board of Internal Revenue (Hackney Carriage)",
                        "2. Sanitation Sticker/Pollution/Effluent Discharge/Emission Control",
                        "3. MOT Sticker",
                        "4. Haulage Permit",
                        "5. Safety Emblem",
                        "6. National Freight",
                        "7. Commodity Sticker",
                        "8. Loading and Off Loading",
                        "9. Route/Inter State/Road Tax Warrant Permit",
                        "10. Ogepa Sticker",
                        "11. Agric Levy",
                        "12. Federal Ocean Terminal",
                        "13. Airport",
                        "14. Mid-Year Sticker",
                        "15. ASPIMSS Yearly Safety Clearance Delivery Permit",
                        "16. Heavy Duty Permit",
                        "17. Intra State and Inter State Route Permit",
                        "18. Mobile Advert",
                        "19. Radio TV License",
                        "20. Oil and Gas Permit",
                        "21. Sale and Distribution Permit",
                        "22. Unified Local Government permit",
                        "23. Niger Delta Sticker",
                        "24. Federal Organ Terminal for Trailers, Lorries, Pickup, Buses and Cars",
                        "25. Other Permit Covered by National Emblem"
                    ];
                    colWidth_1 = (pageWidth - 100) / 2;
                    startY_1 = doc_1.y + 10;
                    doc_1.fontSize(8).font('Helvetica');
                    clearanceItems.forEach(function (item, index) {
                        var col = index % 2;
                        var row = Math.floor(index / 2);
                        doc_1.text(item, 50 + col * colWidth_1, startY_1 + row * 12, { width: colWidth_1 - 10 });
                    });
                    doc_1.y = startY_1 + Math.ceil(clearanceItems.length / 2) * 12 + 20;
                    // Footer Text
                    doc_1
                        .fontSize(9)
                        .text('This is to certify that the vehicle with this sticker has satisfied every lawful road permit with respect to the above listed items and should be allowed free passage and hence protected from any road abuse, touting, illegal block, unlawful delay, harassment by any other State Agent Nationwide.', { align: 'center', width: pageWidth - 100 })
                        .moveDown(1);
                    // Signature
                    doc_1
                        .fontSize(10)
                        .font('Helvetica-Bold')
                        .text('Executive Chairman', { align: 'center' })
                        .text('Abia State Internal Revenue Service', { align: 'center' })
                        .moveDown(1);
                    qrText = "https://abiapay.com/verify/emblem?=".concat(payment_ref);
                    return [4 /*yield*/, QRCode.toDataURL(qrText)];
                case 2:
                    qrDataUrl = _a.sent();
                    qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');
                    doc_1.image(qrBuffer, pageWidth / 2 - 40, doc_1.y, { width: 80 });
                    doc_1.moveDown(7.5);
                    doc_1
                        .fontSize(8)
                        .font('Helvetica')
                        .text('Scan the above URL to verify, or visit:', { align: 'center' })
                        .fillColor('blue')
                        .text(qrText, { align: 'center', underline: true });
                    // Finalize the PDF
                    doc_1.end();
                    return [4 /*yield*/, new Promise(function (resolve) {
                            doc_1.on('end', function () {
                                resolve(Buffer.concat(chunks_1));
                            });
                        })
                        // Return the PDF with appropriate headers
                    ];
                case 3:
                    pdfBuffer = _a.sent();
                    // Return the PDF with appropriate headers
                    return [2 /*return*/, new Response(new Uint8Array(pdfBuffer), {
                            headers: {
                                'Content-Type': 'application/pdf',
                                'Content-Disposition': "attachment; filename=emblem-receipt-".concat(payment_ref, ".pdf"),
                            },
                        })];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error generating PDF:', error_1);
                    return [2 /*return*/, NextResponse.json({ error: 'Internal server error' }, { status: 500 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
