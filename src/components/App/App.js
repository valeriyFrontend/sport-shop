import { connect } from "react-redux";
import { setClient } from "../../redux/actions";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./Main/main";
import Admin from "./Admin/Admin";

import "flag-icon-css/css/flag-icon.min.css";
import "./App.scss";
import "./descr.scss";
import "./title.scss";
import "./form.scss";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "ru"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
    react: { useSuspense: false },
  });

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Main} />
        <Route path="/admin" component={Admin} />
      </Router>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    client: state.client,
  };
}
const mapDispatchToProps = {
  setClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
