import React from 'react';
import { Link } from 'react-router-dom';
import Fire from './../Fire';
import ProductCard from './ProductCard';
import Loader from './Loader';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            allData: [],
            isLoading: true
        }
    }

    // Ambil semua data di database 
    componentDidMount() {
        const db = Fire.firestore();
        db.settings({
            timestampsInSnapshots: true
        })
        var allDataTemp = [];
        db.collection("products")
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

    displayData() {
        // Kalau ada data, tampilin, kalau gaada, tampilin no data
        if (this.state.allData) {
            return this.state.allData.map((val) => {
                // lempar props nama, harga, dan foto produk ke component product card
                return <ProductCard productName={val.productName} productPrice={val.productPrice} productImage={val.productImage} />
            })
        }
        else {
            return (
                <h2>No data. Try to add some, maybe?</h2>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container text-center">
                    <h3>Showing you a list of products:</h3>

                    {/* Kalau log in, baru bisa add product */}
                    {this.props.isLoggedIn &&
                        <Link to="/AddProduct">Click here to add product!</Link>
                    }

                    <div className="row">
                        {this.state.isLoading && <Loader text="Loading products.." />}
                        {this.displayData()}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Home;