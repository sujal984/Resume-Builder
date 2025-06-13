import { Steps } from "antd";
import { Row, Col } from "antd";

function StepForms({ stepNo, children }) {
  const steps = [
    { title: "Basic" },
    { title: "Education" },
    { title: "Trainings" },
    { title: "Projects" },
    { title: "Skills" },
    { title: "Review" },
  ];

  return (
    <div className="w-full">
      {/* <Row>
        <Col> */}
      <Steps
        current={stepNo}
        items={steps}
        // responsive
        className="mb-8 steps"
        labelPlacement="vertical"
        size="small"
        direction=""
      />
      <div>{children}</div>
      {/* </Col>
      </Row> */}
    </div>
  );
}
export default StepForms;
