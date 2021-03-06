import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {getBook} from '../../redux/bookRedux/actions';
import {
  Text,
  View,
  Image,
  StyleSheet,
  AsyncStorage,
  FlatList,
  ScrollView,
} from 'react-native';
import {onSignIn} from '../../navigation';
import {getBestUsers} from '../../redux/userRedux/actions';
import {getOutstandingReviews} from '../../redux/commentRedux/actions';
import Icon from 'react-native-vector-icons/thebook-appicon';
import Book from '../../component/Book';
import UserReview from './components/userReview';
import {get, filter} from 'lodash';
import AwesomeAlert from 'react-native-awesome-alerts';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
    };
  }

  changeScreenShowAll = (data, title) => {
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

  onCheck = async () => {
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

  changScreenSearch = () => {
    Navigation.showModal({
      component: {
        name: 'Search',
      },
    });
  };

  changScreenFilter = () => {
    Navigation.mergeOptions('sideMenu', {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    });
  };

  componentDidMount() {
    this.props.onGetBooks();
    this.props.onGetBestUsersData();
    this.props.onGetOutstandingData();
  }

  render() {
    const newBooks = this.props.book.data.NewBooks;
    const mostBorrowBooks = this.props.book.data.MostBorrowBooks;
    const bestUsers = this.props.bestUsers;
    const oustandingReviews = this.props.oustandingReviews;

    const listNewBooksActive = filter(
      newBooks,
      item => item.IsDeleted === false,
    );

    const listMostBorrowBooksActive = filter(
      mostBorrowBooks,
      item => item.IsDeleted === false,
    );

    return (
      <View>
        <View style={styles.topbar}>
          <View style={{flex: 1}}>
            <Icon
              name="ic-menu"
              size={30}
              color="#5f5f5f"
              onPress={() => this.changScreenFilter()}
            />
          </View>
          <View style={styles.search}>
            <Icon
              name="ic-search"
              size={30}
              color="#5f5f5f"
              onPress={() => this.changScreenSearch()}
            />
          </View>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.main}>
            <View style={styles.category}>
              <Text style={styles.text}>
                S??ch m???i ({get(listNewBooksActive, 'length')})
              </Text>
              <Text
                style={styles.showall}
                onPress={() =>
                  this.changeScreenShowAll(listNewBooksActive, 'S??ch m???i')
                }>
                Xem h???t
              </Text>
            </View>
            <FlatList
              style={styles.list}
              data={listNewBooksActive}
              renderItem={({item}) => (
                <Book
                  image={get(item, 'Medias.0.ImageUrl')}
                  author={get(item, 'Authors.0.Name')}
                  count={get(item, 'Shelf.BookCount')}
                  OverallStarRating={get(item, 'OverallStarRating')}
                  title={get(item, 'Title')}
                  idBook={get(item, 'Id')}
                />
              )}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
            <View style={styles.category}>
              <Text style={styles.text}>
                S??ch m?????n nhi???u ({get(listMostBorrowBooksActive, 'length')})
              </Text>

              <Text
                style={styles.showall}
                onPress={() =>
                  this.changeScreenShowAll(
                    listMostBorrowBooksActive,
                    'S??ch m?????n nhi???u',
                  )
                }>
                Xem h???t
              </Text>
            </View>
            <FlatList
              style={styles.list}
              data={listMostBorrowBooksActive}
              renderItem={({item}) => (
                <Book
                  image={get(item, 'Medias.0.ImageUrl')}
                  name={get(item, 'Shelf.Name')}
                  author={get(item, 'Authors.0.Name')}
                  count={get(item, 'Shelf.BookCount')}
                  OverallStarRating={get(item, 'OverallStarRating')}
                  title={get(item, 'Title')}
                  idBook={get(item, 'Id')}
                />
              )}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />

            <View style={styles.category}>
              <Text style={styles.text}>Top 10 b???n ?????c m?????n s??ch</Text>
            </View>
            <FlatList
              style={styles.list}
              data={bestUsers}
              renderItem={({item}) => (
                <UserReview
                  image={item.ImageUrl}
                  name={item.Name}
                  booksCount={item.BooksCount}
                  extraInfor={'l?????t m?????n'}
                />
              )}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />

            <View style={styles.category}>
              <Text style={styles.text}>Top 5 ng?????i nh???n x??t n???i b???t</Text>
            </View>
            <FlatList
              style={styles.list}
              data={oustandingReviews}
              renderItem={({item}) => (
                <UserReview image={item.UrlImageUser} name={item.UserName} />
              )}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Icon
            name="ic-cart"
            size={40}
            color="white"
            onPress={() => this.onCheck()}
          />
        </View>

        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="B???n c???n ????ng nh???p ????? th???c hi???n thao t??c n??y?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelButtonColor="#8be4cb"
          showConfirmButton={true}
          cancelText="????? sau"
          confirmText="????ng nh???p"
          confirmButtonColor="#1d9dd8"
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
const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#7adaf7',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 65,
    borderRadius: 50,
    right: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  showall: {
    alignItems: 'flex-end',
    color: '#1d9dd8',
    flex: 1,
    fontSize: 15,
  },
  category: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  scroll: {
    padding: 10,
    marginBottom: 65,
    paddingBottom: 100,
  },
  bookCount: {
    color: '#ababab',
    paddingLeft: 10,
  },
  topbar: {
    paddingLeft: 15,
    paddingTop: 20.5,
    fontSize: 10.5,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  search: {
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 22,
    paddingTop: 5,
    flex: 3.5,
  },
  rate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: '#4a4a4a',
    fontSize: 18,
  },
  author: {
    color: '#ababab',
    fontSize: 16,
    width: 150,
  },
});
const mapStateToProps = state => {
  return {
    book: state.bookReducer,
    bestUsers: state.user.bestUsers,
    oustandingReviews: state.comment.ounstandingReviews,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetBooks: () => dispatch(getBook()),
    onGetBestUsersData: () => dispatch(getBestUsers()),
    onGetOutstandingData: () => dispatch(getOutstandingReviews()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
