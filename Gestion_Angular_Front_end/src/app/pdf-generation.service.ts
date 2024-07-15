import { Inject, Injectable } from '@angular/core';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
// import * as html2canvas from 'html2canvas';
import { DOCUMENT } from '@angular/common';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  async generatePDF(contentId: string, filename: string): Promise<void> {
    const content = document.getElementById(contentId);

    if (content) {
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL('image/png');

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();

      const pngImage = await pdfDoc.embedPng(imgData);
      const { width, height } = pngImage.scale(1);

      page.drawImage(pngImage, {
        x: 0,
        y: page.getHeight() - height,
        width,
        height,
      });

      const pdfBytes = await pdfDoc.save();
      this.downloadPDF(pdfBytes, filename);
    }
  }

  private downloadPDF(pdfBytes: Uint8Array, filename: string): void {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}
