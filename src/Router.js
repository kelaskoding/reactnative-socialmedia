import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Login from './components/Login';
import Register from './components/Register';
import Timeline from './components/Timeline'; 

export default class Routes extends Component{
    render(){
        return(
            <Router>
                <Stack key="root" hideNavBar="{true}">
                    <Scene key="login" component={Login} title="Login"/>
                    <Scene key="register" component={Register} title="Signup" />
                    <Scene key="timeline" component={Timeline} title="Timeline" initial="true"/> 
                </Stack>
            </Router>
        );
    }
}
