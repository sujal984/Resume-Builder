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
          style={{ justifySelf: "center" }}
        >
          <Template1
            data={formData}
            newStep={newStep}
            stepNo={stepNo}
            next={next}
            prev={prev}
            reset={reset}
          />
        </Col>
      </Row>
    </div>
  );
}

export default MasterTemplate1;
