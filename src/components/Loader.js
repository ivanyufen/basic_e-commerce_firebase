import React from 'react';

class Loader extends React.Component {
    render() {
        return (
            <div class="ui segment col-lg-12" style={{ width: "100%", height: "100vh" }}>
                <div class="ui active inverted dimmer" >
                    <div class="ui text loader">{this.props.text}</div>
                </div>
                <p></p>
            </div>
        )
    }
}

export default Loader;