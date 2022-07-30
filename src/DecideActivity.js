import React, { Component } from 'react'

class DecideActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            longitude:0,
            error: ''
        };
    }

    // state = {
    //     longitude: 0
    // }

    render() {
        window.navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            this.setState({
               longitude: position.coords.longitude
            });
        },
        (err) => {
            console.log(err);
            this.setState({
               error: err.message
            });
        });

        const{longitude, error} = this.state;

        if (longitude !== 0 && !error) {
            return(
                <div>
                    Boylam : {longitude}
                </div>
            )
        }else if (longitude === 0 && error) {
            return(
                <div>
                    Hata : {error}
                </div>
            )
        }else{
            return(
                <div>
                    Yükleniyor...
                </div>
            )
        }
    }
}

export default DecideActivity;
