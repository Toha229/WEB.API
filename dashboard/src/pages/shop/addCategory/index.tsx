import React, { useState } from "react";
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Navigate } from "react-router-dom";
import { AddCategorySchema } from "../../auth/validation";

const AddCategory: React.FC = () => {
  const { message } = useTypedSelector((store) => store.CategoryReducer);
  const { IncertCategory } = useActions();

  console.log("message ", message);

  if (message === "Created.") {
    return <Navigate to="/dashboard/categories" />;
  }

  const initialValues = {
    name: "",
    description: "",
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const newCategory = {
      Name: data.get("name"),
      Description: data.get("description"),
    };
    console.log(newCategory);
    IncertCategory(newCategory);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <Formik
            onSubmit={() => {}}
            initialValues={initialValues}
            validationSchema={AddCategorySchema}
          >
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
              <Box
                sx={{ my: 3 }}
                onSubmit={handleSubmit}
                component="form"
                noValidate
              >
                <Typography color="textPrimary" variant="h4">
                  Create a new category
                </Typography>
                {errors.name && touched.name ? (
                  <div style={{ color: "red" }}>{errors.name}</div>
                ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Name"
                  margin="normal"
                  name="name"
                  variant="outlined"
                />
                {errors.description && touched.description ? (
                  <div style={{ color: "red" }}>{errors.description}</div>
                ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Description"
                  margin="normal"
                  name="description"
                  variant="outlined"
                />
                {/* <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={role}
                    defaultValue={role}
                    label={role}
                    onChange={handleChange}
                  >
                    <MenuItem value={"Users"}>Users</MenuItem>
                    <MenuItem value={"Administrators"}>Administrators</MenuItem>
                  </Select>
                </FormControl> */}

                <Box sx={{ py: 2 }}>
                  <Button
                    disabled={!(isValid && dirty)}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {isSubmitting ? "Loading" : "Add Category"}
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};
export default AddCategory;
