import React from 'react';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
} from 'react-native-paper';
import HTML from 'react-native-render-html';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';






export default class SinglePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isloading: true,
      post: [],
      already_bookmark: false,
      fetchPost: []
    };
  }

componentDidMount() {
  this.fetchPost();
      /*bytte ut denne nedenfor med en ny moderne fungerende:ja
       this.renderBookMark(this.props.navigation.getParam('post_id'));*/
        this.renderBookMark(this.props.route.params?.post_id ?? 'true');
  }
  
async fetchPost() {
  
  /* gammel metode
  let post_id = this.props.navigation.getParam('post_id')*/
  let { post_id } = this.props.route.params;
  

  const response = await fetch(
    `https://kriss.io/wp-json/wp/v2/posts?`
  );
  const post = await response.json();
  this.setState({ post: post, isloading: false,
  });
}

async fetchLastestPost() {
  const response = await fetch(
    'https://kriss.io/wp-json/wp/v2/posts?per_page=5'
  );
  const post = await response.json();
  this.setState({ lastestpost: post});
}








saveBookMark = async post_id => {
    this.setState({already_bookmark: true});
    await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find(value => value === post_id);
        if (data == null) {
          res.push(post_id);
          AsyncStorage.setItem('bookmark', JSON.stringify(res));
        }
      } else {
        let bookmark = [];
        bookmark.push(post_id);
         AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
      }
    });
  };

  removeBookMark = async post_id => {
    this.setState({already_bookmark: false});
    const bookmark = await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token);
      return res.filter(e => e !== post_id);
    });
    await AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
  };

  renderBookMark = async post_id => {
    await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token);
      let data = res.find(value => value === post_id);
      return data == null
        ? this.setState({already_bookmark: false})
        : this.setState({already_bookmark: true});
    });
  };










render() {
    let { post_id, titleRendered } = this.props.route.params;
    return (
      <ScrollView>
          <Card>
            <Card.Content>
            <Title>{post_id} </Title>
            <Title>{titleRendered} </Title>


            <List.Item
             right={props => {
               if (this.state.already_bookmark == true) {
                 return (
                   <TouchableOpacity
                     onPress={() => this.removeBookMark(post_id)}>
                     <FontAwesome name="bookmark" color={'green'} size={30} />
                   </TouchableOpacity>
                 );
               } else {
                 return (
                   <TouchableOpacity
                     onPress={() => this.saveBookMark(post_id)}>
                     <FontAwesome name="bookmark-o" color={"#000"} size={30} />
                   </TouchableOpacity>
                 );
               }
             }}
           />
             
             
            
            </Card.Content>
          </Card>
        
      </ScrollView>
    );
  }
}