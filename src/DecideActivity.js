import React, { Component } from 'react'

class DecideActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            error: ''
        };
    }

    // state = {
    //     longitude: 0
    // }

    decideActivity(lat) {

        const currentMonth = new Date().getMonth();
        const summer = {
            text: 'Yüzmeye gidebilirsin',
            iconName: 'sun'
        }
        const winter = {
            text: 'Kayağa gidebilirsin',
            iconName: 'snowflake'
        }
        
        if (lat < 0) {
            // güney yarımküre

            if (currentMonth < 3 || currentMonth > 9) {
                return summer;
            } else {
                return winter;
            }
        } else {
            // kuzey yarımküre

            if (currentMonth < 3 || currentMonth > 9) {
                return winter;
            } else {
                return summer;
            }
        }
    }

    render() {
        const { latitude, error } = this.state;
        console.log(this.decideActivity(latitude));

        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                this.setState({
                    latitude : position.coords.latitude
                });
            },
            (err) => {
                console.log(err);
                this.setState({
                    error : "Kullanıcı Lokasyon erişimi vermedi!"
                });
            }
        );

        if (latitude !== 0 && !error) {
            const activity = this.decideActivity(latitude);
            return (
                <div>
                    <h2 className="ui header">
                        <i className={`${activity.iconName} outline icon`}></i>
                        <div className="content">
                            {activity.text}
                        </div>
                    </h2>
                </div>
            )
        } else if (latitude === 0 && error) {
            return (
                <div>
                    Hata : {error}
                </div>
            )
        } else {
            return (
                <div>
                    Yükleniyor...
                </div>
            )
        }
    }
}

export default DecideActivity;
