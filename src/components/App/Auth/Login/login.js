import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setClient } from "../../../../redux/actions";
import { auth } from "../../../../firebase";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../../UI/Input";
import ButtonForm from "../../../UI/Buttons/FormButton";
import Toast from "../../../UI/Toasts";

import "./login.scss";

const SignupShema = Yup.object().shape({
  email: Yup.string()
    .min(4, "To Short!")
    .max(30, "To Long!")
    .required("email field is required"),
  password: Yup.string()
    .min(4, "To Short!")
    .max(14, "To Long!")
    .required("password andress field is required"),
});

function Login() {
  const [toast, setToast] = useState("");
  const [toastText, setToastText] = useState("");
  const { t } = useTranslation();
  const [inputs] = useState([
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
  ]);

  const sing = (email, password) =>
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        localStorage.setItem("refreshToken", userCredential.refreshToken);
        localStorage.setItem("uid", userCredential.user.uid);
        setToast("success");
        setToastText(t("success_log_in"));
      })
      .catch((error) => {
        setToast("error");
        setToastText(t("Error_log_in"));
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
    <section className="sign-in">
      <Toast toastState={toast} toastText={toastText} />
      <h1 className="title title--uppercase">{t("sign_in")}</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(value) => {
          sing(value.email, value.password);
        }}
        validationSchema={SignupShema}
      >
        <Form className="form">
          <div className="form__info">{renderInput()}</div>
          <ButtonForm name={t("sign_in")} className={"form-button--width"} />
          <Link className="sign-in__registration-button" to="registration">
            {t("registration")}
          </Link>
        </Form>
      </Formik>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    client: state.client,
  };
}

const mapDispatchToProps = {
  setClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
