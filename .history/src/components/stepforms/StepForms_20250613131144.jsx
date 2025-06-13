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
      <div className="">
        <Steps
          current={stepNo}
          items={steps}
          className="mb-4 steps min-w-[100px]"
          labelPlacement="horizontal"
          direction="horizontal"
          size="small"
        />
      </div>
      <div>{children}</div>
    </div>
  );
}
export default StepForms;
