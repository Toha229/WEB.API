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

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);

  const newUser = {
    Name: data.get("firstName"),
    Surname: data.get("lastName"),
    Email: data.get("email"),
    Password: data.get("password"),
    confirmPassword: data.get("confirmPassword"),
  };
};

const Profile: React.FC = () => {
  const { profile } = useTypedSelector((store) => store.UserReducer);
  const { user } = useTypedSelector((store) => store.UserReducer);
  const { GetUserProfile } = useActions();
  useEffect(() => {
    GetUserProfile(user.Id);
  }, []);

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
                <Field
                  as={TextField}
                  fullWidth
                  label="First Name"
                  margin="normal"
                  name="firstName"
                  variant="outlined"
                />
                {/* {errors.lastName && touched.lastName ? (
                <div style={{ color: "red" }}>{errors.lastName}</div>
              ) : null} */}
                <Field
                  as={TextField}
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  name="lastName"
                  variant="outlined"
                />
                {errors.email && touched.lastName ? (
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
                <Field
                  as={TextField}
                  fullWidth
                  label="Phone Number"
                  margin="normal"
                  name="phone"
                  type="phone"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  type="password"
                  variant="outlined"
                />
                {errors.password && touched.password ? (
                  <div style={{ color: "red" }}>{errors.password}</div>
                ) : null}
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
                    {isSubmitting ? "Loading" : "Sign Up Now"}
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
