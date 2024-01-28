import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => setUsers(response.data.users))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={4}
      px={2}
    >
      <Typography variant="h4" gutterBottom style={{ color: "#333333" }}>
        Users List
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {users.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
            <Card elevation={3} style={{ height: "100%" }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Avatar
                    alt={`${user.firstName} ${user.lastName}`}
                    src={user.image}
                    style={{ width: 80, height: 80 }}
                  />
                </Box>
                <Typography variant="h6" align="center" mt={2} mb={2}>
                  {`${user.firstName} ${user.lastName}`}
                </Typography>
                <Typography variant="body2" color="textPrimary" align="center">
                  Email: {user.email}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  Age: {user.age}, Gender: {user.gender}
                </Typography>
                {user.company && (
                  <>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="center"
                    >
                      Company: {user.company.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="center"
                    >
                      Department: {user.company.department}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UsersList;
