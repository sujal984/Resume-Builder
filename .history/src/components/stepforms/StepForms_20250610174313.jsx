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
      <Row>
        <Col md={6} lg={8} xl={10}>
          <Steps
            current={stepNo}
            items={steps}
            // responsive
            className="mb-4 steps"
            labelPlacement="vertical"
            size="small"
          />
          <div>{children}</div>
        </Col>
      </Row>
    </div>
  );
}
export default StepForms;
