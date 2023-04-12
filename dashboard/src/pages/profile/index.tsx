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
import { ChangePasswordSchema, ChangeProfileSchema } from "../auth/validation";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserActionType } from "../../store/reducers/userReducers/types";
import { removeTokens } from "../../services/api-user-service";

const Profile: React.FC = () => {
  const { profile } = useTypedSelector((store) => store.UserReducer);
  const { user } = useTypedSelector((store) => store.UserReducer);
  const { message } = useTypedSelector((store) => store.UserReducer);
  const { GetUserProfile } = useActions();
  const { LogOut } = useActions();
  const [changePassword, setChangePassword] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { UpdateUser, ChangeUserPassword } = useActions();
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

  const handleChangePasswordSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const newPwd = {
      Id: user.Id,
      OldPassword: data.get("oldPassword"),
      NewPassword: data.get("currentPassword"),
      ConfirmPassword: data.get("confirmPassword"),
    };

    ChangeUserPassword(newPwd);
  };

  useEffect(() => {
    GetUserProfile(user.Id);
  }, []);

  if (message === "Profile updated!" || message === "Password changed.") {
    navigate("/dashboard");
  }
  if (message === "Confirm your email!") {
    removeTokens();
    navigate("/");
  }

  const initialValues = {
    email: profile.email,
    firstName: profile.name,
    lastName: profile.surname,
    phone: profile.phoneNumber,
    password: "",
  };
  const changePasswordValues = {
    oldPassword: "",
    currentPassword: "",
    confirmPassword: "",
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth="sm">
        {profile.name ? (
          !changePassword ? (
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
          ) : (
            <Formik
              onSubmit={() => {}}
              initialValues={changePasswordValues}
              validationSchema={ChangePasswordSchema}
            >
              {({ errors, touched, isSubmitting, isValid, dirty }) => (
                <Box
                  sx={{ my: 3 }}
                  onSubmit={handleChangePasswordSubmit}
                  component="form"
                  noValidate
                >
                  <Typography color="textPrimary" variant="h4">
                    Update Password
                  </Typography>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Old password"
                    margin="normal"
                    name="oldPassword"
                    type="password"
                    variant="outlined"
                  />
                  {errors.oldPassword && touched.oldPassword ? (
                    <div style={{ color: "red" }}>{errors.oldPassword}</div>
                  ) : null}
                  <Field
                    as={TextField}
                    fullWidth
                    label="New Password"
                    margin="normal"
                    name="currentPassword"
                    type="password"
                    variant="outlined"
                  />
                  {errors.currentPassword && touched.currentPassword ? (
                    <div style={{ color: "red" }}>{errors.currentPassword}</div>
                  ) : null}
                  <Field
                    as={TextField}
                    fullWidth
                    label="Confirm New Password"
                    margin="normal"
                    name="confirmPassword"
                    type="password"
                    variant="outlined"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div style={{ color: "red" }}>{errors.confirmPassword}</div>
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
                      {isSubmitting ? "Loading" : "Submit"}
                    </Button>
                  </Box>
                </Box>
              )}
            </Formik>
          )
        ) : null}
        <Button
          style={{ width: "100%" }}
          onClick={() => {
            setChangePassword(!changePassword);
          }}
        >
          {changePassword ? "Change Profile" : "Change Password"}
        </Button>
      </Container>
    </Box>
  );
};

export default Profile;
