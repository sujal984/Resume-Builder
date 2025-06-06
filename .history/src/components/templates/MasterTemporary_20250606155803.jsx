import { Row, Col, Button } from "antd";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";

// import { useFormContext } from "../../context/FormContext";
import { useEffect } from "react";

import Temporary from "./Temporary";

import { useNavigate } from "react-router-dom";

function MasterTemporary() {
  const { formData, setFormData, resetForm } = useFormContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <>
      <div>
        <div style={{ textAlign: "left", margin: "1rem" }}>
          <Button type="primary" onClick={() => navigate("/")}>
            <span>
              <ArrowLeftOutlined />
            </span>
            Back
          </Button>
        </div>
        <Temporary data={formData} />
      </div>
    </>
  );
}

export default MasterTemporary;
