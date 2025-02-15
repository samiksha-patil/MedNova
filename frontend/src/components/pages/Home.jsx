import React from "react";
import myImage from "./logo.jpg";
export const Home = () => {
  return (
    <><div style={{ padding:"20px" }}><h1>MedNova</h1></div>
    <h2>Your AI health companion</h2>
    <div class="container">
        <div class="image">
            <img src={ myImage } alt="Descriptive Image"></img>
        </div>
        <div class="text" style={{testAlign: "justify"}}>
            <h2 style={{ padding:"20px", fontFamily: "Helvetica" }}>Your AI-Powered Health Companion</h2>
            <p style={{ padding:"20px", testAlign: "justify" }}>MedNova is a robust AI model designed to provide accurate and reliable answers to all health and medical-related questions. Whether you need guidance on symptoms, disease management, nutrition, or general wellness, MedNova leverages advanced AI and medical expertise to deliver personalized insights. With a focus on accessibility and precision, it empowers users with trustworthy health information, making healthcare knowledge more approachable and efficient.</p>        </div>
        </div>
    </>
  );
};
