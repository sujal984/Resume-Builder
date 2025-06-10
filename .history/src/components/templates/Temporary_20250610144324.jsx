import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Helmet from "react-helmet";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "antd";

const MyDocument = ({ data }) => {
  const {
    name,
    email,
    phone,
    location,
    objective,
    education = [],
    trainings = [],
    projects = [],
    skills = [],
    activities = [],
    dob,
    portfolio,
  } = data || {};

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
    },
    header: {
      marginBottom: 20,
      textAlign: "center",
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 5,
    },
    contact: {
      fontSize: 10,
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
      borderBottom: "1px solid #000",
    },
    item: {
      marginBottom: 5,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text
            style={styles.contact}
          >{`${email} | ${phone} | ${location}`}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career Objective</Text>
          <Text style={styles.item}>{objective}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu, idx) => (
            <Text key={idx} style={styles.item}>
              <Text style={{ fontWeight: "bold" }}>
                {edu.degree} - {edu.institute}
              </Text>{" "}
              ({edu.year})
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trainings / Certifications</Text>
          {trainings.map((t, idx) => (
            <Text key={idx} style={styles.item}>
              {t.title} {t.organization ? `– ${t.organization}` : ""}{" "}
              {t.date ? `(${t.date})` : ""}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {projects.map((proj, idx) => (
            <View key={idx} style={{ marginBottom: 5 }}>
              <Text style={{ fontWeight: "bold" }}>{proj.title}</Text>
              <Text>{proj.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text>{skills.join(", ")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extra Curricular Activities</Text>
          <Text>{activities.join(", ")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Details</Text>
          <Text style={styles.item}>DOB: {dob}</Text>
          <Text style={styles.item}>Portfolio: {portfolio}</Text>
        </View>
      </Page>
    </Document>
  );
};

function Temporary({ title, data }) {
  const downloadPDF = async () => {
    const element = document.getElementById("resume");
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("resume.pdf");
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h1 className="text-slate-700">diljhdilhjdfouhti</h1>
      <div
        id="resume"
        className="max-w-4xl p-2 font-sans text-gray-800 md:mx-0 border-1 preview"
      >
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold">{data?.name}</h1>
          <p className="text-sm">{`${data?.email} ${data?.phone} ${data?.location}`}</p>
        </header>

        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">
            Career Objective
          </h2>
          <p>{data?.objective}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
          <ul>
            {(data?.education?.length > 0 ? data.education : []).map(
              (edu, idx) => (
                <li key={idx}>
                  <strong>
                    {edu.degree} - {edu.institute}
                  </strong>{" "}
                  {edu.year}
                </li>
              )
            )}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">
            Trainings / Certifications
          </h2>
          <ul>
            {(data?.trainings?.length > 0 ? data.trainings : []).map(
              (t, idx) => (
                <li key={idx}>
                  {t.title} {t.organization ? `– ${t.organization}` : ""}{" "}
                  {t.date ? `(${t.date})` : ""}
                </li>
              )
            )}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">Projects</h2>
          {(data?.projects?.length > 0 ? data.projects : []).map(
            (proj, idx) => (
              <div key={idx}>
                <h3 className="font-semibold">{proj.title}</h3>
                <p>{proj.description}</p>
              </div>
            )
          )}
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
          <ul>
            {(data?.skills?.length > 0 ? data.skills : []).map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">
            Extra Curricular Activities
          </h2>
          <ul>
            {(data?.activities?.length > 0 ? data.activities : []).map(
              (act, idx) => (
                <li key={idx}>{act}</li>
              )
            )}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">
            Additional Details
          </h2>
          <p>DOB: {data?.dob}</p>
          <p>
            Portfolio:{" "}
            <a
              href={data?.portfolio}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data?.portfolio}
            </a>
          </p>
        </section>
      </div>
      <div
        style={{
          gap: "1rem",
          margin: "1rem",
        }}
      >
        <PDFDownloadLink
          document={<MyDocument data={data} />}
          fileName="resume.pdf"
        >
          {({ loading }) => (
            <Button type="primary" loading={loading}>
              {loading ? "Generating PDF..." : "Download as Text PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </>
  );
}

export default Temporary;
