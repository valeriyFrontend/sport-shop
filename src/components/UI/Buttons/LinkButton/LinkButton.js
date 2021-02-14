import { Link } from 'react-router-dom';

import './link-button.scss';

const LinkButton =(props) => {
        return (
            <Link className={"link-button " + props.class} to={props.path}>{props.name}</Link>
        )
}

export default LinkButton;