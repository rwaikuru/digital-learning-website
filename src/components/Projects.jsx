import React from "react";

const Services = () => {
  return (
    <div className=" bg-black services-container">
      <h3>WHY CHOOSE US</h3>
      <h1>SERVICES</h1>
      <div className="services-grid">
        <div className="service-card">
          <div className="icon">🎧</div>
          <h2>Consultancy</h2>
          <p>
            We provide detailed and thorough analytical solutions that enhance
            the growth of your business.
          </p>
        </div>
        <div className="service-card">
          <div className="icon">📊</div>
          <h2>Research</h2>
          <p>
            We offer research services across diverse fields to provide
            insightful and actionable information geared to grow your business.
          </p>
        </div>
        <div className="service-card">
          <div className="icon">💻</div>
          <h2>Training</h2>
          <p>
            We offer high-quality training that equips our students with
            practical and cutting-edge skills relevant for the Data Science
            profession.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
