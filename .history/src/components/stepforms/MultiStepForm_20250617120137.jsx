import { Select } from "antd";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import StepForms from "./StepForms";
import { Button, Form, Input, DatePicker, Row, Col } from "antd";
import dayjs from "dayjs";

import { data } from "react-router-dom";
const { RangePicker } = DatePicker;
const yearFormat = "YYYY";

const MultiStepForm = ({
  setFormData,
  formData,
  setStepNo,
  initialData,
  setDateRange,

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
  const handledateChange = (dates, dateStrings) => {
    setDateRange(dates);
    console.log("Dates (dayjs):", dates);
    console.log("Formatted Strings:", dateStrings);
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
          (skill) => skill && skill.trim()
        );
        const filteredActivities = (values.activities || []).filter(
          (activity) => activity && activity.trim()
        );
        skillsForm.setFieldsValue({
          skills: filteredSkills,
          activities: filteredActivities,
        });
        setFormData((prev) => ({
          ...prev,
          skills: filteredSkills,
          activities: filteredActivities,
        }));
      }

      setStepNo(stepNo + 1);
      window.scrollTo(0, 0);
    } catch (err) {}
  };
  const prev = () => setStepNo(stepNo - 1);

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
                  initialValues={initialData}
                  className="basic-form w-full "
                  onValuesChange={(_, all) => {
                    if (all.email) {
                      all.email = all.email.trim();
                      basicForm.setFieldsValue({ email: all.email });
                    }
                    if (all.fname) {
                      all.fname = all.fname.trim();
                      basicForm.setFieldsValue({ fname: all.fname });
                    }
                    if (all.lname) {
                      all.lname = all.lname.trim();
                      basicForm.setFieldsValue({ lname: all.lname });
                    }
                    handleValuesChange("basic", _, all);
                  }}
                >
                  <h1
                    className="text-3xl master-title 
                   font-bold   p-3 border-b pl-0 "
                  >
                    Personal Information
                  </h1>
                  <Row style={{ height: "100%" }} gutter={24}>
                    <Col span={12} className=" w-full pb-1">
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
                        <Input
                          className="input"
                          maxLength={10}
                          placeholder="First Name"
                        />
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
                        <Input
                          className="input"
                          placeholder="Email@gmail.com"
                        />
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
                          disabledDate={(current) =>
                            current && current > dayjs().endOf("day")
                          }
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
                        <Input
                          className="input"
                          maxLength={10}
                          placeholder="Last Name"
                        />
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
                          placeholder="0000000000"
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
                        <Input className="input" maxLength={10} />
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
                        <Input
                          className="input"
                          style={{ backgroundColor: "#eff2f9" }}
                          placeholder="Enter your portfolio URL"
                        />
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
                  initialValues={initialData}
                  form={educationForm}
                  className="education-form"
                  layout="vertical"
                  onValuesChange={(_, all) =>
                    handleValuesChange("education", _, all)
                  }
                >
                  <Row className="mx-0 my-0 w-full p-2">
                    <Form.List name="education" className="edu-list">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div
                              key={key}
                              className="mb-2 border p-1 rounded w-full"
                            >
                              <Row gutter={12} align="middle" className="p-2">
                                <Col span={8} className="h-fit">
                                  <Form.Item
                                    {...restField}
                                    name={[name, "degree"]}
                                    label="Degree"
                                    className="form-items "
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please input your degree!",
                                      },
                                    ]}
                                  >
                                    <Input
                                      className="input"
                                      maxLength={40}
                                      placeholder="B.Tech"
                                    />
                                  </Form.Item>
                                </Col>

                                <Col span={8}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "institute"]}
                                    label="Institution"
                                    className="form-items"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please input your institution name!",
                                      },
                                    ]}
                                  >
                                    <Input
                                      className="input"
                                      maxLength={40}
                                      placeholder="Jawaharlal Nehru University"
                                    />
                                  </Form.Item>
                                </Col>

                                <Col span={8}>
                                  <div className="flex gap-2">
                                    <Form.Item
                                      {...restField}
                                      name={[name, "year"]}
                                      label="Year"
                                      className="form-items"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please select education period!",
                                        },
                                        () => ({
                                          validator(_, value) {
                                            if (!value || value.length !== 2) {
                                              return Promise.reject(
                                                new Error(
                                                  "Please select both start and end years"
                                                )
                                              );
                                            }
                                            if (value[0].isAfter(value[1])) {
                                              return Promise.reject(
                                                new Error(
                                                  "End year must be after start year"
                                                )
                                              );
                                            }
                                            return Promise.resolve();
                                          },
                                        }),
                                      ]}
                                    >
                                      <RangePicker
                                        onChange={handledateChange}
                                        picker="year"
                                        format={yearFormat}
                                        placeholder={["Start Year", "End Year"]}
                                        style={{ width: "100%" }}
                                        className="input"
                                      />
                                    </Form.Item>
                                    <Button
                                      type="link"
                                      danger
                                      onClick={() => remove(name)}
                                      className="remove-btn"
                                      style={{
                                        position: "absolute",
                                        right: "0",
                                        top: "0",
                                      }}
                                    >
                                      <CloseCircleOutlined color="red" />
                                    </Button>

                                    <Button
                                      type="link"
                                      danger
                                      onClick={() => remove(name)}
                                      className="remove-btn-mobile"
                                      style={{ padding: 0, display: "none" }}
                                    >
                                      <CloseCircleOutlined color="red" />
                                    </Button>
                                  </div>
                                </Col>
                                {/* <Col></Col> */}
                              </Row>
                            </div>
                          ))}

                          <Button
                            disabled={fields.length >= 4}
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
                  initialValues={initialData}
                  className="trainings-form"
                  name="trainings"
                  layout="vertical"
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
                              <Row gutter={12} align="middle p-2">
                                <Col span={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "title"]}
                                    label="Title"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please input your title!",
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Training Title"
                                      className="input"
                                      maxLength={30}
                                    />
                                  </Form.Item>
                                </Col>

                                <Col span={12}>
                                  <div>
                                    <Form.Item
                                      {...restField}
                                      name={[name, "organization"]}
                                      label="Organization"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please input your organization name!",
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder="Organization Name"
                                        className="input"
                                        maxLength={30}
                                      />
                                    </Form.Item>
                                    <Button
                                      type="link"
                                      danger
                                      onClick={() => remove(name)}
                                      className="remove-btn "
                                      style={{
                                        position: "absolute",
                                        right: "0",
                                        top: "0",
                                      }}
                                    >
                                      <CloseCircleOutlined color="red" />
                                    </Button>

                                    <Button
                                      type="link"
                                      danger
                                      onClick={() => remove(name)}
                                      style={{
                                        padding: 0,
                                        display: "none",
                                        position: "absolute",
                                        right: "0",
                                        top: "0",
                                      }}
                                      className="remove-btn-mobile"
                                    >
                                      <CloseCircleOutlined color="red" />
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          ))}
                          <Button
                            disabled={fields.length >= 4}
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
                <h2 className="text-xl font-bold mb-4 pl-0">Projects</h2>
                <Form
                  form={projectsForm}
                  className="projects-form"
                  initialValues={initialData}
                  name="projects"
                  layout="vertical"
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
                                <Col span={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "title"]}
                                    label="Project Title"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please input your title!",
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Enter title"
                                      className="input"
                                      maxLength={30}
                                    />
                                  </Form.Item>
                                </Col>

                                <Col span={12}>
                                  <div>
                                    <Form.Item
                                      {...restField}
                                      name={[name, "description"]}
                                      label="Description"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please input your description!",
                                        },
                                      ]}
                                    >
                                      <Input.TextArea
                                        // rows={}
                                        placeholder="Describe project"
                                        className="input"
                                        maxLength={200}
                                      />
                                    </Form.Item>
                                    <Button
                                      type="link"
                                      danger
                                      onClick={() => remove(name)}
                                      style={{
                                        position: "absolute",
                                        right: "0",
                                        top: "0",
                                      }}
                                      className="remove-btn"
                                    >
                                      <CloseCircleOutlined color="red" />
                                    </Button>

                                    <Button
                                      type="link"
                                      danger
                                      onClick={() => remove(name)}
                                      style={{
                                        padding: 0,
                                        display: "none",
                                        position: "absolute",
                                        right: "0",
                                        top: "0",
                                      }}
                                      className="remove-btn-mobile"
                                    >
                                      <CloseCircleOutlined color="red" />
                                    </Button>
                                  </div>
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
                <h2 className="text-xl font-bold mb-4 pl-0">
                  Skills & Activities
                </h2>
                <Form
                  form={skillsForm}
                  initialValues={initialData}
                  name="skills"
                  layout="vertical"
                  onValuesChange={(_, all) => handleValuesChange("skills", all)}
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
                            rules={[
                              {
                                required: true,
                                message: "Please input your activity!",
                              },
                            ]}
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
                          <Button
                            disabled={fields.length >= 7}
                            type="dashed"
                            onClick={() => add()}
                            block
                          >
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
              className="flex items-center py-3 px-6 rounded-lg bg-gray-100 text-gray-700 transition-colors"
              style={{ marginRight: 1 }}
            >
              <ArrowLeftOutlined className="mr-2" /> Back
            </Button>
          )}
          {stepNo >= 0 && stepNo < 4 && (
            <Button
              onClick={next}
              type="primary"
              className="py-3  px-8 rounded-lg text-white font-medium shadow-md  transition-all mx-1.5 absolute right-0  bottom-1"
            >
              Next <ArrowRightOutlined />
            </Button>
          )}
          {stepNo === 4 && (
            <Button
              onClick={next}
              type="primary"
              className="py-3 px-8 rounded-lg text-white font-medium shadow-md transition-all mx-1.5"
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
