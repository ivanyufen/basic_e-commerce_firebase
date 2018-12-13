import React from 'react';
import Fire from './Fire';
import FileUploader from 'react-firebase-file-uploader';
import { Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import AddProduct from './components/AddProduct';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>

                <Link to="/">
                    <img src="http://imagama.feb.ugm.ac.id/wp-content/uploads/2016/06/ecaca552d9f35d2765f502ad3c4a6f9d.jpg" style={{ display: "block", margin: "0px auto" }} />
                </Link>

                <div id="route">
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/AddProduct" component={AddProduct}></Route>
                    <Route path="/product/:productName" component={ProductDetail} />
                </div>

            </React.Fragment>
        )
    }
}

export default App;