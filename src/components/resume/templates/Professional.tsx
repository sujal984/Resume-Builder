import { Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

// Register fonts
Font.register({
    family: 'Inter',
    src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf'
});

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        padding: 30,
        fontFamily: 'Inter',
    },
    section: {
        marginBottom: 10,
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#111",
        paddingBottom: 10,
        textAlign: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    contact: {
        fontSize: 10,
        color: "#666",
        marginTop: 5,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
        paddingBottom: 2,
    },
    itemTitle: {
        fontSize: 12,
        fontWeight: "bold",
    },
    itemSubtitle: {
        fontSize: 10,
        fontStyle: "italic",
        marginBottom: 2,
    },
    itemText: {
        fontSize: 10,
        marginBottom: 4,
        lineHeight: 1.5,
    },
    skillBadge: {
        backgroundColor: "#EEE",
        padding: "2 5",
        borderRadius: 4,
        fontSize: 8,
        marginRight: 4,
        marginBottom: 4,
    },
    skillsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    }
});

interface TemplateProps {
    data: ResumeData;
}

export function ProfessionalTemplate({ data }: TemplateProps) {
    const personalSection = data.sections.find((s) => s.type === "personal");
    const personalItem = personalSection?.items[0];

    return (
        <Page size="A4" style={styles.page}>
            {/* Header */}
            {personalItem && (
                <View style={styles.header}>
                    <Text style={styles.name}>{personalItem.fullName || "Your Name"}</Text>
                    <Text style={styles.contact}>
                        {personalItem.email} | {personalItem.phone} | {personalItem.address}
                    </Text>
                    <Text style={styles.contact}>
                        {personalItem.jobTitle}
                    </Text>
                </View>
            )}

            {/* Dynamic Sections */}
            {data.sections
                .filter((s) => s.type !== "personal" && s.isVisible)
                .map((section) => (
                    <View key={section.id} style={styles.section}>
                        <Text style={{ ...styles.sectionTitle, color: data.themeColor || '#000' }}>{section.title}</Text>

                        {section.type === "summary" && section.items[0]?.content && (
                            <Text style={styles.itemText}>{section.items[0].content}</Text>
                        )}

                        {section.type === "experience" && section.items.map((item) => (
                            <View key={item.id} style={{ marginBottom: 8 }}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemSubtitle}>{item.company} | {item.startDate} - {item.endDate}</Text>
                                <Text style={styles.itemText}>{item.description}</Text>
                            </View>
                        ))}

                        {section.type === "education" && section.items.map((item) => (
                            <View key={item.id} style={{ marginBottom: 8 }}>
                                <Text style={styles.itemTitle}>{item.school}</Text>
                                <Text style={styles.itemSubtitle}>{item.degree} | {item.startDate} - {item.endDate}</Text>
                            </View>
                        ))}

                        {section.type === "skills" && (
                            <View style={styles.skillsContainer}>
                                {section.items.map((item) => (
                                    <Text key={item.id} style={styles.skillBadge}>{item.name}</Text>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
        </Page>
    );
}
