import './contacts.scss';

function contacts() {
    return (
        <section className="contacts">
            <h1 className="title title--uppercase">Contact Us</h1>
            <span className="descr descr--red descr--letter-spacing">We are happy to hear from you.</span>
            <form action="">
                <div className="contacts__info">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Emali" />
                </div>
                <textarea className="contacts__message" type="text" placeholder="Message"></textarea>
                <input type="submit" value="Send a message" />
            </form>
    </section>
    )
}

export default contacts;