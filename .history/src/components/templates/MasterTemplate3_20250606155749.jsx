import { Row, Col, Button } from "antd";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import MultiStepForm from "../stepforms/MultiStepForm";
// import { useFormContext } from "../../context/FormContext";

import Template3 from "./Template3";

function MasterTemplate3() {
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
        <Row
          gutter={16}
          style={{ minHeight: "100vh" }}
          justify="start"
          align="top"
        >
          <Col flex="0 0 40%" style={{ maxWidth: "40%" }}>
            <MultiStepForm
              setFormData={setFormData}
              formData={formData}
              resetForm={resetForm}
            />
          </Col>
          <Col flex="1 1 60%" style={{ maxWidth: "60%" }}>
            <Template3 data={formData} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MasterTemplate3;
