import React, {Component} from 'react';
import {
    Container,
    Header,
    Body,
    Title,
    Left,
    Content,
    Footer,
    Input,
    Button,
    Icon,
    Text,
    View,
    ListItem,
    Thumbnail,
    List
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from '../conf/Config';

export default class Komentar extends Component {

    constructor() {
        super();
        this.state = {
            token: '',
            data: [],
            isLoading: true,
            stringComments: ''
        }
    }

    componentDidMount() {
        this.getToken();
    }

    getToken = async() => {
        try {
            const value = await AsyncStorage.getItem('APP_TOKEN');
            if (value !== null) {
                this.setState({token: value});
            } else {
                Actions.login({type: ActionConst.RESET});
            }
            //panggil API
            this.getAllComments();
        } catch (err) {
            console.log(err);
        }
    }

    getAllComments = ()=>{
        fetch(BASE_URL+'/comments/'+this.props.postingId,{
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': 'Barier '+ this.state.token
            }
        }).then((response)=>response.json())
        .then((responseData)=>{
            let status = responseData['status'];
            if(status){
                this.setState({
                    isLoading: false,
                    data: responseData['payload']['subset']
                });
            }else{
                Actions.login({type: ActionConst.RESET});
            }
        });
    }

    render() {
        let comments = <View></View>;
        if(this.state.data){
            comments = this.state.data.map(komentar =>{
                <ListItem key={komentar.id}>
                    <Left>
                        <Thumbnail source={{uri: 'https://hendrosteven.files.wordpress.com/2007/10/hendro1.jpg'}}/>
                    </Left>
                    <Body>
                        <Text>{komentar.account_name}</Text>
                        <Text note>{komentar.comment}</Text>
                    </Body>
                </ListItem>
            });
        }
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon
                            name='arrow-back'
                            fontSize='20'
                            style={{
                            color: 'white'
                        }}
                            onPress={() => {
                            Actions.pop();
                        }}/>
                    </Left>
                    <Body>
                        <Title>Comments</Title>
                    </Body>
                </Header>
                <Content>
                    <List>
                        {comments}
                    </List>
                </Content>
                <Footer style={{
                    backgroundColor: '#fff'
                }}>
                    <Input
                        regular
                        placeholder='Your comments'
                        style={{
                        width: '80%'
                    }}/>
                    <Button>
                        <Text>Send</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}