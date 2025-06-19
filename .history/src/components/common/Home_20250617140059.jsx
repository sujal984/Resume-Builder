import React from "react";
import { Card, Layout, Row, Col, Image, Carousel, Button } from "antd";
import { Content, Header, Footer } from "antd/es/layout/layout";

import Meta from "antd/es/card/Meta";
import { Template } from "../../constant/Template";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <Header
          style={{
            color: "white",

            display: "flex",
            margin: "0px",
            padding: "0px ",
          }}
        >
          <h1 className="text-2xl p-2">Choose Your own Template</h1>
        </Header>
        <div className="content-container">
          <Content>
            <div className="carousel-container">
              <Carousel arrows effect="fade" infinite={false}>
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
                            style={{ alignSelf: "center" }}
                            disabled={template.path === "#"}
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
      </Layout>
    </>
  );
}

export default Home;
