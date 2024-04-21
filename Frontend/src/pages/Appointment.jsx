import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

function Appointment() {
  return (
    <>
      <Hero
        title={"Learn More About Us | Karan Medical Institute"}
        imageUrl={"/signin.png"}
      />
      <AppointmentForm />
    </>
  );
}

export default Appointment;
