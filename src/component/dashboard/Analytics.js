import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Analytics = ({ productsData }) => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    if (productsData.products && productsData.products.length > 0) {
      const transformedData = productsData.products.map((product) => ({
        category: product.category,
        BrandName: product.brand,
        stock: product.stock,
      }));

      setGraphData(transformedData);
    }
  }, [productsData]);

  return (
    <>
      <h1>Analytics</h1>
      <BarChart
        width={900}
        height={600}
        data={graphData}
        margin={{
          top: 15,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="BrandName" fill="#ff7f50" />
        <Bar dataKey="stock" fill="#1E90FF" />
      </BarChart>
    </>
  );
};

export default Analytics;
