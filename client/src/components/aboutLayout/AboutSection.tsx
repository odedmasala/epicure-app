import React from "react";
import "./aboutSection.scss";
import { aboutLogo, applePay, googlePay } from "../../assets/images";

const AboutSection: React.FC = () => {
  return (
    <>
      <section className="about-section">
        <div className="about-logo-container">
          <img src={aboutLogo} alt="aboutLogo" />
        </div>
        <div className="about-contact">
          <div className="payment-container">
            <img className="paymentLogo" src={googlePay} alt="googlePay" />
            <img className="paymentLogo" src={applePay} alt="applePay" />
          </div>
          <div className="title-container">
            <h2>about us:</h2>
          </div>
          <div className="text-container">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a
              lacus vel justo fermentum bibendum non eu ipsum. Cras porta
              malesuada eros, eget blandit turpis suscipit at. Vestibulum sed
              massa in magna sodales porta. Vivamus elit urna, dignissim a
              vestibulum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a
              lacus vel justo fermentum bibendum no eu ipsum. Cras porta
              malesuada eros.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
