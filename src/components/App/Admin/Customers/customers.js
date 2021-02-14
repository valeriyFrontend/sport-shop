import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { database } from "../../../../firebase";

import iconEdit from '../icons/edit.svg';
import iconCross from '../icons/cross.svg';

function Customers() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const usersRef = database.ref().child('users');
        
        usersRef.on('value', snap => {
            setUsers(snap.val());
        });
    }, []);

    const deleteElement = ( id => {
        const usersRef = database.ref().child('users');
        delete users[id];
        usersRef.set(users);
    })

    return (
        <section className="customers">
            <table className="table">
                <tbody>
                    <tr className="table__title">
                        <td>First name</td>
                        <td>Last name</td>
                        <td>Email</td>
                        <td>Role</td>
                        <td>UID</td>
                        <td></td>
                        <td></td>
                    </tr>
                    {users && Object.keys(users).map(((user, key) =>
                        <tr key={key}>
                            <td>{users[user].firstName}</td>
                            <td>{users[user].lastName}</td>
                            <td>{users[user].email}</td>
                            <td>{users[user].role}</td>
                            <td>{users[user].uid}</td>
                            <td className="table__edit"><Link to={`/admin/editCustomer/${user}`}><img src={iconEdit} alt="icon-edit"/></Link></td>
                            <td className="table__delete" onClick={() => deleteElement(user)}><img src={iconCross} alt="icon-cross"/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default Customers;