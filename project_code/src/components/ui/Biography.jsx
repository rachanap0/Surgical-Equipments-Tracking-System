import React from "react";

import '../sonum.css'
import Image from "next/image";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <Image src={imageUrl} alt="fazeel" />
        </div>
        <div className="banner">
          <h3>Mujaddad Fazeel</h3>
          <p>
          Meet Fazeel, a seasoned Full Stack Developer and a proud senior at the University of Texas at Arlington, 
          where he is completing his Bachelor's degree in Computer Science. 
          Mujaddad has honed his skills in both front-end and back-end development, ensuring that every aspect of the websites 
          and applications he works on is top-notch. With a keen focus on delivering successful and effective digital products, 
          he brings a meticulous and innovative approach to our team.
          </p>
          <p>
            //add what he has worked on
          </p>
          
        </div>
      </div>
    </>
  );
};

export default Biography;