import React from 'react';
import Fire from './../Fire';
import { Link } from 'react-router-dom';

class ProductDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            productName: "",
            productPrice: "",
            productImage: "",
            allData: []
        }
    }

    componentDidMount = () => {
        const db = Fire.firestore();
        db.settings({
            timestampsInSnapshots: true
        })
        var allDataTemp = []
        db.collection("products")
            .where("productName", "==", this.props.match.params.productName)
            .get().then(
                (x) => {
                    x.forEach((data) => {
                        allDataTemp.push(data.data())
                        console.log(data)
                    })
                    this.setState({ allData: allDataTemp })
                })
            .catch((err) => {
                console.log(err)
            })
    }

    displayRetrievedData() {
        return this.state.allData.map(
            (val) => {
                return (<div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            Gambar Produk <img className="d-block" src={val.productImage} style={{ maxWidth: "500px", maxHeight: "700px" }} />
                        </div>
                        <div className="col-lg-6">
                            <h2>Nama Produk: {val.productName}</h2>
                            <h2>Harga: {val.productPrice}</h2>
                            <button type="button" className="btn btn-danger">Add to cart!</button>
                        </div>
                    </div>
                </div>
                )
            }
        )
    }


    render() {
        // console.log(this.state.allData[0])
        return (
            <React.Fragment>
                <h1 className="text-center m-5">Product Detail</h1>
                <Link to="/" className="text-center d-block my-3">Back to product list</Link>

                {this.displayRetrievedData()}


            </React.Fragment>
        )
    }
}

export default ProductDetail;