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
    Text
} from 'native-base';
import {Image} from 'react-native';

export default class Timeline extends Component {
    render() {
        return (
            <Container>
                <Header
                    style={{
                    backgroundColor: '#581845'
                }}/>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail
                                    source={{
                                    uri: 'https://hendrosteven.files.wordpress.com/2007/10/hendro1.jpg'
                                }}/>
                                <Body>
                                    <Text>Hendro Steven</Text>
                                    <Text note>2019-01-01</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image
                                source={{
                                uri: 'http://www.youandthemat.com/wp-content/uploads/nature-2-26-17.jpg'
                            }}
                                style={{
                                height: 200,
                                width: null,
                                flex: 1
                            }}/>
                        </CardItem>
                        <CardItem>
                            <Text>Photo Description</Text>
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
                </Content>
            </Container>
        );
    }
}