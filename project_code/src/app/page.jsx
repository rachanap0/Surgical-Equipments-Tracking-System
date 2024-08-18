"use client";
 
import Image from "next/image";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Grid, Card, Text } from '@nextui-org/react';
import img from '../../public/sficon.png'
import img2 from '../../public/fazeelpic.jpeg'
import img3 from '../../public/sonumpic.jpeg'
import img4 from '../../public/rachpic.jpeg'
import img5 from '../../public/ammar.jpeg'
import img6 from '../../public/ujwal.jpeg'
import img7 from '../../public/wasif.jpeg'
import Hero from "../components/ui/Hero";

 
const Home = () => {
 
  return (
    <div className="flex flex-col">
 
 <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      About Us
      </header>

      <h1 style={{
        fontSize: '24px',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        paddingTop: '30px',
        paddingBottom: '20px' // You can adjust the value to your preference
      }}>
          Surgical Equipment Tracking System
      </h1>

      <h1 style={{
        fontSize: '24px',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        //paddingTop: '20px',
        //paddingBottom: '20px' // You can adjust the value to your preference
      }}>
          Welcome to the Future of Surgical Equipment Management
      </h1>

        
      <Hero
        imageUrl={img}
      />


      <h1 style={{
        fontSize: '24px',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        paddingTop: '50px',
        paddingBottom: '50px' // You can adjust the value to your preference
      }}>
          Meet Team TheatreOps
      </h1>


      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ width: '30%', textAlign: 'center', margin: '0 1%' }}>
    <Image src= {img2} alt="Fazeel" style={{ width: '300px', height: '400px', objectFit: 'cover' }} />
    <h3 style={{
        fontSize: '18px',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        paddingTop: '20px',
        fontWeight: 500 // You can adjust the value to your preference
      }}>
          Mujaddad Fazeel
      </h3>
      <h6 style={{
        fontSize: '16px',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        paddingBottom: '20px',
        fontWeight: 400 // You can adjust the value to your preference
      }}>
          Full-Stack Developer
      </h6>
    <p style={{ textAlign: 'justify', paddingBottom: '20px'  }} > Meet Fazeel, a seasoned Full Stack Developer and a proud senior at the University of 
      Texas at Arlington, where he is completing his Bachelor's degree in Computer Science. 
      Mujaddad has honed his skills in both front-end and back-end development, 
      ensuring that every aspect of the websites and applications he works on is top-notch. 
      With a keen focus on delivering successful and effective digital products, 
      he brings a meticulous and innovative approach to our team.</p>
  </div>
  <div style={{ width: '30%', textAlign: 'center', margin: '0 1%' }}>

    <Image src={img3} alt="Sonum" style={{ width: '300px', height: '400px', objectFit: 'cover',  }} />
    <h3 style={{
        fontSize: '18px',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        paddingTop: '20px',
        fontWeight: 500 // You can adjust the value to your preference
      }}>
          Sonum
      </h3>
      <h6 style={{
        fontSize: '16px',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        paddingBottom: '20px',
        fontWeight: 400 // You can adjust the value to your preference
      }}>
          Database Engineer
      </h6>
    <p style={{ textAlign: 'justify', paddingBottom: '20px'  }}>Meet Sonum, a senior at The University of Texas at Arlington, pursuing a bachelor's degree in Computer Science. 
          With a strong focus on Analytics, Data Science, and Data Visualization, Sonum holds certifications in SQL, 
          White Belt in Lean Six Sigma, and career readiness, showcasing her dedication to professional development 
          and mastery in her field. Sonum loves working on visualizing datasets and extract meaningful insights.
          Sonum worked on the database management for this project.</p>
  </div>
  <div style={{ width: '30%', textAlign: 'center', margin: '0 1%' }}>
    <Image src={img7} alt="Wasif" style={{ width: '300px', height: '400px', objectFit: 'cover' }} />
    <h3 style={{
        fontSize: '18px',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        paddingTop: '20px',
        fontWeight: 500 // You can adjust the value to your preference
      }}>
          Wasif Swapnil
      </h3>
      <h6 style={{
        fontSize: '16px',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        paddingBottom: '20px',
        fontWeight: 400 // You can adjust the value to your preference
      }}>
          Backend Developer
      </h6>
    <p style={{ textAlign: 'justify', paddingBottom: '20px'  }}>
    Meet Wasif, a dedicated senior at the university majoring in 
    Software Engineering with a focus on front-end development. 
    Passionate about creating simple yet impactful user experiences,
    Wasif has been involved in crafting functional and accessible interfaces. 
    While he is still on his journey of learning, his contributions to front-end
    projects reflect a thoughtful approach to design and a commitment to usability.
    As he prepares to step into the professional world, Wasif continues to seek out
    new challenges that sharpen his skills and deepen his understanding of the 
    technologies that shape our digital interactions.
      </p>
  </div>
  <div style={{ width: '30%', textAlign: 'center', margin: '0 1%' }}>
    <Image src={img6} alt="Ujwal" style={{ width: '300px', height: '400px', objectFit: 'cover', paddingTop:20 }} />
    <h3 style={{
        fontSize: '18px',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        paddingTop: '20px',
        fontWeight: 500 // You can adjust the value to your preference
      }}>
          Hanumath Ponnaluri
      </h3>
      <h6 style={{
        fontSize: '16px',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        paddingBottom: '20px',
        fontWeight: 400 // You can adjust the value to your preference
      }}>
          Frontend Developer
      </h6>
    <p style={{ textAlign: 'justify', paddingBottom: '40px'  }}>
    Say Hello to Hanumath! As a senior software engineering student 
    at the University of Texas at Arlington, Hanumath has a deep 
    passion for front-end development and brings a wealth of experience in 
    designing user interfaces and prototypes. He contributed to 
    integrating RFID systems within the project. Hanumath 
    firmly believes that the principles of computer science can be universally applied, 
    and that user-friendly design is as crucial in medical applications as in any other 
    software context.
      </p>
  </div>

  <div style={{ width: '30%', textAlign: 'center', margin: '0 1%' }}>
    <Image src={img4} alt="Rachana" style={{ width: '300px', height: '400px', objectFit: 'cover', paddingTop:20 }} />
    <h3 style={{
        fontSize: '18px',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        paddingTop: '20px',
        fontWeight: 500 // You can adjust the value to your preference
      }}>
          Rachana Pandey
      </h3>

      <h6 style={{
        fontSize: '16px',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        paddingBottom: '20px',
        fontWeight: 400 // You can adjust the value to your preference
      }}>
          Technical Project Manager
      </h6>
    <p style={{ textAlign: 'justify', paddingBottom: '40px'  }}>Rachana Pandey, a rising senior at T
    he University of Texas at Arlington majoring in Computer Science and minoring in Business Administration, 
          excels in both technical expertise and leadership. She leverages her comprehensive 
          skills from the honors college to drive successful outcomes in diverse technical platforms. Her leadership 
          is further exemplified by her roles as Vice-President of the Engineering Student Council and former President 
          of the National Society of Leadership and Success at UTA, where she has effectively guided team projects and 
          initiatives, demonstrating a keen ability to lead, mentor, and innovate within the tech community.
</p>
  </div>

  <div style={{ width: '30%', textAlign: 'center', margin: '0 1%' }}>
    <Image src={img5} alt="Wasif" style={{ width: '300px', height: '400px', objectFit: 'cover' , paddingTop:20}} />
    <h3 style={{
        fontSize: '18px',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        paddingTop: '20px',
        fontWeight: 500 // You can adjust the value to your preference
      }}>
          Ammar Baig
      </h3>
      <h6 style={{
        fontSize: '16px',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        paddingBottom: '20px',
        fontWeight: 400 // You can adjust the value to your preference
      }}>
          Hardware Engineer
      </h6>
    <p style={{ textAlign: 'justify', paddingBottom: '40px'  }}>
      Ammar is on his journey through the realms of machine learning and AI as 
      a senior majoring in Computer Science at UTA. 
      His dedication is evident in projects like 
      Neuro-Learner, a Machine Learning platform tailoring education to 
      student performance. Ammar's practical skills shine in 
      his contribution to development of an 
      RFID tag reader script for efficient inventory management. His 
      contributions reflect a commitment to learning, innovation, 
      and the intelligent application of technology.</p>
  </div>
</div>
 
    </div>
 
 
  
  );
}
 
export default Home;