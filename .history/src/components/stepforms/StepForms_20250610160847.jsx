import { Steps } from "antd";

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
      <Steps
        // current={stepNo}
        // items={steps}
        // responsive
        // className="mb-8 steps"
        // labelPlacement="vertical"
        // size="small"
        current={stepNo}
        items={steps}
        responsive
        className="mb-4 steps"
        labelPlacement="vertical"
        size="small
      />
      <div>{children}</div>
    </div>
  );
}
export default StepForms;
