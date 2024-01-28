import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./component/dashboard/Sidebar";
import Dashboard from "./component/dashboard/Dashboard";
import Login from "./component/login/login";
import ProductList from "./component/products/ProductList";
import UsersList from "./component/users/User";
import PrivateRoute from "./component/routes/PrivateRoute";
import NotFound from "./component/users/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Sidebar />
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <UsersList />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute>
              <NotFound />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
