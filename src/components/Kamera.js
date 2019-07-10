import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Actions} from 'react-native-router-flux';
import { Icon } from 'native-base';

export default class Kamera extends Component{

    takePicture = async ()=>{
        try{
            const data = await this.camera.takePictureAsync();
            Actions.posting({data});
        }catch(err){
            console.log('err: ',err);
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <RNCamera style={styles.preview} ref={cam => {this.camera = cam; }}>
                    <View>
                        <TouchableOpacity style={styles.btnCapture}>
                            <Icon name='camera' fontSize="20"/>
                        </TouchableOpacity>
                    </View>
                </RNCamera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    btnCapture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 50,
        color: '#000',
        padding: 20,
        margin: 40
    }
});