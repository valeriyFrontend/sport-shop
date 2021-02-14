import { Fragment } from "react";

import './spinner.scss';

const Spinner = (props) => {
    return (
        <Fragment>
            {!props.loading ?
                <div className="spinner-bg">
                    <div className="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            : ''} 
        </Fragment>
    )
}

export default Spinner;