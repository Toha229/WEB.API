import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useActions } from "../../../hooks/useActions";
import { Field, Formik } from "formik";
import { Button, Container, TextField, Typography } from "@mui/material";
import {
  AddCategorySchema,
  AddCourseSchema,
  EditUserSchema,
} from "../../auth/validation";
import { Navigate } from "react-router-dom";
import {} from "../../../store/action-creators/userActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const EditCategory: React.FC = () => {
  const { message } = useTypedSelector((store) => store.CategoryReducer);
  const { UpdateCategory, DeleteCategory } = useActions();
  // const { DeleteCategory } = useActions();

  if (
    message === "Updated." ||
    message === "Deleted." ||
    message === "Category deleted"
  ) {
    return <Navigate to="/dashboard/categories" />;
  }

  let updateCategory = localStorage.getItem("selectedCategory");
  if (updateCategory == null) {
    return <Navigate to="/dashboard/categories"></Navigate>;
  }
  const selectedCategory = JSON.parse(updateCategory);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const newCourse = {
      Id: selectedCategory.id,
      Name: data.get("name"),
      Description: data.get("description"),
    };

    UpdateCategory(newCourse);
  };

  const initialValues = {
    name: selectedCategory.name,
    description: selectedCategory.description,
  };
  console.log("COURSE", selectedCategory, initialValues);

  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth="sm">
        <Box>
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
                  Update a Category
                </Typography>
                {/* {errors.title && touched.title ? (
                    <div style={{ color: "red" }}>{errors.title}</div>
                  ) : null} */}
                <Field
                  as={TextField}
                  fullWidth
                  label="Name"
                  margin="normal"
                  name="name"
                  variant="outlined"
                />
                {/* {errors.description && touched.description ? (
                    <div style={{ color: "red" }}>{errors.description}</div>
                  ) : null} */}
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
                    {isSubmitting ? "Loading" : "Edit category"}
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>

          <Button
            onClick={() => {
              DeleteCategory(selectedCategory.id);
            }}
            style={{ marginTop: "10px" }}
            fullWidth
            variant="contained"
            color="error"
          >
            Delete Category
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default EditCategory;
