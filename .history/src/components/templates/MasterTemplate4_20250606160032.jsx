import { Row, Col, Button } from "antd";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import MultiStepForm from "../stepforms/MultiStepForm";
import { useFormContext } from "../../context/FormContext";

import Template4 from "./Template4";

function MasterTemplate4() {
  const { formData, setFormData, resetForm } = useFormContext();

  return (
    <>
      <div>
        <div style={{ textAlign: "left", margin: "1rem" }}>
          <Button type="primary" onClick={() => window.history.back()}>
            <span>
              <ArrowLeftOutlined />
            </span>
            Back
          </Button>
        </div>
        <Row style={{ minHeight: "100%" }} justify="start" align="top">
          <Col flex="0 0 40%" style={{ maxWidth: "40%" }}>
            <MultiStepForm
              setFormData={setFormData}
              formData={formData}
              resetForm={resetForm}
            />
          </Col>
          <Col flex="1 1 60%" style={{ maxWidth: "60%" }}>
            <Template4 data={formData} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MasterTemplate4;
