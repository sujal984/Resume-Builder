export const Tab1 = () => {
  return (
    <section className="sm:container mt-24   text-center justify-self-center">
      <p className="section-subtitle flex-center  gap-2 mb-6 bg-[#f4f9fd]">
        <CheckCircleFilled className="text-green-600" />
        Our resume examples helped people land jobs at Microsoft, Google, and
        other top companies.
      </p>

      <Row gutter={[24, 24]} justify="center">
        {Resumetype.map((item, index) => (
          <Col
            key={index}
            md={{ span: 8 }}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            lg={{ span: 6 }}
            // className="xs:flex xs:justify-center md:flex-cente"
          >
            <div className=" py-1 hover:shadow-md">
              <div className=" resume-card border  p-6 w-full  xs:w-[250px] flex-center flex-col    ">
                <img
                  src={item.img}
                  alt={item.title}
                  className="mb-4 w-20 h-40 "
                />
                <Button
                  className="resume-btn  content-btn mb-3 opacity-0"
                  type="primary"
                >
                  {item.btntext}
                </Button>
              </div>
              <p className="text-center text-[16px] font-[400] py-2">
                {item.title}
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};
