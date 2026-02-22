import { Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

// Register fonts
Font.register({
    family: 'Inter',
    src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf'
});

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        fontFamily: 'Inter',
    },
    sidebar: {
        width: "30%",
        backgroundColor: "#f4f4f5",
        padding: 20,
        height: "100%",
    },
    main: {
        width: "70%",
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
    },
    jobTitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    contact: {
        fontSize: 10,
        color: "#555",
        marginBottom: 3,
    },
    section: {
        marginBottom: 15,
    },
    sidebarSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 8,
        color: "#333",
        borderBottomWidth: 2,
        borderBottomColor: "#333",
        paddingBottom: 2,
    },
    sidebarTitle: {
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 8,
        color: "#333",
    },
    itemTitle: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#000",
    },
    itemSubtitle: {
        fontSize: 10,
        color: "#666",
        marginBottom: 2,
    },
    itemText: {
        fontSize: 10,
        marginBottom: 4,
        lineHeight: 1.4,
        color: "#444",
    },
    skillBadge: {
        backgroundColor: "#e4e4e7",
        padding: "3 6",
        borderRadius: 4,
        fontSize: 9,
        marginBottom: 4,
        color: "#333",
    },
});

interface TemplateProps {
    data: ResumeData;
}

export function ModernTemplate({ data }: TemplateProps) {
    const personalSection = data.sections.find((s) => s.type === "personal");
    const personalItem = personalSection?.items[0];
    const skillsSection = data.sections.find((s) => s.type === "skills");
    const educationSection = data.sections.find((s) => s.type === "education");

    const mainSections = data.sections.filter(s =>
        s.type !== "personal" &&
        s.type !== "skills" &&
        s.type !== "education" &&
        s.isVisible
    );

    return (
        <Page size="A4" style={styles.page}>
            {/* Left Sidebar */}
            <View style={styles.sidebar}>
                {personalItem && (
                    <View style={styles.header}>
                        <Text style={styles.contact}>{personalItem.email}</Text>
                        <Text style={styles.contact}>{personalItem.phone}</Text>
                        <Text style={styles.contact}>{personalItem.address}</Text>
                        {personalItem.website && <Text style={styles.contact}>{personalItem.website}</Text>}
                        {personalItem.linkedin && <Text style={styles.contact}>{personalItem.linkedin}</Text>}
                    </View>
                )}

                {educationSection && educationSection.isVisible && (
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>{educationSection.title}</Text>
                        {educationSection.items.map((item) => (
                            <View key={item.id} style={{ marginBottom: 10 }}>
                                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{item.school}</Text>
                                <Text style={{ fontSize: 10 }}>{item.degree}</Text>
                                <Text style={{ fontSize: 9, color: '#666' }}>{item.startDate} - {item.endDate}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {skillsSection && skillsSection.isVisible && (
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>{skillsSection.title}</Text>
                        <View style={{ flexDirection: 'column', gap: 4 }}>
                            {skillsSection.items.map((item) => (
                                <Text key={item.id} style={styles.skillBadge}>{item.name}</Text>
                            ))}
                        </View>
                    </View>
                )}
            </View>

            {/* Main Content */}
            <View style={styles.main}>
                {personalItem && (
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.name}>{personalItem.fullName || "Your Name"}</Text>
                        <Text style={styles.jobTitle}>{personalItem.jobTitle}</Text>
                    </View>
                )}

                {mainSections.map((section) => (
                    <View key={section.id} style={styles.section}>
                        <Text style={{ ...styles.sectionTitle, borderColor: data.themeColor || '#333' }}>{section.title}</Text>

                        {section.type === "summary" && section.items[0]?.content && (
                            <Text style={styles.itemText}>{section.items[0].content}</Text>
                        )}

                        {section.type === "experience" && section.items.map((item) => (
                            <View key={item.id} style={{ marginBottom: 10 }}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemSubtitle}>{item.company} | {item.startDate} - {item.endDate}</Text>
                                <Text style={styles.itemText}>{item.description}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </Page>
    );
}
