import { Row, Col, Button } from "antd";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import MultiStepForm from "../stepforms/MultiStepForm";
import { useFormContext } from "../../context/FormContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Template1 from "./Template1";

function MasterTemplate1() {
  const [newStep, setNewStep] = useState(false);
  const [stepNo, setStepNo] = useState(0);
  const navigate = useNavigate();
  const { formData, setFormData, resetForm } = useFormContext();
  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);
  const handleDownload = async () => {
    if (!pdfRef.current) return;

    await new Promise((resolve) => requestAnimationFrame(resolve));

    const element = pdfRef.current;

    const { offsetHeight, offsetWidth } = element;
    if (offsetHeight === 0 || offsetWidth === 0) {
      console.error("PDF element has no visible content.");
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  return (
    <div className="master-template-container">
      <div className="back-button-container ">
        <Button type="primary" onClick={() => navigate("/")}>
          <span>
            <ArrowLeftOutlined />
          </span>
          Back
        </Button>
      </div>
      <Row className="template-row" justify="center" align="top">
        <Col span={12} className="form-column" aria-label="Resume input form">
          <MultiStepForm
            setFormData={setFormData}
            formData={formData}
            resetForm={resetForm}
            setNewStep={setNewStep}
            stepNo={stepNo}
            setStepNo={setStepNo}
          />
        </Col>
        <Col
          span={12}
          className="preview-column"
          aria-label="Resume preview"
          style={{}}
        >
          <Template1 data={formData} newStep={newStep} stepNo={stepNo} />
        </Col>
      </Row>
    </div>
  );
}

export default MasterTemplate1;
