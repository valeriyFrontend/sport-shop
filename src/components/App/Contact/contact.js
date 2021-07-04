import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ErrorMessage, Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../UI/Input";
import FormButton from "../../UI/Buttons/FormButton";

import "./contact.scss";

const SignupShema = Yup.object().shape({
  name: Yup.string()
    .min(4, "To Short!")
    .max(14, "To Long!")
    .required("name field is required"),
  email: Yup.string()
    .max(14, "To Long!")
    .email("Invalid email")
    .required("email andress field is required"),
  message: Yup.string()
    .min(4, "To Short!")
    .max(50, "To Long!")
    .required("message field is required"),
});

function Contact() {
  const { t } = useTranslation();

  const [inputs] = useState([
    {
      name: "name",
      type: "text",
      placeholder: t("name"),
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
    },
  ]);

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
    <section className="contacts">
      <div className="contacts__form">
        <h1 className="title title--uppercase">{t("contact_us")}</h1>
        <span className="descr descr--red descr--letter-spacing">
          {t("happy_to_hear_you")}
        </span>
        <Formik
          initialValues={{ name: "", email: "", message: "" }}
          validationSchema={SignupShema}
          onSubmit={(values) => console.log(values)}
        >
          <Form className="form">
            <div className="form__info">
              {renderInput()}
              <textarea
                className="form__message"
                type="text"
                placeholder={t("message")}
                name="message"
              ></textarea>
              <ErrorMessage
                name="message"
                component="div"
                className="error-message"
              />
              <FormButton name={t("send_a_message")} />
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
}

export default Contact;
