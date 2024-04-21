import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Department from "../components/Department";
import MessageForm from "../components/MessageForm";

function Home() {
  return (
    <>
      <Hero
        title={"Welcome to our hospital management | You trusted "}
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <Department />
      <MessageForm />
    </>
  );
}

export default Home;
