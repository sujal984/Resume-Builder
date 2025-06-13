import { useEffect } from "react";
import { Select } from "antd";

import StepForms from "./StepForms";
import { Button, Form, Input, DatePicker, Row, Col } from "antd";
import dayjs from "dayjs";

import { data } from "react-router-dom";
const today = dayjs();
const minDate = today.subtract(18, "year");

const MultiStepForm = ({
  setFormData,
  formData,
  resetForm,
  setNewStep,
  stepNo,
  setStepNo,
}) => {
  const [basicForm] = Form.useForm();
  const [educationForm] = Form.useForm();
  const [trainingsForm] = Form.useForm();
  const [projectsForm] = Form.useForm();
  const [skillsForm] = Form.useForm();

  const reset = () => {
    resetForm();
    basicForm.resetFields();
    educationForm.resetFields();
    trainingsForm.resetFields();
    projectsForm.resetFields();
    skillsForm.resetFields();
    setStepNo(0);
  };

  const handleValuesChange = (stepName, changedValues, allValues) => {
    setFormData((prev) => ({
      ...prev,
      ...allValues,
    }));
  };
  useEffect(() => {
    if (stepNo === 5) {
      setNewStep(true);
    }
  }, [stepNo, setNewStep]);

  return (
    <>
      <div
        className="multi-step-form bg-whiterounded-xl shadow-lg p-1"
        style={{
          width: stepNo === 5 ? "94rem" : "64rem",
          height: stepNo === 5 ? "67rem" : "30rem",
        }}
      >
        <Form.Provider>
          <StepForms stepNo={stepNo}>
            {stepNo == 0 && (
              <>
                <Form
                  name="basic"
                  form={basicForm}
                  layout="vertical"
                  className="basic-form"
                  initialValues={formData}
                  onValuesChange={(_, all) =>
                    handleValuesChange("basic", _, all)
                  }
                >
                  {" "}
                  <h1 className="text-xl font-bold   border-b ">Basic Form</h1>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        name="fname"
                        label="First Name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                          },
                        ]}
                        className="form-items"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label="Email"
                        className="form-items"
                        rules={[
                          {
                            type: "email",
                            message: "Please input a valid email!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="lname"
                        label="last Name"
                        className="form-items"
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        label="Phone"
                        className="form-items"
                        rules={[
                          {
                            required: true,
                            message: "Please input your phone number!",
                          },
                          {
                            pattern: /^[0-9]{10}$/,

                            message: "Please input a valid phone number!",
                          },
                        ]}
                      >
                        <Input
                          maxLength={10}
                          type="tel"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            e.target.value = value;
                            basicForm.setFieldsValue({ phone: value });
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="location"
                        className="form-items"
                        label="Location"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="dob"
                        label="Date of Birth "
                        className="form-items"
                        rules={[
                          { type: "date" },
                          {
                            required: true,
                            message: "Please input your date of birth!",
                          },
                        ]}
                      >
                        <DatePicker
                          style={{ width: "100%" }}
                          // disabledDate={disabledDate}
                          className="form-items"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="objective" label="Career Objective">
                        <Input.TextArea />
                      </Form.Item>
                      <Form.Item name="portfolio" label="Portfolio URL">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>{" "}
              </>
            )}

            {stepNo === 1 && (
              <>
                <h2 className="text-xl font-bold mb-4">Education</h2>
                <Form
                  name="education"
                  form={educationForm}
                  className="education-form"
                  layout="vertical"
                  initialValues={formData}
                  // onValuesChange={(changedValues, allValues) =>
                  //   setFormData(allValues)
                  // }
                  onValuesChange={(_, all) =>
                    handleValuesChange("education", _, all)
                  }
                >
                  <Row className="mx-0 my-0 w-full">
                    <Form.List name="education" className="edu-list">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div
                              key={key}
                              className="mb-2 border p-1 rounded w-full"
                            >
                              <Row gutter={12} align="middle">
                                <Col span={8}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "degree"]}
                                    label="Degree"
                                    className="form-items"
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>

                                <Col span={8}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "institute"]}
                                    label="Institution"
                                    className="form-items"
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>

                                <Col span={6}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "year"]}
                                    label="Year"
                                    className="form-items"
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>

                                <Col span={2} className="remove-col">
                                  <Button
                                    type="link"
                                    danger
                                    onClick={() => remove(name)}
                                    style={{ padding: 0 }}
                                    className="remove-btn"
                                  >
                                    Remove
                                  </Button>
                                </Col>
                                <Button
                                  type="link"
                                  danger
                                  onClick={() => remove(name)}
                                  style={{ padding: 0, display: "none" }}
                                  className="remove-btn-mobile"
                                >
                                  Remove
                                </Button>
                              </Row>
                            </div>
                          ))}

                          <Button
                            type="dashed"
                            onClick={() =>
                              add({
                                degree: "",
                                institute: "",
                                year: "",
                                details: "",
                              })
                            }
                            block
                          >
                            + Add Education
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Row>
                </Form>
              </>
            )}
            {stepNo === 2 && (
              <>
                <h2 className="text-xl font-bold mb-4">
                  Trainings / Certifications
                </h2>
                <Form
                  form={trainingsForm}
                  className="trainings-form"
                  name="trainings"
                  layout="vertical"
                  initialValues={formData}
                  onValuesChange={(_, all) =>
                    handleValuesChange("trainings", _, all)
                  }
                >
                  <Row className="mx-0 my-0 w-full">
                    <Form.List name="trainings">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div
                              key={key}
                              className="mb-2 border p-1 rounded w-full"
                            >
                              <Row gutter={12} align="middle">
                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "title"]}
                                    label="Title"
                                  >
                                    <Input placeholder="Training Title" />
                                  </Form.Item>
                                </Col>

                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "organization"]}
                                    label="Organization"
                                  >
                                    <Input placeholder="Organization Name" />
                                  </Form.Item>
                                </Col>

                                <Col span={4} className="flex items-center">
                                  <Button
                                    type="link"
                                    danger
                                    onClick={() => remove(name)}
                                    style={{
                                      padding: 0,
                                      marginTop: ".5rem",
                                      marginLeft: "1rem",
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          ))}

                          <Button
                            type="dashed"
                            onClick={() =>
                              add({
                                title: "",
                                organization: "",
                                date: "",
                              })
                            }
                            block
                          >
                            + Add Training
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Row>
                </Form>
              </>
            )}
            {stepNo === 3 && (
              <>
                <h2 className="text-xl font-bold mb-4">Projects</h2>
                <Form
                  form={projectsForm}
                  className="projects-form"
                  name="projects"
                  layout="vertical"
                  initialValues={formData}
                  onValuesChange={(_, all) =>
                    handleValuesChange("projects", _, all)
                  }
                >
                  <Row className="mx-0 my-0 w-full">
                    <Form.List name="projects">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div
                              key={key}
                              className="mb-2 border p-1 rounded w-full bg-gray-50"
                              style={{ height: "100px" }}
                            >
                              <Row gutter={16} align="top" className="w-full">
                                <Col span={6}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "title"]}
                                    label="Project Title"
                                  >
                                    <Input placeholder="Enter title" />
                                  </Form.Item>
                                </Col>

                                <Col span={16}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "description"]}
                                    label="Description"
                                  >
                                    <Input.TextArea
                                      rows={2}
                                      placeholder="Describe project"
                                    />
                                  </Form.Item>
                                </Col>

                                <Col span={2} className="flex items-center">
                                  <Button
                                    type="link"
                                    danger
                                    onClick={() => remove(name)}
                                    style={{
                                      marginTop: "2rem",
                                      marginRight: "1rem",
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          ))}

                          <Button
                            type="dashed"
                            onClick={() =>
                              add({
                                title: "",
                                description: "",
                              })
                            }
                            block
                          >
                            + Add Project
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Row>
                </Form>
              </>
            )}
            {stepNo === 4 && (
              <>
                <h2 className="text-xl font-bold mb-4">Skills & Activities</h2>
                <Form
                  form={skillsForm}
                  name="skills"
                  layout="vertical"
                  initialValues={{
                    ...formData,
                    skillsArray: formData.skills || [],
                  }}
                  onValuesChange={(changed, all) => {
                    setFormData((prev) => ({
                      ...prev,
                      skills: all.skills || [],
                      activities: all.activities || [],
                    }));
                  }}
                >
                  <Form.Item name="skills" label="Skills">
                    <Select
                      mode="tags"
                      style={{ width: "100%" }}
                      placeholder="Add skills"
                      options={data.skills}
                    />
                  </Form.Item>
                  <Form.List name="activities">
                    {(fields, { add, remove }) => (
                      <>
                        <label className="ant-form-item-label">
                          Activities
                        </label>
                        {fields.map(({ key, name, ...restField }) => (
                          <Form.Item
                            {...restField}
                            key={key}
                            name={name}
                            style={{ marginBottom: 8 }}
                          >
                            <Input
                              placeholder="Enter activity"
                              addonAfter={
                                <Button
                                  type="link"
                                  danger
                                  onClick={() => remove(name)}
                                  style={{ padding: 0 }}
                                >
                                  Remove
                                </Button>
                              }
                            />
                          </Form.Item>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block>
                            + Add Activity
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form>
              </>
            )}
          </StepForms>
        </Form.Provider>
      </div>
    </>
  );
};

export default MultiStepForm;
