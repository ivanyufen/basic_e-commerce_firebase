import React from 'react';
import { Link } from 'react-router-dom';
import Fire from './../Fire'

class ProductCard extends React.Component {

    addToCart = () => {
        const db = Fire.firestore();
        db.settings({
            timestampsInSnapshots: true
        })
        db.collection("cart").add({
            productName: this.props.productName,
            productPrice: this.props.productPrice,
            timeAdded: new Date(),
            productImage: this.props.productImage
        });
        setTimeout(() => {
            alert("Successfully added to cart!")
            // this.setState({
            //     productName: "",
            //     productPrice: "",
            //     fileURL: "",
            //     isUpload: false,
            //     fileName: "",
            //     uploadProgress: 0,
            //     isAdded: true
            // })
        }, 1000);
    }

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
                        <a href="#" className="btn btn-danger" onClick={this.addToCart}>Add to cart</a>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProductCard;