import { Component } from "react";
import { connect } from "react-redux";

class Setting extends Component {
    state = {
        products: [],
        currentActiveSortName: null,
        currentActiveFilterName: null,
        sortingsOps: {
            price: [{name: 'High', key: 'highPrice'}, {name: 'low', key: 'lowPrice'}],
            amount: [{name: 'high', key: 'highAmount'}, {name: 'low', key: 'lowAmount'}]
        },
        filtersOps: {
            category: [{name: 'training', key: 'training'}, {name: 'running', key: 'running'}, {name: 'tennis', key: 'tennis'}]
        }
    }
    sortProducts = (e) => {
        let products = this.props.products;
        let elementAttribute = e.target.getAttribute('data-value');

        switch (elementAttribute) {
            case 'highPrice':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'lowPrice':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'highAmount':
                products.sort((a, b) => b.amount - a.amount);
                break;
            case 'lowAmount':
                products.sort((a, b) => a.amount - b.amount);
                break;
            default:
                break;
        }

        this.setState({currentActiveSortName: elementAttribute})
        this.props.setProducts(products);
    }

    searchProduct(e) {
        let products = this.props.products.filter(product => {
            return product.name.toLowerCase().includes(e.target.value);
        })

        this.props.setProducts(products);
    }
    filterProducts = (e) => {
        let products = this.props.products;
        let elementAttribute = e.target.getAttribute('data-value');

        products = products.filter(product => product.category === elementAttribute);
        this.setState({currentActiveFilterName: elementAttribute})
        this.props.setProducts(products);
    }

    render() {
        return (
            <div className="admin-catalog__setting">
                <div className="admin-catalog__setting-sales">
                    <input className="admin-catalog__setting-search" onChange={this.searchProduct.bind(this)} placeholder='Search'></input>
                    {Object.keys(this.state.sortingsOps).map((keyName, i) => (
                        <div className="admin-catalog__setting-list" key={i}>
                            <h2 className="admin-catalog__setting-title">{keyName}</h2>
                            <ul>
                                {this.state.sortingsOps[keyName].map((element, key) => 
                                    <li key={key} data-value={element.key}
                                        className={this.state.currentActiveSortName === element.key ? 'active' : null} 
                                        onClick={this.sortProducts}>{element.name}</li>
                                )}
                            </ul>
                        </div>
                    ))}
                    {Object.keys(this.state.filtersOps).map((keyName, i) => (
                        <div className="admin-catalog__setting-list" key={i}>
                            <h2 className="admin-catalog__setting-title">{keyName}</h2>
                            <ul>
                                {this.state.filtersOps[keyName].map((element, key) => 
                                    <li key={key} data-value={element.key}
                                        className={this.state.currentActiveFilterName === element.key ? 'active' : null} 
                                        onClick={this.filterProducts}>{element.name}</li>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Setting);