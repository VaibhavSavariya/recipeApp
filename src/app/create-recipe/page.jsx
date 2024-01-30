"use client";
import React, { useRef, useState } from "react";
import Button from "../Components/btn/page";
import { GrUpload } from "react-icons/gr";
import Image from "next/image";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { IoCloseCircleOutline } from "react-icons/io5";
import "./style.css";

const CreateRecipe = () => {
  const imageRef = useRef();
  const [image, setImage] = useState("");
  /** JSON DATA **/
  const getUsers = JSON.parse(secureLocalStorage.getItem("users"));
  const getMe = JSON.parse(secureLocalStorage.getItem("Me"));
  const existingSub = getMe?.submittedRecipe;

  const handleSubmitData = (recipeForm) => {
    const id = Math.floor(Math.random() * 1000) + "UUID";
    if (getMe?.submittedRecipe?.length > 0) {
      const newRecipe = {
        id,
        ...recipeForm,
        image: image,
      };
      const newUser = getMe?.submittedRecipe.map((recipe) => {
        secureLocalStorage.setItem(
          "Me",
          JSON.stringify({
            ...getMe,
            submittedRecipe: [...existingSub, newRecipe],
          })
        );
      });
      const getNewUser = JSON.parse(secureLocalStorage.getItem("Me"));
      const updateUsers = getUsers.map((user) => {
        const updated =
          user?.email === getNewUser?.email
            ? { ...user, submittedRecipe: getNewUser?.submittedRecipe }
            : user;
        return updated;
      });
      secureLocalStorage.setItem("users", JSON.stringify(updateUsers));
    } else {
      secureLocalStorage.setItem(
        "Me",
        JSON.stringify({
          ...getMe,
          submittedRecipe: [{ id, ...recipeForm, image: image }],
        })
      );
      const getNewUser = JSON.parse(secureLocalStorage.getItem("Me"));
      const updateUsers = getUsers.map((user) => {
        const updated =
          user?.email === getNewUser?.email
            ? { ...user, submittedRecipe: getNewUser?.submittedRecipe }
            : user;
        return updated;
      });
      secureLocalStorage.setItem("users", JSON.stringify(updateUsers));
    }
    toast.success("Recipe Created Successfully!");
    setImage("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageData = reader.result;
        setImage(imageData);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="recipe-form-container">
        <h4>Create a Recipe </h4>
        <div className="form-header">
          <Formik
            initialValues={{
              title: "",
              instructions: "",
              ingredients: [],
              summary: "",
              image: "",
            }}
            validationSchema={Yup.object({
              title: Yup.string()
                .min(3, "Minimum 3 characters or more")
                .required("this field is required"),
              instructions: Yup.string()
                .max(200, "Maximum 200 characters or less")
                .required("this field is required"),
              ingredients: Yup.array().required("At least add one ingrdients"),
              summary: Yup.string()
                .max(200, "Maximum 200 characters or less")
                .required("this field is required"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                handleSubmitData(values);
                setSubmitting(false);
                resetForm();
              }, 400);
            }}
          >
            {({ values, setSubmitting }) => (
              <Form className="recipe-form">
                <div className="imgBtn">
                  <input
                    type="file"
                    ref={imageRef}
                    hidden
                    accept="images/*"
                    onChange={handleImageUpload}
                  />
                  <div
                    className="upload-icon"
                    onClick={() => imageRef.current.click()}
                  >
                    <GrUpload />
                  </div>
                  {!image && <p>Choose file to upload</p>}
                  {image && (
                    <Image
                      blurDataURL={image}
                      placeholder="blur"
                      src={image}
                      alt="recipe-image"
                      width={100}
                      height={80}
                      style={{
                        borderRadius: "10px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <label htmlFor="title">Title</label>
                <Field name="title" type="text" />
                <ErrorMessage
                  name="title"
                  render={(msg) => (
                    <p
                      style={{
                        color: "red",
                        fontStyle: "italic",
                      }}
                    >
                      {msg}
                    </p>
                  )}
                />
                <label htmlFor="instructions">Instructions</label>
                <Field
                  name="instructions"
                  as="textarea"
                  rows="4"
                  cols="50"
                  style={{
                    border: "1px solid #f3f3f3",
                    borderRadius: "10px",
                    padding: "5px",
                  }}
                />
                <ErrorMessage
                  name="instructions"
                  render={(msg) => (
                    <p
                      style={{
                        color: "red",
                        fontStyle: "italic",
                      }}
                    >
                      {msg}
                    </p>
                  )}
                />
                <FieldArray name="ingredients">
                  {({ insert, remove, push }) => (
                    <>
                      {values?.ingredients.map((ingredient, index) => (
                        <>
                          <div className="fieldArray">
                            <Field
                              key={index}
                              name={`ingredients.${index}.ingredient`}
                              placeholder="Add Ingredient"
                            />
                            <IoCloseCircleOutline
                              onClick={() => remove(index)}
                              size={26}
                              className="deleteBtn"
                            />
                          </div>
                        </>
                      ))}
                      <Button type="button" onClick={() => push("")}>
                        Add Ingredients
                      </Button>
                    </>
                  )}
                </FieldArray>
                <label htmlFor="summary">Summary</label>
                <Field
                  name="summary"
                  as="textarea"
                  rows="4"
                  cols="50"
                  style={{
                    border: "1px solid #f3f3f3",
                    borderRadius: "10px",
                    padding: "5px",
                  }}
                />
                <ErrorMessage
                  name="summary"
                  render={(msg) => (
                    <p
                      style={{
                        color: "red",
                        fontStyle: "italic",
                      }}
                    >
                      {msg}
                    </p>
                  )}
                />
                <Button
                  style={{
                    width: "200px",
                  }}
                  type="submit"
                  disabled={!setSubmitting}
                >
                  Submit Recipe
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CreateRecipe;
