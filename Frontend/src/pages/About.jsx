import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

function About() {
  return (
    <>
      <Hero
        title={"Learn More About Us | Karan Medical Institute"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
    </>
  );
}

export default About;
