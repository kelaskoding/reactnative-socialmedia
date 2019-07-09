import React, { Component } from 'react';
import { Container, Content, 
    Item, Input,Left, Icon, Body, Header, Label, Button, Text, Title, Footer, FooterTab, Spinner} from 'native-base';

import { Actions, ActionConst } from 'react-native-router-flux';
import { Alert, View, StyleSheet } from 'react-native';

const BASE_URL = 'https://socialapp-api.herokuapp.com/api/v1';

export default class Register extends Component{

  constructor(){
    super();
    this.state = {
      fullname: '',
      email: '',
      password: '',
      onSave: false
    }
  }

  onRegister = () =>{
    this.setState({onSave: true});
    fetch(BASE_URL+'/account/register',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullname: this.state.fullname,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response=> response.json())
    .then(responseJson => {
        this.setState({onSave: false});
        Alert.alert('Success', 'Registration success!',[{
            text: 'OK',
            onPress: () =>{
              Actions.login({type: ActionConst.RESET});
            }
          }
        ],{cancelable:false})
    }).catch(error=>{
      console.log(error);
    });
  }

    render(){
        return(
            <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' onPress={()=>{Actions.pop();}}/>
            </Button>
          </Left>
          <Body>
            <Title>Register</Title>
          </Body>
        </Header>
        <Content>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={(text) => this.setState({email: text})}/>
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
            </Item>
            <Item floatingLabel>
              <Label>Full Name</Label>
              <Input onChangeText={(text) => this.setState({fullname: text})}/>
            </Item>
            {
              this.state.onSave
                ? <View style={styles.center}>
                    <Spinner color='red'/>
                  </View>
                : <View></View>
            }

        </Content>
        <Footer>
          <FooterTab>
          <Button full onPress={this.onRegister}>
            <Text>Register</Text>
          </Button>
          </FooterTab>
        </Footer>
       
      </Container>
        );
    }
}


const styles = StyleSheet.create({
    center: {
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }
});
