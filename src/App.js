import React from 'react';
import Fire, { auth, proGoogle } from './Fire';
import FileUploader from 'react-firebase-file-uploader';
import { Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import AddProduct from './components/AddProduct';

class App extends React.Component {

    state = { user: "", isLoggedIn: false }

    login = async () => {
        let result = await auth().signInWithPopup(proGoogle);
        this.setState({
            user: result.user,
            isLoggedIn: true
        })
    }

    logout = async () => {
        await auth().signOut()
        setTimeout(() => {
            this.setState({ user: null, isLoggedIn: false })
        }, 500);
    }

    render() {
        return (
            <React.Fragment>

                <Link to="/">
                    <img src="http://imagama.feb.ugm.ac.id/wp-content/uploads/2016/06/ecaca552d9f35d2765f502ad3c4a6f9d.jpg" style={{ display: "block", margin: "0px auto" }} />
                </Link>
                {/* Kalau udh login, button berubah jadi nama dan profpict, kalau belum jadi login */}
                <button onClick={this.login} className="btn btn-primary d-block mx-auto m-2">{this.state.user ?
                    (<div>
                        <img src={this.state.user.photoURL} className="rounded-circle" style={{ width: "20px", height: "20px" }} />
                        {this.state.user.displayName.split(" ")[0]}
                    </div>)
                    :
                    "Log in to add product or view cart!"}
                </button>

                {/* Setelah login baru ada button log out */}
                {this.state.isLoggedIn && <button type="button" className="btn btn-danger d-block mx-auto m-1" onClick={this.logout}>Log Out</button>}

                {/* Kalau logged in, bisa liat cart */}
                {this.state.isLoggedIn &&
                    <Link to="/cart">
                        <button className="btn btn-warning d-block mx-auto m-3">My cart</button>
                    </Link>
                }


                <div id="route">
                    <Route
                        exact path='/'
                        render={(props) => <Home {...props} isLoggedIn={this.state.isLoggedIn} />}
                    />
                    {/* <Route exact path="/" component={Home}></Route> */}
                    <Route path="/AddProduct" component={AddProduct}></Route>
                    <Route path="/product/:productName" component={ProductDetail}></Route>
                    <Route path="/cart" component={Cart}></Route>
                </div>

            </React.Fragment>
        )
    }
}

export default App;