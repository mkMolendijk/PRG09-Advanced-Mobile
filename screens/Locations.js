import React, {Component} from 'react';
import {Container, Header, Body, Title, Content, List, ListItem, Text} from 'native-base';
import * as firebase from 'firebase';

export default class Locations extends Component {
    constructor(props) {
        super(props);
        this.itemsRef = firebase.database().ref('locations');

        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this.itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    location: items[item].location,
                });
            }

            this.setState({
                data: newState
            });
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Here I Have Been</Title>
                    </Body>
                </Header>
                <Content>
                    <List>
                        {this.state.data.map((item) => {
                            return (
                                <ListItem key={item.id}>
                                    <Text>{item.location}</Text>
                                </ListItem>
                            )
                        }
                        )}
                    </List>
                </Content>
            </Container>
        );
    }
}
