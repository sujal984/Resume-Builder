import { ResumeSection } from "@/types/resume";
import PersonalInfoBlock from "./blocks/PersonalInfoBlock";
import SummaryBlock from "./blocks/SummaryBlock";
import ExperienceBlock from "./blocks/ExperienceBlock";
import EducationBlock from "./blocks/EducationBlock";
import SkillsBlock from "./blocks/SkillsBlock";

interface BlockRendererProps {
    section: ResumeSection;
}

export default function BlockRenderer({ section }: BlockRendererProps) {
    switch (section.type) {
        case "personal":
            return <PersonalInfoBlock />;
        case "summary":
            return <SummaryBlock />;
        case "experience":
            return <ExperienceBlock />;
        case "education":
            return <EducationBlock />;
        case "skills":
            return <SkillsBlock />;
        default:
            return <div>Unknown Block Type: {section.type}</div>;
    }
}
