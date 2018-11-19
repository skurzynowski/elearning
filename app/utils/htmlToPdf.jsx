import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export function print () {
  const filename = 'certyfikat.pdf'

  // html2canvas(document.querySelector('#nodeToRenderAsPDF')).then(canvas => {
  html2canvas(document.querySelector('#nodeToRenderAsPDF'), {scale: 2}).then(canvas => {
    let pdf = new jsPDF('p', 'mm', 'a4')
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298)
    pdf.save(filename)
  })
}

// Variant
// This one lets you improve the PDF sharpness by scaling up the HTML node tree to render as an image before getting pasted on the PDF.
export function HQprint (quality = 1) {
  const filename = 'ThisIsYourPDFFilename.pdf'

  html2canvas(document.querySelector('#nodeToRenderAsPDF'),
    {scale: quality}
  ).then(canvas => {
    let pdf = new jsPDF('p', 'mm', 'a4')
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298)
    pdf.save(filename)
  })
}