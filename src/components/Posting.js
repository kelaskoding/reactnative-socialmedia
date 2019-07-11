import React, {Component} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import { Container, Header, Body, Content, Left, Icon, Right, Item, Label, Input, Footer, FooterTab, Button } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from '../conf/Config'

export default class Posting extends Component {

    constructor(){
        super();
        this.state = {
            onProcess: false,
            token: '',
            description: ''
        }
    }

    componentDidMount(){
        this.getToken();
    }

    getToken = async ()=>{
        try{
            const value = await AsyncStorage.getItem('APP_TOKEN');
            if(value!==null){
                this.setState({
                    token: value
                });
            }else{
                Actions.login({type: ActionConst.RESET});
            }
        }catch(err){
            console.log(err);
        }
    }

    handlePosting = () =>{
        this.setState({
            onProcess: true
        },()=>{
            RNFS.readFile(this.props.data.uri,'base64')
                .then(base64=>{
                    fetch(BASE_URL+'/timeline',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Barier '+ this.state.token
                        },
                        body: JSON.stringify({
                            photo: 'data:image/jpeg;base64,'+base64,
                            description: this.state.description
                        })
                    })
                    .then(response=>response.json())
                    .then(responseJson =>{
                        this.setState({
                            onProcess: false
                        });
                        Actions.timeline({type: ActionConst.RESET});
                    }).catch(err =>{
                        console.log(err);
                    });
                });
        });
    }

    render() {
        let photo = <View></View>;
        if(this.props.data){
            photo = <Image source={{uri: this.props.data.uri}} 
                style={{width:'100%',height:300}}/>
        }
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon name='arrow-back' fontSize='20' style={{color:'white'}}
                            onPress={()=>{Actions.timeline({type: ActionConst.RESET})}}/>
                    </Left>
                    <Body><Text style={{color:'white'}}>Add Posting</Text></Body>
                    <Right></Right>
                </Header>
                <Content padder>
                    {photo}
                    <Item floatingLabel>
                        <Label>Descriptions</Label>
                        <Input onChangeText={(text)=> this.setState({description:text})}/>
                    </Item>
                </Content>
                <Footer>
                    <FooterTab>
                        {
                            this.state.onProcess 
                            ? <Button full disabled={true} light><Text style={styles.btnProcess}>Process</Text></Button>
                            : <Button full transparent onPress={this.handlePosting}><Text style={styles.btnPosting}>Posting</Text></Button>
                        }
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    btnPosting: {
        flex: 0,
        color: '#fff',
        fontWeight:'500'
    },
    btnProcess:{
        flex: 0,
        color: '#000',
        fontWeight:'500'
    }
});