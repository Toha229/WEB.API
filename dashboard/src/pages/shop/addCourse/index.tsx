import React, { useEffect, useState } from "react";
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
import { AddCourseSchema } from "../../auth/validation";

const AddCourse: React.FC = () => {
  const { allCategoryes } = useTypedSelector((store) => store.CategoryReducer);
  const { message } = useTypedSelector((store) => store.CourseReducer);
  const [category, setCategory] = useState("None");
  const { IncertCourse, GetAllCategorys } = useActions();

  useEffect(() => {
    GetAllCategorys();
  }, []);

  console.log("message ", message);

  if (message === "Created.") {
    return <Navigate to="/dashboard/courses" />;
  }

  const initialValues = {
    title: "",
    description: "",
    price: "",
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let catId = 0;
    (allCategoryes as Category[]).forEach((c) => {
      if (c.name == category) {
        catId = c.id;
        return;
      }
    });

    const newCourse = {
      Title: data.get("title"),
      Description: data.get("description"),
      Price: data.get("price"),
      CategoryId: catId,
    };
    console.log(newCourse);
    IncertCourse(newCourse);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  interface Category {
    id: number;
    name: string;
    description: string;
  }

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
            validationSchema={AddCourseSchema}
          >
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
              <Box
                sx={{ my: 3 }}
                onSubmit={handleSubmit}
                component="form"
                noValidate
              >
                <Typography color="textPrimary" variant="h4">
                  Create a new course
                </Typography>
                {errors.title && touched.title ? (
                  <div style={{ color: "red" }}>{errors.title}</div>
                ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Title"
                  margin="normal"
                  name="title"
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
                {errors.price && touched.price ? (
                  <div style={{ color: "red" }}>{errors.price}</div>
                ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Price"
                  margin="normal"
                  name="price"
                  type="number"
                  variant="outlined"
                />
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    defaultValue={category}
                    label={"Category"}
                    onChange={handleChange}
                  >
                    {allCategoryes.map((category: Category) => {
                      return (
                        <MenuItem value={category.name}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <Box sx={{ py: 2 }}>
                  <Button
                    disabled={!(isValid && dirty)}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {isSubmitting ? "Loading" : "Add Course"}
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
export default AddCourse;
