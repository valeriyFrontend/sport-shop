import LinkButton from '../../UI/Buttons/LinkButton';

import './NotFound.scss';

const NotFound = () => {
    return (
        <section className="page-404">
            <div className="page-404__container">
                <div className="page-404__image">
                    <h1 className="page-404__title">404</h1>
                </div>
                <h3 className="page-404__sub-title">Look like you're lost</h3>
                <p className="page-404__descr">the page you are looking for not avaible!</p>
                <LinkButton name={'Go to Home'} path={'/'} class={'link-button__404'}/>
            </div>
        </section>
    )
}

export default NotFound;