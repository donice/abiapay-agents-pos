import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'
import path from 'path'
import QRCode from 'qrcode'

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { vehicle_type, plate_number, payment_ref, product_code } = body

    // Validate required fields
    if (!plate_number || !payment_ref) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create a PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
    })

    // Create a buffer to store the PDF
    const chunks: any[] = []
    doc.on('data', (chunk) => chunks.push(chunk))

    const abiaLogoPath = path.join(process.cwd(), 'public/logos/emblem/abia_@33.jpg')
    const coaLogoPath = path.join(process.cwd(), 'public/logos/emblem/coat_of_arm.png')
    const jtbLogoPath = path.join(process.cwd(), 'public/logos/emblem/jtb.png')

    // Helper for absolute positioning
    const pageWidth = 595.28 // A4 width in points

    // Header Logos
    try {
      doc.image(abiaLogoPath, 50, 40, { width: 60 })
      doc.image(coaLogoPath, pageWidth / 2 - 30, 40, { width: 60 })
      doc.image(jtbLogoPath, pageWidth - 110, 40, { width: 60 })
    } catch (e) {
      console.error("Error loading logos:", e)
    }

    doc.moveDown(5)

    // Title
    doc
      .fontSize(18)
      .font('Helvetica-Bold')
      .text('ABIA STATE GOVERNMENT', { align: 'center' })
      .fontSize(14)
      .text('2025 CONSOLIDATED EMBLEM', { align: 'center' })
      .fontSize(12)
      .text(`for ${product_code || vehicle_type || 'Transport'}`, { align: 'center' })
      .moveDown(1)

    // Reference Info
    const topPos = doc.y
    doc
      .fontSize(10)
      .font('Helvetica-Bold')
      .text('Plate Number:', 50, topPos)
      .font('Helvetica')
      .text(plate_number, 50, topPos + 12)

    doc
      .font('Helvetica-Bold')
      .text('Payment Ref:', pageWidth - 200, topPos, { align: 'right' })
      .font('Helvetica')
      .text(payment_ref, pageWidth - 200, topPos + 12, { align: 'right' })

    doc.moveDown(2)

    // Clearance Certificate Section
    doc
      .rect(40, doc.y, pageWidth - 80, 20)
      .fill('#f0f0f0')
      .fillColor('#000000')
      .font('Helvetica-Bold')
      .text('CLEARANCE CERTIFICATE', 40, doc.y + 5, { align: 'center' })

    doc.moveDown(0.5)

    const clearanceItems = [
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
    ]

    const colWidth = (pageWidth - 100) / 2
    const startY = doc.y + 10

    doc.fontSize(8).font('Helvetica')

    clearanceItems.forEach((item, index) => {
      const col = index % 2
      const row = Math.floor(index / 2)
      doc.text(item, 50 + col * colWidth, startY + row * 12, { width: colWidth - 10 })
    })

    doc.y = startY + Math.ceil(clearanceItems.length / 2) * 12 + 20

    // Footer Text
    doc
      .fontSize(9)
      .text(
        'This is to certify that the vehicle with this sticker has satisfied every lawful road permit with respect to the above listed items and should be allowed free passage and hence protected from any road abuse, touting, illegal block, unlawful delay, harassment by any other State Agent Nationwide.',
        { align: 'center', width: pageWidth - 100 }
      )
      .moveDown(1)

    // Signature
    doc
      .fontSize(10)
      .font('Helvetica-Bold')
      .text('Executive Chairman', { align: 'center' })
      .text('Abia State Internal Revenue Service', { align: 'center' })
      .moveDown(1)

    // QR Code
    const qrText = `https://abiapay.com/verify/emblem?=${payment_ref}`
    const qrDataUrl = await QRCode.toDataURL(qrText)
    const qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64')

    doc.image(qrBuffer, pageWidth / 2 - 40, doc.y, { width: 80 })

    doc.moveDown(7.5)
    doc
      .fontSize(8)
      .font('Helvetica')
      .text('Scan the above URL to verify, or visit:', { align: 'center' })
      .fillColor('blue')
      .text(qrText, { align: 'center', underline: true })

    // Finalize the PDF
    doc.end()

    // Wait for PDF generation to complete
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(chunks) as Buffer)
      })
    })

    // Return the PDF with appropriate headers
    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=emblem-receipt-${payment_ref}.pdf`,
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}