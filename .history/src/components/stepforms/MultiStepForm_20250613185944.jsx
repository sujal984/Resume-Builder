import { useEffect } from "react";
import { Select } from "antd";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import StepForms from "./StepForms";
import { Button, Form, Input, DatePicker, Row, Col } from "antd";

import { data } from "react-router-dom";

const MultiStepForm = ({
  setFormData,
  formData,
  setStepNo,

  stepNo,
}) => {
  const [basicForm] = Form.useForm();
  const [educationForm] = Form.useForm();
  const [trainingsForm] = Form.useForm();
  const [projectsForm] = Form.useForm();
  const [skillsForm] = Form.useForm();

  const handleValuesChange = (stepName, changedValues, allValues) => {
    setFormData((prev) => ({
      ...prev,
      ...allValues,
    }));
  };

  const next = async () => {
    let currentForm;
    if (stepNo === 0) currentForm = basicForm;
    else if (stepNo === 1) currentForm = educationForm;
    else if (stepNo === 2) currentForm = trainingsForm;
    else if (stepNo === 3) currentForm = projectsForm;
    else if (stepNo === 4) currentForm = skillsForm;

    try {
      await currentForm.validateFields();

      if (stepNo === 1) {
        const values = educationForm.getFieldsValue();
        const filteredEducation = (values.education || []).filter(
          (edu) =>
            edu &&
            (edu.degree?.trim() ||
              edu.institute?.trim() ||
              edu.year?.trim() ||
              edu.details?.trim())
        );
        educationForm.setFieldsValue({ education: filteredEducation });
        setFormData((prev) => ({
          ...prev,
          education: filteredEducation,
        }));
      }

      if (stepNo === 2) {
        const values = trainingsForm.getFieldsValue();
        const filteredTranings = (values.trainings || []).filter(
          (trainee) =>
            trainee &&
            (trainee.title?.trim() ||
              trainee.organization?.trim() ||
              trainee.date?.trim())
        );
        trainingsForm.setFieldsValue({ trainings: filteredTranings });
        setFormData((prev) => ({
          ...prev,
          trainings: filteredTranings,
        }));
      }
      if (stepNo === 3) {
        const values = projectsForm.getFieldsValue();
        const filteredProjects = (values.projects || []).filter(
          (project) =>
            project &&
            (project.title?.trim() ||
              project.organization?.trim() ||
              project.date?.trim() ||
              project.details?.trim())
        );
        projectsForm.setFieldsValue({ projects: filteredProjects });
        setFormData((prev) => ({
          ...prev,
          projects: filteredProjects,
        }));
      }
      if (stepNo === 4) {
        const values = skillsForm.getFieldsValue();
        const filteredSkills = (values.skills || []).filter(
          (skill) => skill && (skill.title?.trim() || skill.details?.trim())
        );
        skillsForm.setFieldsValue({ skills: filteredSkills });
        setFormData((prev) => ({
          ...prev,
          skills: filteredSkills,
        }));
      }

      setStepNo(stepNo + 1);
    } catch (err) {}
  };
  const prev = () => setStepNo(stepNo - 1);
  console.log("bjsdgcfj", stepNo);
  return (
    <>
      <Form.Provider>
        <StepForms stepNo={stepNo}>
          <div style={{ width: "100%", padding: "0px 24px" }}>
            {stepNo == 0 && (
              <>
                <Form
                  name="basic"
                  form={basicForm}
                  layout="vertical"
                  className="basic-form w-full "
                  initialValues={formData}
                  onValuesChange={(_, all) =>
                    handleValuesChange("basic", _, all)
                  }
                >
                  <h1
                    className="text-3xl master-title 
                   font-bold   p-3 border-b pl-0 "
                  >
                    Personal Information
                  </h1>
                  <Row style={{ height: "100%" }} gutter={24}>
                    <Col span={12} className="text-center w-full pb-1">
                      <Form.Item
                        name="fname"
                        label="First Name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                          },
                        ]}
                        className="form-items w-full "
                      >
                        <Input className="input" maxLength={10} />
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
                        <Input className="input" />
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
                          className=" input"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12} className="w-full pb-1 ">
                      <Form.Item
                        name="lname"
                        label="last Name"
                        className="form-items  "
                        rules={[
                          {
                            required: true,
                            message: "Please input your  last name!",
                          },
                        ]}
                      >
                        <Input className="input" maxLength={10} />
                      </Form.Item>

                      <Form.Item
                        name="phone"
                        label="Phone"
                        className="form-items "
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
                          className="input"
                          maxLength={10}
                          type="tel"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            e.target.value = value;
                            basicForm.setFieldsValue({ phone: value });
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="location"
                        className="form-items  w-full"
                        label="Location"
                      >
                        <Input className="input" />
                      </Form.Item>
                    </Col>
                    <Col span={24} className="text-center pr-5 p-0 m-0 ">
                      <Form.Item name="objective" label="Career Objective">
                        <Input.TextArea
                          rows={3}
                          style={{ backgroundColor: "#eff2f9" }}
                          maxLength={500}
                          placeholder="Write your career objective here... maximum 500 characters"
                        />
                      </Form.Item>
                      <Form.Item name="portfolio" label="Portfolio URL">
                        <Input style={{ backgroundColor: "#eff2f9" }} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </>
            )}
            {stepNo === 1 && (
              <>
                <h2 className="text-xl font-bold mb-4 pl-0">Education</h2>
                <Form
                  name="education"
                  form={educationForm}
                  className="education-form"
                  layout="vertical"
                  initialValues={formData}
                  onValuesChange={(_, all) =>
                    handleValuesChange("education", _, all)
                  }
                >
                  <Row className="mx-0 my-0 w-full">
                    <Form.List
                      name="education"
                      className="edu-list"
                      maxLength={4}
                    >
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
                                    className="form-items "
                                  >
                                    <Input className="input" />
                                  </Form.Item>
                                </Col>

                                <Col span={8}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "institute"]}
                                    label="Institution"
                                    className="form-items"
                                  >
                                    <Input className="input" />
                                  </Form.Item>
                                </Col>

                                <Col span={8}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "year"]}
                                    label="Year"
                                    className="form-items"
                                  >
                                    <Input className="input" />
                                  </Form.Item>
                                </Col>

                                <Col span={3} className="remove-col">
                                  <Button
                                    type="link"
                                    danger
                                    onClick={() => remove(name)}
                                    className="remove-btn"
                                  >
                                    Remove
                                  </Button>
                                  <Button
                                    type="link"
                                    danger
                                    onClick={() => remove(name)}
                                    className="remove-btn-mobile"
                                    style={{ padding: 0, display: "none" }}
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
                <h2 className="text-xl font-bold mb-4 pl-0">
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
                  <Row className="mx-0 my-0 w-full ">
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
                                    <Input
                                      placeholder="Training Title"
                                      className="input"
                                    />
                                  </Form.Item>
                                </Col>

                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "organization"]}
                                    label="Organization"
                                  >
                                    <Input
                                      placeholder="Organization Name"
                                      className="input"
                                    />
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
                              </Row>
                            </div>
                          ))}
                        </>
                      )}
                    </Form.List>
                  </Row>
                </Form>
              </>
            )}
            {stepNo === 3 && (
              <>
                <h2 className="text-xl font-bold mb-4 pl-0">Projects</h2>
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
                              className="mb-2 border p-1 rounded w-full"
                            >
                              <Row gutter={12} align="middle">
                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "title"]}
                                    label="Project Title"
                                  >
                                    <Input
                                      placeholder="Enter title"
                                      className="input"
                                    />
                                  </Form.Item>
                                </Col>

                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "description"]}
                                    label="Description"
                                  >
                                    <Input.TextArea
                                      rows={1}
                                      placeholder="Describe project"
                                      className="input"
                                    />
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
                                    className="remove-btn"
                                  >
                                    Remove
                                  </Button>
                                </Col>

                                {/* Mobile remove button */}
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

                          {/* Add Project button - placed outside mapped items */}
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
                <h2 className="text-xl font-bold mb-4 pl-0">
                  Skills & Activities
                </h2>
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
                      className="input"
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
                              className="input"
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
          </div>
        </StepForms>
      </Form.Provider>
      <div className="footer mt-2 p-2">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {stepNo > 0 && stepNo < 5 && (
            <Button
              onClick={prev}
              className="flex items-center py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              style={{ marginRight: 1 }}
            >
              <ArrowLeftOutlined className="mr-2" /> Back
            </Button>
          )}
          {stepNo >= 0 && stepNo < 4 && (
            <Button
              onClick={next}
              type="primary"
              className="py-3 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all mx-1.5"
            >
              Next <ArrowRightOutlined />
            </Button>
          )}
          {stepNo === 4 && (
            <Button
              onClick={next}
              type="primary"
              className="py-3 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all mx-1.5"
            >
              Submit & Review
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MultiStepForm;
