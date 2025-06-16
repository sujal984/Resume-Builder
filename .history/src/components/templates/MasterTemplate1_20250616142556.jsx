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
  const [stepNo, setStepNo] = useState(0);
  const navigate = useNavigate();
  const pdfRef = useRef();
  const { formData, setFormData, resetForm } = useFormContext();
  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);
  // const handleDownload = async () => {
  //   if (!pdfRef.current) return;

  //   await new Promise((resolve) => requestAnimationFrame(resolve));

  //   const element = pdfRef.current;

  //   const { offsetHeight, offsetWidth } = element;
  //   if (offsetHeight === 0 || offsetWidth === 0) {
  //     console.error("PDF element has no visible content.");
  //     return;
  //   }

  //   try {
  //     const canvas = await html2canvas(element, {
  //       scale: 2,
  //       useCORS: true,
  //     });

  //     const imgData = canvas.toDataURL("image/png");

  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     pdf.save("resume.pdf");
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   }
  // };
  const reset = () => {
    resetForm();

    setStepNo(0);
  };
  const handleDownload = async () => {
    if (!pdfRef.current) return;

    // Ensure DOM is ready
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const element = pdfRef.current;

    // Temporarily adjust styling for PDF generation
    const originalStyles = {
      width: element.style.width,
      overflow: element.style.overflow,
    };

    // Force consistent dimensions for PDF generation
    element.style.width = "794px"; // A4 width in pixels (210mm)
    element.style.overflow = "visible";

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        windowWidth: 794, // Match A4 width
        width: 794,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add some margin (10mm on each side)
      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight - 20);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Restore original styles
      element.style.width = originalStyles.width;
      element.style.overflow = originalStyles.overflow;
    }
  };

  return (
    <div className="master-template-container">
      <div className="header-button-container ">
        <Button
          className="py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-colors mx-1.5"
          onClick={() => navigate("/")}
        >
          <span>
            <ArrowLeftOutlined />
          </span>
          Back to template
        </Button>
        {stepNo === 5 && (
          <div className="Download hidden md:flex sm:hidden">
            <>
              <Button
                onClick={() => setStepNo(4)}
                className="py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-colors mx-1.5"
              >
                Back to editor
              </Button>
              <Button
                type="primary"
                onClick={handleDownload}
                className="py-3 px-8 rounded-lg  bg-green-600 hover:bg-green-700 text-white font-medium shadow-md hover:shadow-lg transition-all mx-1.5"
              >
                <DownloadOutlined className="mr-2" /> Download Resume
              </Button>
            </>
          </div>
        )}
      </div>
      <Row className="template-row" justify="center" align="top">
        <Col
          sm={{ span: 24 }}
          md={{ span: 24 }}
          xl={{ span: 12 }}
          span={24}
          className="form-column"
          aria-label="Resume input form"
        >
          {stepNo <= 4 && (
            <MultiStepForm
              setFormData={setFormData}
              formData={formData}
              resetForm={resetForm}
              stepNo={stepNo}
              setStepNo={setStepNo}
              handleDownload={handleDownload}
            />
          )}
        </Col>

        <Col
          {...(stepNo === 5
            ? { span: 24 }
            : { xs: 24, sm: 24, md: 24, lg: 24, xl: 12, xxl: 12 })}
          className="preview-column"
          aria-label="Resume preview"
          style={{}}
        >
          <Template1 data={formData} stepNo={stepNo} pdfRef={pdfRef} />
        </Col>
      </Row>
      {stepNo === 5 && (
        <div className="Download-wrapper flex md:hidden justify-center mt-4">
          <div className="Download flex flex-col items-center gap-2 w-full px-4">
            <Button
              onClick={() => setStepNo(4)}
              className="w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
            >
              Back to editor
            </Button>
            <Button
              type="primary"
              onClick={handleDownload}
              className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white"
            >
              <DownloadOutlined className="mr-2" /> Download Resume
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MasterTemplate1;
