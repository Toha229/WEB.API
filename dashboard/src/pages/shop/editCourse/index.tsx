import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useActions } from "../../../hooks/useActions";
import { Field, Formik } from "formik";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { AddCourseSchema, EditUserSchema } from "../../auth/validation";
import { Navigate } from "react-router-dom";
import {} from "../../../store/action-creators/userActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const EditCourse: React.FC = () => {
  const { message } = useTypedSelector((store) => store.CourseReducer);
  const { allCategoryes } = useTypedSelector((store) => store.CategoryReducer);
  const { UpdateCourse } = useActions();
  const { DeleteCourse } = useActions();
  const { GetAllCategorys } = useActions();
  const [category, setCategory] = useState("None");

  useEffect(() => {
    GetAllCategorys();
  }, []);

  if (message === "Updated." || message === "Deleted.") {
    return <Navigate to="/dashboard/courses" />;
  }

  let updateCourse = localStorage.getItem("selectedCource");
  if (updateCourse == null) {
    return <Navigate to="/dashboard/courses"></Navigate>;
  }
  const selectedCource = JSON.parse(updateCourse);
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
      Id: selectedCource.id,
      Title: data.get("title"),
      Description: data.get("description"),
      Price: data.get("price"),
      CategoryId: catId,
    };

    console.log("newCourse", newCourse);

    UpdateCourse(newCourse);
  };

  const initialValues = {
    title: selectedCource.title,
    description: selectedCource.description,
    price: selectedCource.price,
  };
  console.log("COURSE", selectedCource, initialValues);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  interface Category {
    id: number;
    name: string;
    description: string;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth="sm">
        {selectedCource.title ? (
          <Box>
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
                    Update a course
                  </Typography>
                  {/* {errors.title && touched.title ? (
                    <div style={{ color: "red" }}>{errors.title}</div>
                  ) : null} */}
                  <Field
                    as={TextField}
                    fullWidth
                    label="Title"
                    margin="normal"
                    name="title"
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
                  {/* {errors.price && touched.price ? (
                    <div style={{ color: "red" }}>{errors.price}</div>
                  ) : null} */}
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
                      value={
                        category == "None"
                          ? selectedCource.categoryName
                          : category
                      }
                      defaultValue={selectedCource.categoryName}
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
                      disabled={!(isValid && dirty) && category == "None"}
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {isSubmitting ? "Loading" : "Edit Course"}
                    </Button>
                  </Box>
                </Box>
              )}
            </Formik>

            <Button
              onClick={() => {
                DeleteCourse(selectedCource.id);
              }}
              style={{ marginTop: "10px" }}
              fullWidth
              variant="contained"
              color="error"
            >
              Delete Course
            </Button>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default EditCourse;
