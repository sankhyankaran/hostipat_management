import React from "react";

function Biography({ imageUrl }) {
  return (
    <>
      <div className="container-fluid p-5 ">
        <div className="row d-flex justify-content-between ">
          <div className="col-lg-6 col-sm-12 pt-5">
            <img src={imageUrl} className="img-fluid" />
          </div>
          <div className="col-lg-6 col-sm-12">
            <h2 className="text-bold pt-5">Biography</h2>
            <h5>Who we Are</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              blanditiis sequi aperiam. Debitis fugiat harum ex maxime illo
              consequatur mollitia voluptatem omnis nihil nesciunt beatae esse
              ipsam, sapiente totam aspernatur porro ducimus aperiam nisi. Ex
              magnam voluptatum consectetur reprehenderit fugiat recusandae aut
              similique illum natus velit, praesentium nostrum nesciunt.
              Deleniti, nesciunt laboriosam totam iusto!
            </p>
            <p>We are all in 2024!</p>
            <p>We are working on a MERN STACK PROJECT.</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              assumenda exercitationem accusamus sit repellendus quo optio
              dolorum corporis corrupti. Quas similique vel minima veniam
              tenetur obcaecati atque magni suscipit laboriosam! Veniam vitae
              minus nihil cupiditate natus provident. Ex illum quasi pariatur
              odit nisi voluptas illo qui ipsum mollitia. Libero, assumenda?
            </p>
            <p>Lorem ipsum dolor sit amet!</p>
            <p>Coding is fun!</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Biography;
