import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Field, Formik } from "formik";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeProfileSchema } from "../auth/validation";
import { Navigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { profile } = useTypedSelector((store) => store.UserReducer);
  const { user } = useTypedSelector((store) => store.UserReducer);
  const { message } = useTypedSelector((store) => store.UserReducer);
  const { GetUserProfile } = useActions();

  const { UpdateUser } = useActions();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const newUser = {
      Id: user.Id,
      Name: data.get("firstName"),
      Surname: data.get("lastName"),
      Email: data.get("email"),
      PhoneNumber: data.get("phone"),
      Password: data.get("password"),
    };

    UpdateUser(newUser);
  };

  useEffect(() => {
    GetUserProfile(user.Id);
  }, []);
  if (message === "Profile updated!") {
    return <Navigate to="/dashboard/" />;
  }

  const initialValues = {
    email: profile.email,
    firstName: profile.name,
    lastName: profile.surname,
    phone: profile.phoneNumber,
    password: "",
    newPassword: "",
    confirmPassword: "",
  };
  console.log(profile);

  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth="sm">
        {profile.name ? (
          <Formik
            onSubmit={() => {}}
            initialValues={initialValues}
            validationSchema={ChangeProfileSchema}
          >
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
              <Box
                sx={{ my: 3 }}
                onSubmit={handleSubmit}
                component="form"
                noValidate
              >
                <Typography color="textPrimary" variant="h4">
                  Update User
                </Typography>
                {/* {errors.firstName && touched.firstName ? (
                <div style={{ color: "red" }}>{errors.firstName}</div>
              ) : null} */}
                {errors.firstName && touched.firstName ? (
                  <div style={{ color: "red" }}>
                    {errors.firstName as string}
                  </div>
                ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="First Name"
                  margin="normal"
                  name="firstName"
                  type="firstName"
                  variant="outlined"
                />
                {errors.lastName && touched.lastName ? (
                  <div style={{ color: "red" }}>
                    {errors.lastName as string}
                  </div>
                ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  name="lastName"
                  type="lastName"
                  variant="outlined"
                />
                {errors.email && touched.email ? (
                  <div style={{ color: "red" }}>{errors.email as string}</div>
                ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  name="email"
                  type="email"
                  variant="outlined"
                />
                {errors.phone && touched.phone ? (
                  <div style={{ color: "red" }}>{errors.phone as string}</div>
                ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Phone Number"
                  margin="normal"
                  name="phone"
                  type="phone"
                  variant="outlined"
                />
                {errors.password && touched.password ? (
                  <div style={{ color: "red" }}>{errors.password}</div>
                ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  type="password"
                  variant="outlined"
                />
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    ml: -1,
                  }}
                ></Box>
                <Box sx={{ py: 2 }}>
                  <Button
                    disabled={!(isValid && dirty)}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {isSubmitting ? "Loading" : "Update"}
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        ) : null}
      </Container>
    </Box>
  );
};

export default Profile;
