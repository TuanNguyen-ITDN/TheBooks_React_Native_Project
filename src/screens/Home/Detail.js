import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {get, find, take} from 'lodash';
import Book from '../../component/Book';
import Comment from './components/comment';
import {onSignIn} from '../../navigation';
import {connect} from 'react-redux';
import {getComment, addComment} from '../../redux/commentRedux/actions';
import {getRelatedBooks} from '../../redux/relatedBooksRedux/actions';
import {addCard, getCard} from '../../redux/cardRedux/action';
import store from '../../redux/store';
import {getBookDetail} from '../../redux/bookRedux/actions';
import CommentModal from './CommentModal';
import UpdateModal from './UpdateModal';
import Icon from 'react-native-vector-icons/thebook-appicon';
import AwesomeAlert from 'react-native-awesome-alerts';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      isShowForm: true,
      heartEmpty: false,
      IdBook: '',
      userToken: '',
      userId: '',
      isShowAllComment: false,
      isShowAllContent: false,
      showAlert: false,
    };
  }

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  changScreenShowAll = (data, title) => {
    Navigation.showModal({
      component: {
        name: 'ShowAllBook',
        passProps: {
          data: data,
          title: title,
        },
      },
    });
  };

  onAddToCard = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let idbasket = await AsyncStorage.getItem('idbasket');
      let parsed = JSON.parse(user);
      if (parsed === null) {
        this.showAlert();
      } else {
        this.onPress(parsed.Data.Id, parsed.Token.access_token, idbasket);
      }
    } catch (error) {
      alert(error);
    }
  };

  onPress = async (userId, token, idbasket) => {
    let data = {
      BookId: this.props.IdBook,
      Quantity: 1,
      UserId: userId,
    };
    await this.props.onAddCard(data, token);
    this.props.onGetCard(idbasket, token);
  };

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  getCard = (id, token) => {
    this.props.onGetCard(id, token);
  };

  componentDidMount() {
    let idBook = this.props.IdBook;
    let store1 = store.getState().CardReducer;
    this.props.onGetComment(idBook);
    this.props.onGetRelatedBooks(idBook);
    this.props.onGetBookDetail(idBook);
    this.onCheckToken();
  }

  onCheck = async () => {
    let userId = this.state.userId;
    const commentData = this.props.comment.data;

    const result = find(commentData, ['UserId', userId]);
    if (result === undefined) {
      this.refs.addModal.showAddModal();
    } else {
      alert('B???n ???? b??nh lu???n cu???n s??ch n??y');
    }
  };

  onShowForm = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      if (parsed === null) {
        this.showAlert();
      } else {
        this.onCheck();
      }
    } catch (error) {
      alert(error);
    }
  };

  onCheckToken = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      if (parsed != null) {
        await this.setState({
          userId: parsed.Data.Id,
          userToken: parsed.Token.access_token,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  refreshCommentList = () => {
    this.refs.FlatList.scrollToEnd();
  };

  onSubmitComment = commentData => {
    let userToken = this.state.userToken;
    this.props.onAddComment(commentData, userToken);
  };

  onUpdateComment = (commentData, Id) => {
    let userToken = this.state.userToken;
    this.props.onUpdateComment(commentData, Id, userToken);
  };

  onShowAllComment = () => {
    this.setState({
      isShowAllComment: !this.state.isShowAllComment,
    });
  };

  onShowAllContent = () => {
    this.setState({
      isShowAllContent: !this.state.isShowAllContent,
    });
  };

  onCheckCard = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let idbasket = await AsyncStorage.getItem('idbasket');
      let parsed = JSON.parse(user);
      if (parsed === null) {
        this.showAlert();
      } else {
        this.changeShopping(idbasket, parsed.Token.access_token);
      }
    } catch (error) {
      alert(error);
    }
  };

  changeShopping = (idbasket, token) => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'ShoppingCard',
              passProps: {
                token: token,
                idbasket: idbasket,
              },
              options: {
                topBar: {
                  title: {
                    text: '',
                    alignment: 'center',
                  },
                  visible: false,
                },
              },
            },
          },
        ],
      },
    });
  };

  render() {
    const relatedBooks = this.props.relatedBooks.data.RelatedBooks;
    const commentData = this.props.comment.data;
    const bookDetail = this.props.books;

    let star = [];

    for (let i = 0; i < bookDetail.OverallStarRating; i++) {
      star.push(<Icon name="star" size={20} color="#fc9619" />);
    }

    for (let i = 0; i < 5 - bookDetail.OverallStarRating; i++) {
      star.push(<Icon name="star" size={20} color="#c3c1c1" />);
    }

    const ShowAllComment = this.state.isShowAllComment ? (
      <Text style={style.textComment}>Thu g???n</Text>
    ) : (
      <Text style={style.textComment}>Xem t???t c??? nh???n x??t</Text>
    );

    const ShowAllContent = this.state.isShowAllContent ? (
      <Text style={style.text1}>Thu g???n</Text>
    ) : (
      <Text style={style.text1}>Xem th??m</Text>
    );

    return (
      <View style={style.container}>
        <View style={style.topbar}>
          <View style={{flex: 1}}>
            <Icon
              name="ic-back"
              size={30}
              color="#5f5f5f"
              onPress={() => this.backMainScreen()}
            />
          </View>
          <View>
            {this.state.heartEmpty === false ? (
              <Icon
                name="ic-like"
                size={30}
                color="red"
                backgroundColor="red"
                onPress={() => {
                  this.setState({heartEmpty: !this.state.heartEmpty});
                }}
              />
            ) : (
              <Icon
                name="like"
                size={30}
                color="gray"
                onPress={() => {
                  this.setState({heartEmpty: !this.state.heartEmpty});
                }}
              />
            )}
          </View>

          <View style={{marginLeft: 10}}>
            <Icon
              name="ic-cart"
              size={30}
              color="red"
              backgroundColor="red"
              onPress={this.onCheckCard}
            />
          </View>
        </View>

        <ScrollView orientation="vertical">
          <View style={style.viewimage}>
            <Image
              source={{uri: get(bookDetail, 'Medias.0.ImageUrl')}}
              style={style.styleImage}
            />
          </View>

          <View style={style.viewBookInfor}>
            <Text style={style.styleText}>{get(bookDetail, 'Title')}</Text>
            <Text style={style.author}>
              {get(bookDetail, 'Authors.0.Name')}
            </Text>
          </View>

          <View style={style.viewRank}>
            <View style={style.viewIcon}>
              <Icon name="ic-book-1" size={17} color="#fc9619" />
              <Text style={{fontSize: 17, marginLeft: 5, marginTop: -2}}>
                {get(bookDetail, 'Quantity')} quy???n
              </Text>
            </View>

            <View style={style.viewIcon}>
              <Icon name="ic-bookshelf" size={17} color="#fc9619" />
              <Text style={{fontSize: 17, marginLeft: 5, marginTop: -2}}>
                {get(bookDetail, 'Shelf.Name')}
              </Text>
            </View>
          </View>

          <View style={style.viewRank}>
            <View>
              <TouchableOpacity style={style.rank}>{star}</TouchableOpacity>
            </View>

            <View style={style.viewIcon}>
              <Icon name="ic-price-1" size={17} color="#fc9619" />
              <Text style={{fontSize: 17, marginLeft: 5, marginTop: -2}}>
                {bookDetail.Price}
              </Text>
            </View>
          </View>

          <View style={style.viewdescription}>
            <Text
              numberOfLines={
                this.state.isShowAllContent ? bookDetail.Content.length : 3
              }
              style={style.description}>
              {bookDetail.Content}
            </Text>
            <TouchableWithoutFeedback onPress={this.onShowAllContent}>
              {ShowAllContent}
            </TouchableWithoutFeedback>
          </View>

          <View style={style.viewSameBook}>
            <View style={style.category}>
              <Text style={style.text}>S??ch t????ng t???</Text>
              <Text
                style={style.showall}
                onPress={() =>
                  this.changScreenShowAll(relatedBooks, 'S??ch li??n quan')
                }>
                Xem h???t
              </Text>
            </View>

            <FlatList
              style={style.list}
              data={relatedBooks}
              renderItem={({item}) => (
                <Book
                  image={get(item, 'Medias.0.ImageUrl')}
                  name={get(item, 'Shelf.Name')}
                  author={get(item, 'Authors.0.Name')}
                  count={get(item, 'Shelf.BookCount')}
                  title={get(item, 'Title')}
                  OverallStarRating={get(item, 'OverallStarRating')}
                  idBook={get(item, 'Id')}
                />
              )}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{marginBottom: 20, margin: 20}}>
            <Text style={style.text}>Nh???n x??t</Text>
            <TouchableWithoutFeedback onPress={this.onShowForm}>
              <Text style={style.button}>Vi???t nh???n x??t cho cu???n s??ch n??y</Text>
            </TouchableWithoutFeedback>
          </View>

          <FlatList
            ref={'FlatList'}
            data={take(
              commentData,
              this.state.isShowAllComment ? commentData.length : 2,
            )}
            renderItem={({item}) => (
              <Comment
                name={item.UserName}
                userImage={item.UrlImageUser}
                comment={item.Content}
                starRating={item.StarRating}
                userIdMember={item.UserId}
                Id={item.Id}
                userId={this.state.userId}
                parentFlatList={this}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
          <TouchableWithoutFeedback onPress={this.onShowAllComment}>
            {ShowAllComment}
          </TouchableWithoutFeedback>
        </ScrollView>
        <View>
          <TouchableWithoutFeedback onPress={this.onAddToCard}>
            <Text style={style.buttonAddToCard}>Th??m v??o gi???</Text>
          </TouchableWithoutFeedback>
        </View>
        <CommentModal
          ref={'addModal'}
          parentFlatList={this}
          IdBook={bookDetail.Id}
          onSubmitComment={this.onSubmitComment}
        />
        <UpdateModal
          ref={'updateModal'}
          parentFlatList={this}
          IdBook={bookDetail.Id}
          onUpdateComment={this.onUpdateComment}
        />

        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="B???n c???n ????ng nh???p ????? th???c hi???n ch???c n??ng n??y"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="L??c kh??c"
          confirmText="????ng nh???p"
          confirmButtonColor="#1d9dd8"
          cancelButtonColor="#70f1cc"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            onSignIn();
          }}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  styleImage: {
    width: '100%',
    height: 280,
  },
  styleTextInput: {
    borderWidth: 2,
    borderColor: '#2bb6f9',
    marginVertical: 10,
    color: '#2bb6f9',
  },
  list: {
    paddingTop: 5,
  },
  showall: {
    color: '#2bb6f9',
    flex: 1,
    paddingTop: 5,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    marginTop: 1,
  },
  category: {
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  topbar: {
    paddingLeft: 15,
    fontSize: 10.5,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  button: {
    borderWidth: 1.5,
    borderRadius: 12,
    fontSize: 17,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
    backgroundColor: 'white',
    borderColor: '#2bb6f9',
    color: '#2bb6f9',
    flex: 1,
    margin: 10,
  },
  styleText: {
    fontSize: 20,
    textAlign: 'center',
  },
  viewimage: {
    marginHorizontal: 80,
    marginVertical: 5,
  },
  viewBookInfor: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: 15,
    marginVertical: 20,
  },
  author: {
    color: 'gray',
    fontSize: 19,
  },
  viewRank: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: -17,
  },
  rank: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20.5,
    paddingTop: 5,
    flex: 3.5,
    marginVertical: 10,
  },
  buttonAddToCard: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
    backgroundColor: '#2bb6f9',
    color: 'white',
  },
  viewSameBook: {
    marginHorizontal: 15,
    marginVertical: 35,
    flexDirection: 'column',
  },
  description: {
    fontSize: 15,
    color: 'gray',
  },
  viewdescription: {
    margin: 10,
    marginTop: 20,
  },
  textComment: {
    textAlign: 'center',
    color: '#2bb6f9',
    fontSize: 18,
    marginVertical: 20,
  },
  viewIcon: {
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
  },
  text1: {
    color: '#2bb6f9',
  },
});

const mapStateToProps = state => {
  return {
    books: state.bookReducer.detailBook,
    comment: state.comment,
    relatedBooks: state.relatedBook,
    card: state.CardReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetComment: idBook => dispatch(getComment(idBook)),
    onGetRelatedBooks: idBook => dispatch(getRelatedBooks(idBook)),
    onAddCard: (data, token) => dispatch(addCard(data, token)),
    onGetCard: (data, token) => dispatch(getCard(data, token)),
    onGetBookDetail: idBook => dispatch(getBookDetail(idBook)),
    onAddComment: (commentData, userToken) =>
      dispatch(addComment(commentData, userToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
