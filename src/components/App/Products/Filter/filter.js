import { Component } from "react";
import { connect } from "react-redux";

class Filter extends Component {
    render() {
        let products = this.props.products;
        const filterProductsByType = (event) => {
            if (event.target.value === 'all') {
                 this.props.changeState(products);
                 return;
            }
            products = this.props.products.filter(item => item.category === event.target.value);
            this.props.changeState(products);
        }

        return (
            <span className="products__sort-button">SHOW ME 
                <select onChange={filterProductsByType}>
                    <option value="all">All products</option>
                    <option value="tennis">Tennis</option>
                    <option value="running">Running</option>
                    <option value="training">Training & Gym</option>
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
export default connect(mapStateToProps)(Filter);