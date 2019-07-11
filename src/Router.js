import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Login from './components/Login';
import Register from './components/Register';
import Timeline from './components/Timeline'; 
import Kamera from './components/Kamera';
import Posting from './components/Posting';
import Komentar from './components/Komentar';

export default class Routes extends Component{
    render(){
        return(
            <Router>
                <Stack key="root" hideNavBar="{true}">
                    <Scene key="login" component={Login} title="Login"/>
                    <Scene key="register" component={Register} title="Signup" />
                    <Scene key="timeline" component={Timeline} title="Timeline" initial="true"/> 
                    <Scene key="kamera" component={Kamera} />
                    <Scene key="posting" component={Posting} title="Posting" />
                    <Scene key="komentar" component={Komentar} title="Comments"/>
                </Stack>
            </Router>
        );
    }
}
