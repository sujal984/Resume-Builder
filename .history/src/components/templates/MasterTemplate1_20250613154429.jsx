import { Row, Col, Button } from "antd";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import MultiStepForm from "../stepforms/MultiStepForm";
import { useFormContext } from "../../context/FormContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Template1 from "./Template1";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useRef } from "react";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";

function MasterTemplate1() {
  const [newStep, setNewStep] = useState(false);
  const [stepNo, setStepNo] = useState(0);
  const navigate = useNavigate();
  const pdfRef = useRef();
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
  const reset = () => {
    resetForm();
    setNewStep(false);
    setStepNo(0);
  };
  return (
    <div className="master-template-container">
      <div className="header-button-container ">
        <Button type="primary" onClick={() => navigate("/")}>
          <span>
            <ArrowLeftOutlined />
          </span>
          Back
        </Button>
        {newStep && (
          <div>
            <>
              <Button
                onClick={reset}
                className="py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-colors mx-1.5"
              >
                Back to editor
              </Button>
              <Button
                type="primary"
                onClick={handleDownload}
                className="py-3 px-8 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-md hover:shadow-lg transition-all mx-1.5"
              >
                <DownloadOutlined className="mr-2" /> Download Resume
              </Button>
            </>
          </div>
        )}
      </div>
      <Row className="template-row" justify="center" align="top">
        <Col
          span={{ xs: 24, sm: 1, md: 12, lg: 12, xl: 12, xxl: 12 }}
          className="form-column"
          aria-label="Resume input form"
        >
          {!newStep && (
            <MultiStepForm
              setFormData={setFormData}
              formData={formData}
              resetForm={resetForm}
              setNewStep={setNewStep}
              stepNo={stepNo}
              setStepNo={setStepNo}
              handleDownload={handleDownload}
            />
          )}
        </Col>

        <Col
          span={newStep ? 24 : 12}
          sm={24}
          className="preview-column"
          aria-label="Resume preview"
          style={{}}
        >
          <Template1
            data={formData}
            newStep={newStep}
            stepNo={stepNo}
            pdfRef={pdfRef}
          />
        </Col>
      </Row>
    </div>
  );
}

export default MasterTemplate1;
