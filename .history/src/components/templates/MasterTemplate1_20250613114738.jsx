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

  const next = () => {
    setStepNo(stepNo + 1);
  };

  const prev = () => setStepNo(stepNo - 1);

  const reset = () => {
    resetForm();
    setNewStep(false);
    setStepNo(0);
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
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={10}
          xl={10}
          className="form-column"
          aria-label="Resume input form"
        >
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
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={14}
          className="preview-column"
          aria-label="Resume preview"
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
