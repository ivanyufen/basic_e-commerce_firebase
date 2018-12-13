import React from 'react';
import Fire from './../Fire';

class Cart extends React.Component {

    constructor() {
        super();
        this.state = {
            allData: ""
        }
    }
    componentDidMount() {
        const db = Fire.firestore();
        db.settings({
            timestampsInSnapshots: true
        })
        var allDataTemp = [];
        db.collection("cart")
            .get().then(
                (x) => {
                    x.forEach((data) => {
                        allDataTemp.push(data.data())
                    })
                    this.setState({ allData: allDataTemp, isLoading: false })
                })
            .catch((err) => {
                console.log(err)
            })
    }

    displayCart() {
        return this.state.allData.map((val) => {
            return (
                <div className="col-lg-12 m-2 p-2 rounded bg-dark text-white">
                    <div className="row">
                        <div className="col-lg-6">
                            <p>Nama: {val.productName}</p>
                            <p>Harga: {val.productPrice}</p>
                            <img src={val.productImage || `https://screenshotlayer.com/images/assets/placeholder.png`} style={{ width: "100px", height: "100px" }} />
                        </div>
                        <div className="col-lg-6">
                            <button className="btn btn-warning">Pay now!</button>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container text-center">
                    <h1>Your cart:</h1>
                    <div className="row">

                        {this.state.allData ? this.displayCart() : <h2>Empty cart</h2>}

                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default Cart;