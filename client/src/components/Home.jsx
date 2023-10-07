import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Assuming you have a CSS file for styling

function Home() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('login');
  };

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>hcoco1 Sales</h2>
          <p></p>
          <button className="cta-button" onClick={handleGetStartedClick}>Get Started</button>
        </div>
      </section>
    </div>
  );
}

export default Home;