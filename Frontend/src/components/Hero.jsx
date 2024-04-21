import React from "react";
import homeback from "../assets/Vector.png";

function Hero({ title, imageUrl }) {
  return (
    <>
      <div
        className="container p-5"
        style={{
          backgroundImage: `url(${homeback})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}>
        <div className="row d-flex justify-content-between">
          <div className="col-lg-6 col-sm-12">
            <h1 className="text-bold mt-5">{title}</h1>
            <p className="mt-2">
              ZeeCare Medical Institute is a state-of-the-art facility dedicated
              to providing comprehensive healthcare services with compassion and
              expertise. Our team of skilled professionals is committed to
              delivering personalized care tailored to each patient's needs. At
              ZeeCare, we prioritize your well-being, ensuring a harmonious
              journey towards optimal health and wellness.
            </p>
          </div>
          <div className="col-lg-4 col-sm-12 justify-content-center">
            <img
              src={imageUrl}
              alt="hero"
              className=" img-fluid animated-image"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
