import React, { useEffect, useState } from "react";
import "../style/dashboard.css";
import TotalBusiness from "./TotalBusiness";
import Analytics from "./Analytics";
import axios from "axios";

const Dashboard = () => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProductsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="grid">
          <div className="one">
            <TotalBusiness productsData={productsData} />
          </div>
          <div className="two">
            <Analytics productsData={productsData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
