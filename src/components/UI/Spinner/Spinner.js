import { Component,  Fragment} from "react";

import './Spinner.scss';

class Spinner extends Component {
        render() {
            return (
                <Fragment>
                    {!this.props.loading ?
                        <div className="spinner-bg">
                            <div className="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                    : ''} 
                </Fragment>
            )
        }
}

export default Spinner;