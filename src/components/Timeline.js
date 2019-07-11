import React, {Component} from 'react';
import {
    Container,
    Button,
    Icon,
    Header,
    Content,
    Card,
    CardItem,
    Left,
    Thumbnail,
    Body,
    Text,
    View,
    Spinner,
    Fab
} from 'native-base';
import {Image, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from '../conf/Config'

export default class Timeline extends Component {

    constructor() {
        super();
        this.state = {
            token: '',
            data: [],
            isLoading: true,
            page: 1
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
                this.getAllData();
            } else {
                Actions.login();
            }
        } catch (error) {
            console.log(error);
        }
    }

    getAllData() {
        fetch(BASE_URL + '/timeline/10/' + this.state.page, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Barier ' + this.state.token
            }
        }).then((response) => response.json()).then((responseData) => {
            console.log(responseData);
            let status = responseData['status'];
            if (status) {
                this.setState({isLoading: false, data: responseData['payload']['subset']
                });
            } else {
                Actions.login();
            }
        });
    }

    render() {
        let postings;
        if (this.state.data) {
            postings = this
                .state
                .data
                .map(post => {
                    return (
                        <Card key={post.id}>
                            <CardItem>
                                <Left>
                                    <Thumbnail
                                        source={{
                                        uri: 'https://hendrosteven.files.wordpress.com/2007/10/hendro1.jpg'
                                    }}/>
                                    <Body>
                                        <Text>{post.account_name}</Text>
                                        <Text note>{post.post_date}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image
                                    source={{
                                    uri: post.photo
                                }}
                                    style={{
                                    height: 200,
                                    width: null,
                                    flex: 1
                                }}/>
                            </CardItem>
                            <CardItem>
                                <Text>{post.description}</Text>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="chatbubbles"/>
                                        <Text>Comments</Text>
                                    </Button>
                                </Left>
                            </CardItem>
                        </Card>
                    );
                });
        }
        return (
            <Container>
                <Header
                    style={{
                    backgroundColor: '#581845'
                }}>
                    <Body>
                        <Text
                            style={{
                            color: '#ffffff',
                            fontWeight: '500'
                        }}>PhotoShare</Text>
                    </Body>
                </Header>
                <Content>
                    {this.state.isLoading
                        ? <View style={styles.center}>
                                <Spinner color='red'/>
                            </View>
                        : <View></View>
}
                    {postings}
                </Content>
                <View>
                    <Fab
                        style={{
                        backgroundColor: '#5067FF'
                    }}
                    onPress={()=>{Actions.kamera();}}
                        position="bottomRight">
                        <Icon name="add"/>
                    </Fab>
                </View>
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
