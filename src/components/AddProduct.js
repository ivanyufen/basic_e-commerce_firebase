import React from 'react';
import FileUploader from 'react-firebase-file-uploader';
import Fire from './../Fire';
import Home from './Home';
import App from '../App';


class AddProduct extends React.Component {

    constructor() {
        super();
        this.state = {
            productName: "",
            productPrice: "",
            productImageName: "",
            isUpload: false,
            fileURL: "",
            uploadProgress: 0,
            isAdded: false
        }
    }

    sendData = (e) => {
        e.preventDefault();
        const db = Fire.firestore();
        db.settings({
            timestampsInSnapshots: true
        })
        db.collection("products").add({
            productName: this.state.productName,
            productPrice: this.state.productPrice,
            timeAdded: new Date(),
            productImage: this.state.fileURL
        });
        setTimeout(() => {
            this.setState({
                productName: "",
                productPrice: "",
                fileURL: "",
                isUpload: false,
                fileName: "",
                uploadProgress: 0,
                isAdded: true
            })
        }, 1000);
    }

    startUpload = () => {
        this.setState({
            isUpload: true,
            uploadProgress: 0
        })
    }

    errUpload = (err) => {
        this.setState({
            isUpload: false
        })
        console.log(err);
    }

    successUpload = (x) => {
        this.setState({
            productImageName: x,
            isUpload: false,
            uploadProgress: 100
        });

        Fire.storage().ref("productImage").child(x).getDownloadURL().then(
            (url) => {
                this.setState({ fileURL: url })
            }
        )
    }

    componentDidUpdate() {
        if (this.state.isAdded === true) {
            setTimeout(() => {
                alert("Product successfully added! Redirecting you back to Home")
                window.location = "/"
            }, 100);

        }
    }

    progressUpload = (x) => {
        this.setState({
            uploadProgress: x
        });
    }

    render() {
        return (
            <React.Fragment>
                <form className="container" onSubmit={this.sendData}>
                    <div class="form-group">
                        <label for="productName">Nama Produk</label>
                        <input type="text" className="form-control" id="productName" placeholder="Nama Produk.." value={this.state.productName} onChange={(e) => { this.setState({ productName: e.target.value }) }} />
                    </div>
                    <div class="form-group">
                        <label for="productPrice">Harga Produk</label>
                        <input type="number" className="form-control" id="productPrice" placeholder="Harga Produk.." value={this.state.productPrice} onChange={(e) => { this.setState({ productPrice: e.target.value }) }} />
                    </div>
                    <div class="form-group">
                        <label className="btn btn-danger my-2">Upload Gambar Produk
                        <FileUploader
                                hidden
                                accept="image/*"
                                name="productImage"
                                storageRef={Fire.storage().ref("productImage")}
                                onUploadStart={this.startUpload}
                                onUploadError={this.errUpload}
                                onUploadSuccess={this.successUpload}
                                onProgress={this.progressUpload}
                            />
                        </label>
                    </div>
                    {this.state.isUpload ?
                        <div class="progress w-50 text-center m-3">
                            <div class="progress-bar" role="progressbar" style={{ width: `${this.state.uploadProgress}%` }} >Uploading image.. {this.state.uploadProgress}%</div>
                        </div>
                        :
                        <React.Fragment>
                        </React.Fragment>
                    }
                    <button type="submit" className="btn btn-primary">Add Product!</button>
                </form>


            </React.Fragment>
        )
    }
}

export default AddProduct;