import React, {Component} from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, List, Headline, } from 'react-native-paper';

import HTMLRender from 'react-native-render-html';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from "react-navigation";
import {withNavigationFocus} from 'react-navigation';
import { useIsFocused } from '@react-navigation/native';

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmark_post: [],
      isFetching: false,/*kjøre til false egt*/
    };
  }



  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      this.fetchBookmark();
    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener();
  };


async fetchBookMark() {
  this.setState({isFetching: true});
  let bookmark = await AsyncStorage.getItem('bookmark').then(token => {
    const res = JSON.parse(token);
    if (res != null) {
      const result = res.map(post_id => {
        return 'include[]=' + post_id;
      });
      return result.join('&');
    } else {
      return null;
    }
  });
  const response = await fetch(
    'https://kriss.io/wp-json/wp/v2/posts?${bookmark}'
  );
  const post = await response.json();
  /*this.setState({ posts: post });*/
  this.setState({ bookmark_post: post, isloading: false });
}







render() {
return (
  <View>
    <Headline style={{marginLeft: 30}}>Bookmark Post</Headline>
    <FlatList
      data={this.state.bookmark_post}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('SinglePost', {
              post_id: item.id,
            })
          }>

          <View><Text>{item.post_id}</Text></View>

          <Card
            style={{
              shadowOffset: {width: 5, height: 5},
              width: '90%',
              borderRadius: 12,
              alignSelf: 'center',
              marginBottom: 10,
            }}>
            <Card.Content>
              <Title>{item.title.rendered}</Title>
              <Title>{post_id}</Title>
              <Paragraph>
                Published on {moment(item.date).fromNow()}
              </Paragraph>
            </Card.Content>
            <Card.Cover source={{uri: item.jetpack_featured_media_url}} />
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

export default withNavigation(Bookmark);

/*export default function(props) {
  const isFocused = useIsFocused();

  return <Bookmark isFocused={isFocused} />;
}*/

