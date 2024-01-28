import React from "react";
import "../style/TotalBusiness.css";
import { BsCurrencyDollar, BsPeople } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiRadioButtonLine } from "react-icons/ri";
const TotalBusiness = ({ productsData }) => {
  if (productsData.length === 0) {
    return <div>Loading...</div>; // You can replace this with your loading indicator
  }

  const { products } = productsData;

  const totalSales = products.reduce(
    (total, product) => total + product.price,
    0
  );
  const totalOrders = products.length;
  const totalCustomers = products.reduce(
    (total, product) => total + product.id,
    0
  );
  const totalRatings = products.reduce(
    (total, product) => Math.floor(total + (product.rating || 0)),
    0
  );

  const total = [
    {
      number: `$${totalSales.toFixed(2)}`,
      title1: "Total Sales",
      icon: BsCurrencyDollar,
    },
    {
      number: totalOrders.toString(),
      title1: "Total Orders",
      icon: AiOutlineShoppingCart,
    },
    {
      number: totalCustomers.toString(),
      title1: "Total Customers",
      icon: BsPeople,
    },
    {
      number: totalRatings.toString(),
      title1: "People Online",
      icon: RiRadioButtonLine,
    },
  ];
  return (
    <>
      <div className="row_boxes">
        {total.map((totalitems, index) => {
          return (
            <div className="row_boxes_inner" key={index}>
              <div className="first">
                <p className="number">{totalitems.number}</p>
                <p className="title">{totalitems.title1}</p>
              </div>
              <div className="second">
                <totalitems.icon />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default TotalBusiness;
