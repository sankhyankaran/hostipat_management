import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Department() {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "./departments/cardio.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <div className="container-fluid">
        <h2 className="text-center py-5 text-bold">Department</h2>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={["medium", "small"]}
          autoPlay={true}
          autoPlaySpeed={2000}
          infinite={true}>
          {departmentsArray.map((items, index) => {
            return (
              <div key={index} className="card">
                <img
                  src={items.imageUrl}
                  alt="Department"
                  className="shadow rounded"
                />
                <div>
                  <div className="carsoul-name">{items.name}</div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

export default Department;
