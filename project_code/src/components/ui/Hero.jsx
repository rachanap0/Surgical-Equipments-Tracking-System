
import Image from "next/image";
import setsicon from '../../../public/setsicon.png'
import '../sonum.css'


const Hero = ({imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          
          <p>
          We are revolutionizing the 
          way hospitals and healthcare facilities manage surgical equipment. 
          Our state-of-the-art Surgical Equipment Tracking System harnesses 
          the power of RFID technology and sophisticated software integration 
          to ensure that every piece of surgical equipment is exactly where it 
          needs to be, exactly when it's needed.
          </p>
          <p>

          Our platform simplifies the complex logistics of surgical operations. 
          From the moment a surgeon or administrative staff requests equipment, 
          our system ensures a seamless, efficient, and error-free process. 
          Real-time tracking and updates mean no more delays or uncertainties—just 
          smoother surgeries and better patient outcomes.

          </p>
          <p>

          Dedicated to enhancing the operational capabilities of 
          healthcare facilities, our system not only tracks equipment 
          but also provides detailed analytics to optimize usage and maintenance 
          schedules. By reducing the administrative burden, we empower medical 
          professionals to focus more on what they do best: providing exceptional patient care. 


          </p>
        </div>
        <div className="banner">
          <Image src={imageUrl} alt="hero" className="animated-image" width="auto" />
        
        </div>
      </div>
    </>
  );
};

export default Hero;