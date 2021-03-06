import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Input from '../../component/Input';
import {onSignIn} from '../../navigation';
import IconLogin from '../../../assets/images/Intro/slide1.png';
import {connect} from 'react-redux';
import {addUser} from '../../redux/userRedux/actions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      confirmPass: '',
      errorFirstName: '',
      errorLastName: '',
      errorEmail: '',
      errorPhoneNumber: '',
      errorPassword: '',
      errorConfirmPass: '',
    };
  }

  onRestart = () => {
    this.setState({
      errorFirstName: '',
      errorLastName: '',
      errorEmail: '',
      errorPhoneNumber: '',
      errorPassword: '',
      errorConfirmPass: '',
    });
  };

  onSignin = () => {
    onSignIn();
  };

  onHandleSubmit = event => {
    var {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPass,
    } = this.state;

    const formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    this.onRestart();

    if (firstName === '') {
      this.setState({errorFirstName: 'Enter first name!'});
    }
    if (lastName === '') {
      this.setState({errorLastName: 'Enter last name!'});
    }
    if (phoneNumber === '') {
      this.setState({errorPhoneNumber: 'Enter phone number!'});
    }
    if (isNaN(phoneNumber)) {
      this.setState({errorPhoneNumber: 'Phone number is not valid!'});
    }
    if (phoneNumber.length > 10) {
      this.setState({errorPhoneNumber: 'Phone number is not valid!'});
    }
    if (phoneNumber.length < 10) {
      this.setState({errorPhoneNumber: 'Phone number is not valid!'});
    }
    if (email === '') {
      this.setState({errorEmail: 'Enter email!'});
    }
    if (formatEmail.test(email) === false) {
      this.setState({errorEmail: 'Email is not valid!'});
    }

    if (password === '') {
      this.setState({errorPassword: 'Enter password!'});
    }
    if (password.length < 8) {
      this.setState({errorPassword: 'Password is not valid!'});
    }
    if (password.length > 64) {
      this.setState({errorPassword: 'Password is not valid!'});
    }
    if (confirmPass != password) {
      this.setState({errorConfirmPass: 'Password does not match!'});
    }

    const data = {
      FirstName: firstName,
      LastName: lastName,
      PhoneNumber: phoneNumber,
      Email: email,
      Password: password,
    };
    // console.log(this.state);
    this.props.register(data);
  };

  getData = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    var {
      errorFirstName,
      errorLastName,
      errorEmail,
      errorPhoneNumber,
      errorPassword,
      errorConfirmPass,
    } = this.state;

    return (
      <ScrollView orientation="vertical">
        <View style={style.styleViewImage}>
          <Image style={style.styleImage} source={IconLogin} />
        </View>
        <View style={style.container}>
          <Input
            getData={e => this.getData('firstName', e)}
            title="T??n ?????u ti??n *"
            placeholder="Nh???p t??n ?????u ti??n..."
            error={errorFirstName}
          />
          <Input
            getData={e => this.getData('lastName', e)}
            title="T??n cu???i *"
            placeholder="Nh???p t??n cu???i..."
            error={errorLastName}
          />
          <Input
            getData={e => this.getData('phoneNumber', e)}
            title="S??? ??i???n tho???i*"
            placeholder="Nh???p s??? ??i???n tho???i..."
            error={errorPhoneNumber}
            keyboardType="numeric"
          />
          <Input
            getData={e => this.getData('email', e)}
            title="Email*"
            placeholder="Nh???p email..."
            error={errorEmail}
          />
          <Input
            getData={e => this.getData('password', e)}
            title="M???t kh???u *"
            placeholder="Nh???p m???t kh???u..."
            error={errorPassword}
            returnKeyType="go"
            secureTextEntry={true}
            autoCorrect={false}
          />
          <Input
            getData={e => this.getData('confirmPass', e)}
            title="X??c nh???n m???t kh???u *"
            placeholder="X??c nh???n m???t kh???u ..."
            error={errorConfirmPass}
            returnKeyType="go"
            secureTextEntry={true}
            autoCorrect={false}
          />

          <View style={style.styleViewButton}>
            <TouchableWithoutFeedback onPress={this.onSignin}>
              <Text
                style={{
                  ...style.button,
                  backgroundColor: 'white',
                  borderColor: 'blue',
                  color: 'gray',
                }}>
                ????ng nh???p
              </Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.onHandleSubmit}>
              <Text
                style={{
                  ...style.button,
                  backgroundColor: '#2bb6f9',
                  borderColor: 'blue',
                  color: 'white',
                }}>
                ????ng k??
              </Text>
            </TouchableWithoutFeedback>
          </View>

          <View style={style.styleViewText}>
            <Text style={style.styleTextBottom}>
              B???ng vi???c x??c nh???n t???o t??i kho???n, b???n ???? ?????ng ?? v???i c??c
              <TouchableWithoutFeedback onPress={this.onLogIn}>
                <Text style={style.styleButtonCommit}>
                  {' '}
                  ??i???u kho???n quy ?????nh{' '}
                </Text>
              </TouchableWithoutFeedback>
              c???a ch??ng t??i
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  styleViewButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  styleViewText: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: 50,
    marginHorizontal: 20,
  },
  styleTextBottom: {
    fontSize: 17,
    color: 'gray',
    textAlign: 'center',
  },
  styleButtonCommit: {
    color: '#2bb6f9',
    fontWeight: 'bold',
    fontSize: 17,
  },
  container: {
    justifyContent: 'center',
    marginTop: 40,
  },
  textBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleSignUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1.5,
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'center',
    backgroundColor: '#2bb6f9',
    borderColor: 'blue',
    color: 'white',
    flex: 1,
    margin: 10,
  },
  styleViewImage: {
    flex: 2,
    margin: 3,
  },
  styleImage: {
    width: '100%',
    height: 300,
  },
});

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    register: data => dispatch(addUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
