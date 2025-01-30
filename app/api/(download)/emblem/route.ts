import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { vehicle_type, plate_number, payment_ref } = body

    // Validate required fields
    if (!vehicle_type || !plate_number || !payment_ref) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create a PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
    })

    // Create a buffer to store the PDF
    const chunks: any[] = []
    doc.on('data', (chunk) => chunks.push(chunk))

    // Add content to PDF
    doc
      .fontSize(20)
      .text('Vehicle Details', { align: 'center' })
      .moveDown()
      .fontSize(12)
      .text(`Vehicle Type: ${vehicle_type}`)
      .moveDown()
      .text(`Plate Number: ${plate_number}`)
      .moveDown()
      .text(`Payment Reference: ${payment_ref}`)

    // Finalize the PDF
    doc.end()

    // Wait for PDF generation to complete
    const pdfBuffer = await new Promise((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(chunks))
      })
    })

    // Return the PDF with appropriate headers
    return new Response(pdfBuffer as Buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=vehicle-details-${plate_number}.pdf`,
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