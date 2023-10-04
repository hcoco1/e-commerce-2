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
          <h1>Welcome to MyApp</h1>
          <p>Connect with friends and the world around you.</p>
          <button className="cta-button" onClick={handleGetStartedClick}>Get Started</button>
        </div>
      </section>
    </div>
  );
}

export default Home;