import { useState } from "react";
import { database } from "../../../../firebase";
import { auth } from "../../../../firebase";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../../UI/Input";
import ButtonForm from "../../../UI/Buttons/FormButton";
import Toast from "../../../UI/Toasts";

import "./registration.scss";

const SignupShema = Yup.object().shape({
  firstName: Yup.string()
    .min(4, "To Short!")
    .max(30, "To Long!")
    .required("first name field is required"),
  lastName: Yup.string()
    .min(4, "To Short!")
    .max(30, "To Long!")
    .required("last name field is required"),
  email: Yup.string()
    .min(4, "To Short!")
    .max(30, "To Long!")
    .required("email field is required"),
  password: Yup.string()
    .min(4, "To Short!")
    .max(14, "To Long!")
    .required("password field is required"),
  confirmPassword: Yup.string()
    .min(4, "To Short!")
    .max(14, "To Long!")
    .required("confirm password field is required")
    .test("passwords-match", "Password must match ya fool", function (value) {
      return this.parent.password === value;
    }),
});

function Registration() {
  const [toast, setToast] = useState("");
  const [toastText, setToastText] = useState("");
  const { t } = useTranslation();
  const [inputs] = useState([
    {
      name: "firstName",
      type: "text",
      placeholder: t("name"),
    },
    {
      name: "lastName",
      type: "text",
      placeholder: t("last_name"),
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      name: "password",
      type: "password",
      placeholder: t("password"),
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: t("confirm_password"),
    },
  ]);
  const addUser = (firstName, lastName, email, password) =>
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        localStorage.setItem("refreshToken", user.refreshToken);
        localStorage.setItem("uid", user.user.uid);

        const usersRef = database.ref().child("users");
        usersRef.push({
          firstName: firstName,
          lastName: lastName,
          email: email,
          uid: user.user.uid,
          role: "user",
        });
        setToast("success");
        setToastText(t("registration_is_successful"));
      })
      .catch((error) => {
        setToast("error");
        setToastText(t("error_registration"));
        console.log(error);
      });
  const renderInput = () => {
    return inputs.map((input, index) => {
      return (
        <Input
          key={index}
          name={input.name}
          type={input.type}
          placeholder={input.placeholder}
        />
      );
    });
  };

  return (
    <section className="registration">
      <Toast toastState={toast} toastText={toastText} />
      <h1 className="title title--uppercase">{t("registration")}</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(value) => {
          addUser(value.firstName, value.lastName, value.email, value.password);
        }}
        validationSchema={SignupShema}
      >
        <Form className="form">
          <div className="form__info">{renderInput()}</div>
          <ButtonForm
            name={t("registration_account")}
            className={"form-button--width"}
          />
        </Form>
      </Formik>
    </section>
  );
}

export default Registration;
