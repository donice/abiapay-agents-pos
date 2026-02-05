import type { NextApiRequest, NextApiResponse } from 'next'
import PDFDocument from 'pdfkit'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { vehicle_type, plate_number, payment_ref } = req.body

        if (!vehicle_type || !plate_number || !payment_ref) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        const doc = new PDFDocument({
            size: 'A4',
            margin: 50,
        })

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', `attachment; filename=vehicle-details-${plate_number}.pdf`)

        doc.pipe(res)

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

        doc.end()
    } catch (error) {
        console.error('Error generating PDF:', error)
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}
