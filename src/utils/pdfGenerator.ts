import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePdfFromElement(
  elementId: string,
  filename: string = 'Muallim_ul_Quran_Unit1_Sabaq_1_to_19.pdf',
  onProgress?: (status: string) => void
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found for PDF export');
  }

  onProgress?.('Preparing document rendering...');

  // Scroll to top
  window.scrollTo(0, 0);

  onProgress?.('Capturing high-resolution pages...');

  const canvas = await html2canvas(element, {
    scale: 2, // High DPI for crisp Arabic and Urdu text
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: element.scrollWidth,
  });

  onProgress?.('Generating PDF document...');

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  
  // A4 dimensions in mm
  const pdfWidth = 210;
  const pdfHeight = 297;
  
  // Create jsPDF instance
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgProps = pdf.getImageProperties(imgData);
  const totalPdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  let heightLeft = totalPdfHeight;
  let position = 0;

  // Add first page
  pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, totalPdfHeight, undefined, 'FAST');
  heightLeft -= pdfHeight;

  // Add subsequent pages if content spans across pages
  while (heightLeft > 0) {
    position = heightLeft - totalPdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, totalPdfHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;
  }

  onProgress?.('Downloading file...');
  pdf.save(filename);
}

export function triggerPrintDialog(): void {
  window.print();
}
