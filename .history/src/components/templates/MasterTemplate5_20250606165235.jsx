import { Row, Col, Button } from "antd";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import MultiStepForm from "../stepforms/MultiStepForm";
import { useFormContext } from "../../context/FormContext";

import Template5 from "./Template5";

function MasterTemplate5() {
  const { formData, setFormData, resetForm } = useFormContext();

  return (
    <>
      <div>
        <div className="header">
          <Button type="primary" onClick={() => window.history.back()}>
            <span>
              <ArrowLeftOutlined />
            </span>
            Back
          </Button>
        </div>
        <Row
          // gutter={16}
          style={{ minHeight: "100%" }}
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
            <Template5 data={formData} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MasterTemplate5;
