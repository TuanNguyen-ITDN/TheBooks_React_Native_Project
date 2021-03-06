import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  AsyncStorage,
  FlatList,
} from 'react-native';
import {onSignIn} from '../../navigation';
import {connect} from 'react-redux';
import {logOut} from '../../redux/userRedux/actions';
import iconProfile from '../../../assets/images/Home/anh.jpg';
import Icon from 'react-native-vector-icons/thebook-appicon';
import Book from '../../component/Book';
import {Navigation} from 'react-native-navigation';
import ScrollableTabView from 'rn-collapsing-tab-bar';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      phoneNumber: '',
      gender: '',
    };
  }

  onLogOut = () => {
    this.props.onLogOutUser();
    onSignIn();
    this.removeEverything();
  };

  removeEverything = async () => {
    try {
      await AsyncStorage.clear();
      alert('Log out successfully!');
    } catch (e) {
      alert('Logout failed');
    }
  };

  componentDidMount() {
    this.onCheck();
  }

  onCheck = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);

      // console.log(username, email, phoneNumber, gender);

      if (parsed) {
        let fullName = parsed.Data.FullName;
        let email = parsed.Data.Email;
        let phoneNumber = parsed.Data.PhoneNumber;
        let gender = parsed.Data.Gender;
        this.setState({
          fullName: fullName,
          email: email,
          phoneNumber: phoneNumber,
          gender: gender,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onPress = () => {
    Navigation.mergeOptions('sideMenu', {
      sideMenu: {
        right: {
          visible: true,
        },
      },
    });
  };

  render() {
    const {fullName, email, gender, phoneNumber} = this.state;
    const newBooks = this.props.book.data.NewBooks;
    return (
      <View>
        <View style={style.topbar}>
          <View style={{flex: 1}}>
            <Icon
              name="ic-photo"
              size={30}
              color="#5f5f5f"
              onPress={this.onBack}
            />
          </View>
          <View style={style.search}>
            <Icon
              name="ic-setting"
              size={30}
              color="#5f5f5f"
              onPress={this.onPress}
            />
          </View>
        </View>
        <ScrollView orientation="vertical">
          <View>
            <View style={style.styleViewProfile}>
              <Image style={style.styleImageProfile} source={iconProfile} />
            </View>
            <View style={{margin: 20, marginTop: -110}}>
              <Text style={{color: 'white', fontSize: 30}}>{fullName}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
                <View style={style.platinum}>
                  <Icon name="ic-titan" size={35} color="#ea06f9" />
                  <Text style={style.textPlatinum}>Platinum</Text>
                </View>
                <View style={{flex: 1}} />
                <View style={style.viewCode}>
                  <Icon name="code" size={50} color="black" />
                </View>
              </View>
            </View>
            <ScrollableTabView>
              <View style={{margin: 25}} name="tab1" tabLabel="??ang m?????n">
                <View style={style.viewIcon}>
                  <View style={style.iconButton}>
                    <Icon name="ic-filter-change-2" size={30} color="black" />
                  </View>
                  <View style={style.iconButton}>
                    <Icon name="ic-filter-change" size={30} color="black" />
                  </View>
                </View>
                <FlatList
                  style={style.list}
                  data={newBooks}
                  renderItem={({item}) => (
                    <Book
                      image={item.Medias[0].ImageUrl}
                      name={item.Shelf.Name}
                      author={item.Authors[0].Name}
                      count={item.Shelf.BookCount}
                      title={item.Title}
                      OverallStarRating={item.OverallStarRating}
                      idBook={item.Id}
                    />
                  )}
                  numColumns={2}
                  // horizontal={2}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}
                name="tab2"
                tabLabel="Y??u th??ch">
                <Text
                  style={{
                    alignItems: 'center',
                    marginVertical: 20,
                    justifyContent: 'center',
                  }}>
                  Ch??a c?? s??? ki???n
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}
                name="tab3"
                tabLabel="T??ch ??i???m">
                <Text
                  style={{
                    alignItems: 'center',
                    marginVertical: 20,
                    justifyContent: 'center',
                  }}>
                  Ch??a c?? khuy???n m??i
                </Text>
              </View>
            </ScrollableTabView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  topbar: {
    paddingLeft: 15,
    paddingTop: 20.5,
    fontSize: 10.5,
    flexDirection: 'row',
    marginHorizontal: 10,
  },

  styleViewProfile: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: -80,
  },
  styleImageProfile: {
    width: '100%',
    height: 500,
  },
  list: {
    paddingTop: 5,
  },
  platinum: {
    flexDirection: 'row',
    flex: 3,
    backgroundColor: '#f7f3f7',
    borderRadius: 50,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewInfor: {
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  viewItemText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  viewCode: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 50,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPlatinum: {
    margin: 18,
    fontSize: 22,
  },
  viewIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 27,
    borderWidth: 1,
    height: 50,
    borderColor: '#c5c1c5',
  },
  iconButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    userData: state.user,
    book: state.bookReducer,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onLogOutUser: () => {
      dispatch(logOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
