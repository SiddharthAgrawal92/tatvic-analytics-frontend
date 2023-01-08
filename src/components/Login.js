import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

import Home from './Home';
import Dashboard from './Dashboard';

const Login = () => {
    const [profile, setProfile] = useState({});
    const [showDashboard, setShowDashboard] = useState(false);
    const clientId = '441756986778-9qelcl6u1bm8l9umtvdjvab2jca9ot85.apps.googleusercontent.com';
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        setProfile(res.profileObj);
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile(null);
    };

    return (
        <div>
            <h2>Wiki Analytics</h2>
            <hr />
            {profile && Object.keys(profile).length ? (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {/* <h4>User Logged in as</h4> */}
                                <b>Name:</b> {profile.name} &nbsp;
                            </div>
                            <div className="col">
                                <b>Email:</b> {profile.email}
                            </div>
                            <div className="col">
                                <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />&nbsp;
                                <img style={{ width: '50px', height: '50px' }} src={profile.imageUrl} alt="user_image" />
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-dark" onClick={() => {
                        setShowDashboard(!showDashboard);
                    }}>Show/Hide Dashboard</button>
                    <hr />
                    {
                        showDashboard ?
                            <Dashboard /> :
                            <Home />
                    }
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )}
        </div>
    );
}

export default Login;