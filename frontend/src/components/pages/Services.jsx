import React, { useState } from "react";

export const Services = () => {
  const [disease, setDisease] = useState("");
  const [mealPlan, setMealPlan] = useState("");

  const fetchMealPlan = async () => {
    try {
      const response = await fetch("http://localhost:8000/generate_meal_plan/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ disease }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch meal plan");
      }

      const data = await response.json();
      setMealPlan(data.meal_plan);
    } catch (error) {
      console.error("Error fetching meal plan:", error);
      setMealPlan("Error retrieving meal plan. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Get Curated Nutrition and Meal Plan Tailored for You</h1>
      <p>Please enter the diseases you have:</p>
      <input
        type="text"
        value={disease}
        onChange={(e) => setDisease(e.target.value)}
        placeholder="Enter disease"
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "300px",
        }}
      />
      <br />
      <button
        onClick={fetchMealPlan}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Get Meal Plan
      </button>

      {mealPlan && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f4f4f4",
            borderRadius: "5px",
            textAlign: "left",
            maxWidth: "500px",
            margin: "20px auto",
          }}
        >
          <h2>Meal Plan:</h2>
          <p>{mealPlan}</p>
        </div>
      )}
    </div>
  );
};
