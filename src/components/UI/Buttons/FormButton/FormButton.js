import './form-button.scss';

const FormButton =(props) => {
        return (
            <button className={"form-button "+ props.className}>
                {props.name}
            </button>
        )
}

export default FormButton;