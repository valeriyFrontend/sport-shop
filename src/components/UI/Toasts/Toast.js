import {Fragment} from "react";

import './Toasts.scss';

const Toast = ({toastState, toastText}) => {
    const toast = document.querySelector('.toast');
    const successToast = () => {
        if(toastState === 'success') {
            console.log(toast);
            toast.classList.add("toast__show");
            toast.classList.add("toast__success");
            setTimeout(() => toast.className = toast.className.replace('toast__show toast__success', ''), 3000);
        } else if(toastState === 'error') {
            toast.classList.add("toast__show");
            toast.classList.add("toast__error");
            setTimeout(() => toast.className = toast.className.replace('toast__show toast__error', ''), 3000);
        }
    }

    return (
        <Fragment>
            {console.log(toast)}
            <div className="toast">{toastText}</div>
            {successToast()}
        </Fragment>
    )
}

export default Toast;