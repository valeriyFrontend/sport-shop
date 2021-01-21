import { Component } from "react";
import { connect } from "react-redux";

class Sorting extends Component {
    render() {
        const sortProduct = (event) => {
            const value = event.target.value;
            let products = this.props.products;

            switch (value) {
                case '-price':
                    products = products.sort((a, b) => b.price - a.price);
                    break;
                case 'price':
                    products = products.sort((a, b) => a.price - b.price);
                    break;  
                case 'name':
                    products = products.sort((a, b) => {
                        if (a.name < b.name) {
                            return -1;
                        } else if (a.name > b.name) {
                            return 1;
                        }
                        return 0;
                    });   
                    break;
                default: return products
            }
           this.props.changeState(products);
        };

        return (
            <span className="products__sort-button">SORT BY 
                <select onChange={sortProduct}>
                    <option value="name">Product name</option>
                    <option value="-price">Highest price</option>
                    <option value="price">Lowest price</option>
                </select>
            </span>
        )
    }
}

function mapStateToProps(state) {
    return {
        products : state.products
    }
}
export default connect(mapStateToProps)(Sorting);