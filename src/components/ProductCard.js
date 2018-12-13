import React from 'react';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
    render() {
        return (
            <React.Fragment>

                <div className="col-lg-4 card" style={{ maxWidth: "350px", margin: "10px 1px" }}>
                    <Link to={"/" + "product" + "/" + this.props.productName}>
                        <div style={{ height: "200px" }}>
                            <img className="card-img-top mx-auto m-2" src={this.props.productImage || `https://screenshotlayer.com/images/assets/placeholder.png`} alt="Product Image" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                        </div>
                    </Link>

                    <div className="card-body m-3">
                        <h5 className="card-title">Nama: {this.props.productName}</h5>
                        <p className="card-text">Harga: {this.props.productPrice}</p>
                        <a href="#" className="btn btn-danger">Add to cart</a>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProductCard;