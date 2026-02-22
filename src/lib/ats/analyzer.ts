/**
 * ATS (Applicant Tracking System) Analyzer
 * Analyzes resumes for ATS compatibility and provides scoring
 */

import { JSONResume } from '../templates/types';

export interface ATSAnalysisResult {
  overallScore: number;
  scores: {
    keywords: number;
    formatting: number;
    completeness: number;
    readability: number;
  };
  strengths: string[];
  improvements: string[];
  keywords: {
    found: string[];
    missing: string[];
    density: Record<string, number>;
  };
  sections: {
    name: string;
    complete: boolean;
    score: number;
    issues: string[];
  }[];
  recommendations: string[];
}

export class ATSAnalyzer {
  private resume: JSONResume;
  private jobDescription?: string;

  constructor(resume: JSONResume, jobDescription?: string) {
    this.resume = resume;
    this.jobDescription = jobDescription;
  }

  /**
   * Perform complete ATS analysis
   */
  analyze(): ATSAnalysisResult {
    const keywordScore = this.analyzeKeywords();
    const formattingScore = this.analyzeFormatting();
    const completenessScore = this.analyzeCompleteness();
    const readabilityScore = this.analyzeReadability();

    const overallScore = Math.round(
      (keywordScore.score * 0.3 +
        formattingScore.score * 0.25 +
        completenessScore.score * 0.25 +
        readabilityScore.score * 0.2)
    );

    return {
      overallScore,
      scores: {
        keywords: keywordScore.score,
        formatting: formattingScore.score,
        completeness: completenessScore.score,
        readability: readabilityScore.score,
      },
      strengths: this.identifyStrengths(),
      improvements: this.identifyImprovements(),
      keywords: keywordScore.details,
      sections: completenessScore.sections,
      recommendations: this.generateRecommendations(overallScore),
    };
  }

  /**
   * Analyze keyword usage and density
   */
  private analyzeKeywords() {
    const resumeText = this.extractResumeText();
    const keywords = this.extractKeywords(resumeText);
    const jobKeywords = this.jobDescription
      ? this.extractKeywords(this.jobDescription)
      : [];

    const found: string[] = [];
    const missing: string[] = [];
    const density: Record<string, number> = {};

    // Calculate keyword density
    keywords.forEach(keyword => {
      const count = (resumeText.match(new RegExp(keyword, 'gi')) || []).length;
      density[keyword] = count;
      if (count > 0) found.push(keyword);
    });

    // Find missing keywords from job description
    if (jobKeywords.length > 0) {
      jobKeywords.forEach(keyword => {
        if (!found.includes(keyword.toLowerCase())) {
          missing.push(keyword);
        }
      });
    }

    // Calculate score based on keyword presence and density
    const optimalDensity = 2; // Keywords should appear 2-3 times
    let score = 0;

    if (found.length > 0) {
      const avgDensity =
        Object.values(density).reduce((a, b) => a + b, 0) / found.length;
      const densityScore = Math.min(avgDensity / optimalDensity, 1) * 100;
      const coverageScore = jobKeywords.length > 0
        ? (found.length / jobKeywords.length) * 100
        : 80;
      score = Math.round((densityScore + coverageScore) / 2);
    } else {
      score = 50; // Base score if no keywords found
    }

    return {
      score: Math.min(score, 100),
      details: { found, missing, density },
    };
  }

  /**
   * Analyze formatting for ATS compatibility
   */
  private analyzeFormatting() {
    const issues: string[] = [];
    let score = 100;

    // Check for required sections
    if (!this.resume.basics.name) {
      issues.push("Missing name");
      score -= 20;
    }

    if (!this.resume.basics.email) {
      issues.push("Missing email");
      score -= 15;
    }

    if (!this.resume.basics.phone) {
      issues.push("Missing phone number");
      score -= 10;
    }

    // Check work experience formatting
    if (this.resume.work && this.resume.work.length > 0) {
      this.resume.work.forEach((job, index) => {
        if (!job.startDate) {
          issues.push(`Work experience ${index + 1}: Missing start date`);
          score -= 5;
        }
        if (!job.highlights || job.highlights.length === 0) {
          issues.push(`Work experience ${index + 1}: No achievements listed`);
          score -= 5;
        }
      });
    }

    // Check education formatting
    if (this.resume.education && this.resume.education.length > 0) {
      this.resume.education.forEach((edu, index) => {
        if (!edu.startDate) {
          issues.push(`Education ${index + 1}: Missing dates`);
          score -= 3;
        }
      });
    }

    return {
      score: Math.max(score, 0),
      issues,
    };
  }

  /**
   * Analyze section completeness
   */
  private analyzeCompleteness() {
    const sections = [
      {
        name: "Personal Information",
        complete: !!(
          this.resume.basics.name &&
          this.resume.basics.email &&
          this.resume.basics.phone
        ),
        score: 0,
        issues: [] as string[],
      },
      {
        name: "Professional Summary",
        complete: !!(this.resume.basics.summary && this.resume.basics.summary.length > 50),
        score: 0,
        issues: [] as string[],
      },
      {
        name: "Work Experience",
        complete: !!(this.resume.work && this.resume.work.length > 0),
        score: 0,
        issues: [] as string[],
      },
      {
        name: "Education",
        complete: !!(this.resume.education && this.resume.education.length > 0),
        score: 0,
        issues: [] as string[],
      },
      {
        name: "Skills",
        complete: !!(this.resume.skills && this.resume.skills.length > 0),
        score: 0,
        issues: [] as string[],
      },
    ];

    // Calculate scores for each section
    sections.forEach(section => {
      if (section.complete) {
        section.score = 100;
      } else {
        section.score = 0;
        section.issues.push(`${section.name} is incomplete or missing`);
      }
    });

    const completedSections = sections.filter(s => s.complete).length;
    const totalScore = Math.round((completedSections / sections.length) * 100);

    return {
      score: totalScore,
      sections,
    };
  }

  /**
   * Analyze readability
   */
  private analyzeReadability() {
    const text = this.extractResumeText();
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).length;
    
    let score = 100;

    // Check length
    if (words < 200) {
      score -= 20;
    } else if (words > 800) {
      score -= 10;
    }

    // Check for bullet points in work experience
    if (this.resume.work) {
      const totalBullets = this.resume.work.reduce(
        (sum, job) => sum + (job.highlights?.length || 0),
        0
      );
      if (totalBullets < 3) {
        score -= 15;
      }
    }

    return {
      score: Math.max(score, 0),
    };
  }

  /**
   * Identify strengths
   */
  private identifyStrengths(): string[] {
    const strengths: string[] = [];

    if (this.resume.basics.summary && this.resume.basics.summary.length > 100) {
      strengths.push("Strong professional summary");
    }

    if (this.resume.work && this.resume.work.length >= 3) {
      strengths.push("Comprehensive work history");
    }

    if (this.resume.skills && this.resume.skills.length >= 5) {
      strengths.push("Diverse skill set");
    }

    if (this.resume.education && this.resume.education.length > 0) {
      strengths.push("Education credentials included");
    }

    const totalBullets = this.resume.work?.reduce(
      (sum, job) => sum + (job.highlights?.length || 0),
      0
    ) || 0;

    if (totalBullets >= 10) {
      strengths.push("Detailed achievement descriptions");
    }

    return strengths;
  }

  /**
   * Identify areas for improvement
   */
  private identifyImprovements(): string[] {
    const improvements: string[] = [];

    if (!this.resume.basics.summary || this.resume.basics.summary.length < 50) {
      improvements.push("Add a compelling professional summary");
    }

    if (!this.resume.work || this.resume.work.length === 0) {
      improvements.push("Add work experience");
    }

    if (!this.resume.skills || this.resume.skills.length < 5) {
      improvements.push("List more relevant skills");
    }

    const totalBullets = this.resume.work?.reduce(
      (sum, job) => sum + (job.highlights?.length || 0),
      0
    ) || 0;

    if (totalBullets < 5) {
      improvements.push("Add more achievement bullet points");
    }

    if (!this.resume.education || this.resume.education.length === 0) {
      improvements.push("Include education information");
    }

    return improvements;
  }

  /**
   * Generate recommendations based on score
   */
  private generateRecommendations(score: number): string[] {
    const recommendations: string[] = [];

    if (score < 60) {
      recommendations.push("Your resume needs significant improvements for ATS compatibility");
      recommendations.push("Focus on completing all required sections");
      recommendations.push("Add more quantifiable achievements");
    } else if (score < 80) {
      recommendations.push("Your resume is good but can be improved");
      recommendations.push("Add more industry-specific keywords");
      recommendations.push("Quantify your achievements with metrics");
    } else {
      recommendations.push("Your resume is well-optimized for ATS");
      recommendations.push("Consider tailoring it for specific job descriptions");
      recommendations.push("Keep it updated with recent achievements");
    }

    return recommendations;
  }

  /**
   * Extract all text from resume
   */
  private extractResumeText(): string {
    const parts: string[] = [];

    parts.push(this.resume.basics.name || "");
    parts.push(this.resume.basics.label || "");
    parts.push(this.resume.basics.summary || "");

    this.resume.work?.forEach(job => {
      parts.push(job.name, job.position);
      parts.push(...(job.highlights || []));
    });

    this.resume.education?.forEach(edu => {
      parts.push(edu.institution, edu.area, edu.studyType);
    });

    this.resume.skills?.forEach(skill => {
      parts.push(skill.name);
      parts.push(...(skill.keywords || []));
    });

    return parts.join(" ").toLowerCase();
  }

  /**
   * Extract keywords from text
   */
  private extractKeywords(text: string): string[] {
    // Common technical and professional keywords
    const commonKeywords = [
      "leadership",
      "management",
      "development",
      "analysis",
      "strategy",
      "communication",
      "collaboration",
      "innovation",
      "optimization",
      "implementation",
    ];

    const words = text.toLowerCase().split(/\s+/);
    const keywords = new Set<string>();

    words.forEach(word => {
      if (word.length > 4 && !this.isStopWord(word)) {
        keywords.add(word);
      }
    });

    return Array.from(keywords).slice(0, 20);
  }

  /**
   * Check if word is a stop word
   */
  private isStopWord(word: string): boolean {
    const stopWords = [
      "the",
      "and",
      "for",
      "with",
      "this",
      "that",
      "from",
      "have",
      "been",
      "were",
      "their",
      "there",
      "what",
      "which",
      "when",
      "where",
    ];
    return stopWords.includes(word.toLowerCase());
  }
}
