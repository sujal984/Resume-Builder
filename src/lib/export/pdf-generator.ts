/**
 * PDF Generator using Puppeteer
 * Generates ATS-friendly PDF resumes
 */

import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { JSONResume } from '../templates/types';

export interface PDFOptions {
  template: string;
  theme?: any;
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

      // Generate HTML content
      const html = this.generateHTML(resume, options);

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

  /**
   * Generate HTML for PDF
   */
  private static generateHTML(resume: JSONResume, options: PDFOptions): string {
    const { basics, work, education, skills } = resume;

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #333;
    }
    
    .container {
      max-width: 8.5in;
      margin: 0 auto;
      padding: 0.5in;
    }
    
    .header {
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 2px solid #6366F1;
      padding-bottom: 15px;
    }
    
    .name {
      font-size: 24pt;
      font-weight: bold;
      color: #1F2937;
      margin-bottom: 5px;
    }
    
    .title {
      font-size: 14pt;
      color: #6366F1;
      margin-bottom: 10px;
    }
    
    .contact {
      font-size: 10pt;
      color: #666;
    }
    
    .section {
      margin-bottom: 20px;
    }
    
    .section-title {
      font-size: 14pt;
      font-weight: bold;
      color: #6366F1;
      border-bottom: 1px solid #E5E7EB;
      padding-bottom: 5px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    
    .summary {
      text-align: justify;
      margin-bottom: 15px;
    }
    
    .experience-item, .education-item {
      margin-bottom: 15px;
    }
    
    .job-header, .edu-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    
    .job-title, .degree {
      font-weight: bold;
      font-size: 12pt;
    }
    
    .company, .institution {
      color: #6366F1;
      font-weight: 600;
    }
    
    .date {
      color: #666;
      font-size: 10pt;
    }
    
    .highlights {
      margin-left: 20px;
      margin-top: 5px;
    }
    
    .highlights li {
      margin-bottom: 3px;
    }
    
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .skill-item {
      background: #F3F4F6;
      padding: 5px 12px;
      border-radius: 4px;
      font-size: 10pt;
    }
    
    @media print {
      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="name">${basics.name || 'Your Name'}</div>
      <div class="title">${basics.label || 'Professional Title'}</div>
      <div class="contact">
        ${basics.email || ''} ${basics.phone ? '| ' + basics.phone : ''} 
        ${basics.location?.city ? '| ' + basics.location.city : ''}
      </div>
    </div>

    <!-- Summary -->
    ${basics.summary ? `
    <div class="section">
      <div class="section-title">Professional Summary</div>
      <div class="summary">${basics.summary}</div>
    </div>
    ` : ''}

    <!-- Work Experience -->
    ${work && work.length > 0 ? `
    <div class="section">
      <div class="section-title">Work Experience</div>
      ${work.map(job => `
        <div class="experience-item">
          <div class="job-header">
            <div>
              <div class="job-title">${job.position}</div>
              <div class="company">${job.name}</div>
            </div>
            <div class="date">
              ${job.startDate} - ${job.endDate || 'Present'}
            </div>
          </div>
          ${job.highlights && job.highlights.length > 0 ? `
            <ul class="highlights">
              ${job.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Education -->
    ${education && education.length > 0 ? `
    <div class="section">
      <div class="section-title">Education</div>
      ${education.map(edu => `
        <div class="education-item">
          <div class="edu-header">
            <div>
              <div class="degree">${edu.studyType} in ${edu.area}</div>
              <div class="institution">${edu.institution}</div>
            </div>
            <div class="date">
              ${edu.startDate} - ${edu.endDate || 'Present'}
            </div>
          </div>
          ${edu.score ? `<div>GPA: ${edu.score}</div>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Skills -->
    ${skills && skills.length > 0 ? `
    <div class="section">
      <div class="section-title">Skills</div>
      <div class="skills-container">
        ${skills.map(skill => `
          <div class="skill-item">${skill.name}</div>
        `).join('')}
      </div>
    </div>
    ` : ''}
  </div>
</body>
</html>
    `;
  }
}
