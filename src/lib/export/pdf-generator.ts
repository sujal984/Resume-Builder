import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { JSONResume } from '../templates/types';
import { generateHTMLFromJSON } from './html-renderer';
import { getLayoutConfig } from '@/lib/template-engine/layouts';
import { DesignTokens, defaultTokens, mergeTokens } from '@/lib/design-tokens';

export interface PDFOptions {
  template: string;
  theme?: Partial<DesignTokens>;
  format?: 'A4' | 'Letter';
}

export class PDFGenerator {
  /**
   * Generate PDF from resume data
   */
  static async generatePDF(
    resume: JSONResume,
    options: PDFOptions = { template: 'modern', format: 'A4' }
  ): Promise<Buffer> {
    let browser;

    try {
      // Launch browser
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
      });

      const page = await browser.newPage();

      const layout = getLayoutConfig(options.template || 'modern');
      const tokens = mergeTokens(defaultTokens, options.theme);
      const html = generateHTMLFromJSON(resume, layout, tokens);

      // Set content
      await page.setContent(html, {
        waitUntil: 'networkidle0',
      });

      // Generate PDF
      const pdf = await page.pdf({
        format: options.format || 'A4',
        printBackground: true,
        margin: {
          top: '0.5in',
          right: '0.5in',
          bottom: '0.5in',
          left: '0.5in',
        },
      });

      return Buffer.from(pdf);
    } catch (error) {
      console.error('PDF Generation Error:', error);
      throw new Error('Failed to generate PDF');
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
