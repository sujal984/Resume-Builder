import { Document } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { ProfessionalTemplate } from "./templates/Professional";
import { ModernTemplate } from "./templates/Modern";

interface ResumePDFProps {
    data: ResumeData;
}

// Map template IDs to PDF components
const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<{ data: ResumeData }>> = {
    professional: ProfessionalTemplate,
    modern: ModernTemplate,
    classic: ProfessionalTemplate, // Use Professional as fallback
    minimal: ProfessionalTemplate,
    creative: ModernTemplate,
    executive: ProfessionalTemplate,
    tech: ModernTemplate,
    elegant: ProfessionalTemplate,
    compact: ProfessionalTemplate,
    colorful: ModernTemplate,
};

export default function ResumePDF({ data }: ResumePDFProps) {
    const TemplateComponent = TEMPLATE_COMPONENTS[data.templateId || 'professional'] || ProfessionalTemplate;

    return (
        <Document>
            <TemplateComponent data={data} />
        </Document>
    );
}
