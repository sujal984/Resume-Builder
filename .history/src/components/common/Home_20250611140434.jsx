import React from "react";
import { Card, Layout, Row, Col, Image, Carousel, Button } from "antd";
import { Content, Header, Footer } from "antd/es/layout/layout";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DownloadOutlined,
} from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import Meta from "antd/es/card/Meta";
import { Template } from "../../constant/Template";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <Header style={{ color: "white" }}>Choose Your own Template</Header>
        <div className="content-container">
          <Content>
            <div className="carousel-container">
              <Carousel autoplay arrows effect="fade" infinite={false}>
                <div className="carousel-slide" id="slide1">
                  <h2 className="carousel-heading">
                    Choose a design that speaks for you — sleek, modern, and
                    professional templates ready to go!
                  </h2>
                </div>
                <div className="carousel-slide" id="slide2">
                  <h2 className="carousel-heading">
                    Stand out from the crowd with stunning resume layouts
                    tailored for impact.
                  </h2>
                </div>
                <div className="carousel-slide" id="slide3">
                  <h2 className="carousel-heading">
                    Your dream job starts with the perfect resume — pick your
                    winning template now!
                  </h2>
                </div>
                <div className="carousel-slide" id="slide4">
                  <h2 className="carousel-heading">
                    Craft a resume that gets noticed — stylish, clean, and
                    recruiter-approved formats.
                  </h2>
                </div>
              </Carousel>
            </div>
            <div>
              <Row
                gutter={{ xs: 0, sm: 16, md: 0, lg: 0 }}
                className="card-container "
              >
                {Object.values(Template).map((template) => (
                  <Col
                    xs={24}
                    sm={24}
                    md={10}
                    lg={5}
                    className="card-col"
                    key={template.title}
                  >
                    <Card
                      actions={[
                        <>
                          <Button
                            type="primary"
                            size="large"
                            onClick={() => navigate(template.path)}
                          >
                            Select
                          </Button>
                        </>,
                      ]}
                      cover={
                        <div className="card-template ">
                          <Image
                            style={{
                              width: "100%",
                              height: "100%",
                              maxHeight: "200",
                              maxWidth: "200",
                            }}
                            preview={true}
                            width={200}
                            height={200}
                            src={template.src}
                            alt={template.alt}
                          />
                        </div>
                      }
                      hoverable
                      key={template.title}
                    >
                      <Meta
                        title={template.title}
                        description={template.description}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Content>
        </div>
        {/* <Footer
          className="footer"
          style={
            stepNo === 5
              ? { position: "absolute", bottom: 0, width: "100%" }
              : { position: "static" }
          }
        >
          {stepNo > 0 && stepNo < 5 && (
            <Button
              onClick={prev}
              className="flex items-center py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              style={{ marginRight: 1 }}
            >
              <ArrowLeftOutlined className="mr-2" /> Back
            </Button>
          )}

          {stepNo === 4 ? (
            <Button
              onClick={next}
              type="primary"
              className="py-3 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all mx-1.5"
            >
              Submit & Review
            </Button>
          ) : stepNo === 5 ? (
            <>
              <Button
                onClick={reset}
                className="py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-colors mx-1.5"
              >
                Reset Form
              </Button>
              <Button
                type="primary"
                className="py-3 px-8 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-md hover:shadow-lg transition-all mx-1.5"
              >
                <DownloadOutlined className="mr-2" /> Download Resume
              </Button>
            </>
          ) : (
            <Button
              onClick={next}
              type="primary"
              className="py-3  mx-1.5  px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
            >
              Continue <ArrowRightOutlined className="ml-2 " />
            </Button>
          )}
        </Footer> */}
      </Layout>
    </>
  );
}

export default Home;
