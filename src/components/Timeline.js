import React, {Component} from 'react';
import {
    Container,
    Button,
    Icon,
    Header,
    Card,
    CardItem,
    Left,
    Thumbnail,
    Body,
    Text,
    Fab,
    Right
} from 'native-base';
import {Image, StyleSheet, FlatList, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL} from '../conf/Config'

export default class Timeline extends Component {

    constructor() {
        super();
        this.state = {
            token: '',
            data: [],
            isLoading: false,
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
        let page = this.state.page;
        this.setState({isLoading: true});
        fetch(BASE_URL + '/timeline/5/' + page, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Barier ' + this.state.token
            }
        }).then((response) => response.json()).then((responseData) => {
            console.log(responseData);
            let status = responseData['status'];
            if (status) {
                this.setState({
                    isLoading: false,
                    data: page === 1
                        ? responseData['payload']['subset']
                        : [
                            ...this.state.data,
                            responseData['payload']['subset']
                        ]
                });
            } else {
                Actions.login();
            }
        });
    }

    handleLoadMore = () => {
        console.log('handleMore');
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.getAllData();
        });
    }

    render() {

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
                <View style={{
                    flex: 1
                }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => (
                        <Card key={item.id + '_card'}>
                            <CardItem>
                                <Left>
                                    <Thumbnail
                                        source={{
                                        uri: 'https://hendrosteven.files.wordpress.com/2007/10/hendro1.jpg'
                                    }}/>
                                    <Body>
                                        <Text>{item.account_name}</Text>
                                        <Text note>{item.post_date}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image
                                    key={item.id + '_img'}
                                    source={{
                                    uri: item.photo
                                }}
                                    style={{
                                    height: 200,
                                    width: null,
                                    flex: 1
                                }}/>
                            </CardItem>
                            <CardItem>
                                <Text>{item.description}</Text>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button
                                        transparent
                                        onPress={() => {
                                        Actions.komentar({postingId: item.id})
                                    }}>
                                        <Icon active name="chatbubbles"/>
                                        <Text>Comments</Text>
                                    </Button>
                                </Left>
                            </CardItem>
                        </Card>
                    )}
                        keyExtractor={item => String(item.id)}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={10}/>

                    <Fab
                        style={{
                        backgroundColor: '#5067FF'
                    }}
                        onPress={() => {
                        Actions.kamera();
                    }}
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
