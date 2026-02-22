/**
 * DOCX Generator
 * Generates editable Word documents from resume data
 */

import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType } from 'docx';
import { JSONResume } from '../templates/types';

export class DOCXGenerator {
  /**
   * Generate DOCX from resume data
   */
  static async generateDOCX(resume: JSONResume): Promise<Buffer> {
    const { basics, work, education, skills } = resume;

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Header - Name
            new Paragraph({
              text: basics.name || 'Your Name',
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: { after: 100 },
            }),

            // Job Title
            new Paragraph({
              text: basics.label || 'Professional Title',
              alignment: AlignmentType.CENTER,
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: basics.label || 'Professional Title',
                  size: 24,
                  color: '6366F1',
                }),
              ],
            }),

            // Contact Info
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
              children: [
                new TextRun({
                  text: `${basics.email || ''} | ${basics.phone || ''} | ${basics.location?.city || ''}`,
                  size: 20,
                }),
              ],
            }),

            // Professional Summary
            ...(basics.summary
              ? [
                  new Paragraph({
                    text: 'PROFESSIONAL SUMMARY',
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 100 },
                    border: {
                      bottom: {
                        color: '6366F1',
                        space: 1,
                        style: 'single',
                        size: 6,
                      },
                    },
                  }),
                  new Paragraph({
                    text: basics.summary,
                    spacing: { after: 200 },
                    alignment: AlignmentType.JUSTIFIED,
                  }),
                ]
              : []),

            // Work Experience
            ...(work && work.length > 0
              ? [
                  new Paragraph({
                    text: 'WORK EXPERIENCE',
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 100 },
                    border: {
                      bottom: {
                        color: '6366F1',
                        space: 1,
                        style: 'single',
                        size: 6,
                      },
                    },
                  }),
                  ...work.flatMap((job) => [
                    new Paragraph({
                      spacing: { before: 100, after: 50 },
                      children: [
                        new TextRun({
                          text: job.position,
                          bold: true,
                          size: 24,
                        }),
                      ],
                    }),
                    new Paragraph({
                      spacing: { after: 50 },
                      children: [
                        new TextRun({
                          text: job.name,
                          color: '6366F1',
                          bold: true,
                        }),
                        new TextRun({
                          text: ` | ${job.startDate} - ${job.endDate || 'Present'}`,
                          italics: true,
                        }),
                      ],
                    }),
                    ...(job.highlights || []).map(
                      (highlight) =>
                        new Paragraph({
                          text: `• ${highlight}`,
                          spacing: { after: 50 },
                          indent: { left: 360 },
                        })
                    ),
                  ]),
                ]
              : []),

            // Education
            ...(education && education.length > 0
              ? [
                  new Paragraph({
                    text: 'EDUCATION',
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 100 },
                    border: {
                      bottom: {
                        color: '6366F1',
                        space: 1,
                        style: 'single',
                        size: 6,
                      },
                    },
                  }),
                  ...education.flatMap((edu) => [
                    new Paragraph({
                      spacing: { before: 100, after: 50 },
                      children: [
                        new TextRun({
                          text: `${edu.studyType} in ${edu.area}`,
                          bold: true,
                          size: 24,
                        }),
                      ],
                    }),
                    new Paragraph({
                      spacing: { after: 100 },
                      children: [
                        new TextRun({
                          text: edu.institution,
                          color: '6366F1',
                          bold: true,
                        }),
                        new TextRun({
                          text: ` | ${edu.startDate} - ${edu.endDate || 'Present'}`,
                          italics: true,
                        }),
                      ],
                    }),
                    ...(edu.score
                      ? [
                          new Paragraph({
                            text: `GPA: ${edu.score}`,
                            spacing: { after: 100 },
                          }),
                        ]
                      : []),
                  ]),
                ]
              : []),

            // Skills
            ...(skills && skills.length > 0
              ? [
                  new Paragraph({
                    text: 'SKILLS',
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 100 },
                    border: {
                      bottom: {
                        color: '6366F1',
                        space: 1,
                        style: 'single',
                        size: 6,
                      },
                    },
                  }),
                  new Paragraph({
                    spacing: { after: 100 },
                    children: skills.map(
                      (skill, index) =>
                        new TextRun({
                          text: `${skill.name}${index < skills.length - 1 ? ' • ' : ''}`,
                        })
                    ),
                  }),
                ]
              : []),
          ],
        },
      ],
    });

    return await Packer.toBuffer(doc);
  }
}
