import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, List, Headline, } from 'react-native-paper';
import HTMLRender from 'react-native-render-html';
import moment from 'moment'


export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastestpost: []
    };
  }

  componentDidMount() {
   this.fetchLastestPost();
 }
 async fetchLastestPost() {
   const response = await fetch(
     'https://kriss.io/wp-json/wp/v2/posts?per_page=5'
   );
   const post = await response.json();
   this.setState({ lastestpost: post});
 }






  render() {
    return (
      <View>
        <Headline style={{ marginLeft: 30 }}>Lastest Post</Headline>
        <FlatList
          data={this.state.lastestpost}
          renderItem={({ item }) => (

          <TouchableOpacity
           onPress={() =>
             this.props.navigation.navigate('SinglePost', {
               post_id: item.id,
               titleRendered: item.title.rendered
             })
           }>

            <Card style={styles.cardLayout}>
              <Card.Content>
                  <Title>{item.id} </Title>
                 <Title>{item.title.rendered}</Title>
                 <Paragraph>Published on {moment(item.date).fromNow()}</Paragraph>
                </Card.Content>
                  <Card.Cover source={{ uri: item.jetpack_featured_media_url }} />
                <Card.Content>
                <Card.Content>
                  <HTMLRender html={item.excerpt.rendered} />
                </Card.Content>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}






const styles = StyleSheet.create({
  cardLayout: {
    shadowOffset: { width: 5, height: 5 },
    width: '90%',
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 10,
  }
});
