import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./header.scss";

const Header = ({ client }) => {
  return (
    <div className="header-admin">
      <div className="header-admin__info">
        <span className="header-admin__name">{client.firstName}</span>
        <div className="imageBoundary">
          <img src={client.image} alt="admin_photo" />
        </div>
        <Link to="/sport-shop/">Back </Link>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    client: state.client,
  };
}

export default connect(mapStateToProps)(Header);
