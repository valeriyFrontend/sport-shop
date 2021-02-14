import { useEffect, useState } from 'react';
import { database } from "../../../../firebase";

import iconCross from '../icons/cross.svg';

function Categories() {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        const categoriesRef = database.ref().child('categories');
        
        categoriesRef.on('value', snap => {
            setCategories(snap.val());
        });
    }, []);

    const deleteCategory= ( id => {
        const categoriesRef = database.ref().child('categories');
        delete categories[id];
        categoriesRef.set(categories);
    })

    return (
        <section className="categories">
            <table className="table">
                <tbody>
                    <tr className="table__title">
                        <td>Name</td>
                        <td></td>
                    </tr>
                    {categories && Object.keys(categories).map(((category, key) =>
                        <tr key={key}>
                            <td>{categories[category].name}</td>
                            <td className="table__icons table__delete" onClick={() => deleteCategory(category)}><img src={iconCross} alt="icon-cross"/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default Categories;