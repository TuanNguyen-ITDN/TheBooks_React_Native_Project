import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
  View,
  Textarea,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';

import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/thebook-appicon';
import {onSignIn} from '../../navigation';
import {connect} from 'react-redux';

var screen = Dimensions.get('window');

class UpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      star1: false,
      star2: false,
      star3: false,
      star4: false,
      star5: false,
      rank: '0',
      comment: '',
      userId: '',
      Id: '',
      idBook: '',
    };
  }

  showEditModal = (Id, userId, comment, starRating) => {
    let idBook = this.props.IdBook;
    this.refs.myModal.open();

    this.setState({
      Id: Id,
      idBook: idBook,
      userId: userId,
      rank: starRating,
      comment: comment,
    });
  };

  onResetStar = () => {
    this.setState({
      rank: '',
      star1: false,
      star2: false,
      star3: false,
      star4: false,
      star5: false,
    });
  };

  onClickStar1 = () => {
    this.onResetStar();
    this.setState({
      rank: 1,
      star1: true,
    });
  };

  onClickStar2 = () => {
    this.onResetStar();
    this.setState({
      rank: 2,
      star1: true,
      star2: true,
    });
  };
  onClickStar3 = () => {
    this.onResetStar();
    this.setState({
      rank: 3,
      star1: true,
      star2: true,
      star3: true,
    });
  };
  onClickStar4 = () => {
    this.onResetStar();
    this.setState({
      rank: 4,
      star1: true,
      star2: true,
      star3: true,
      star4: true,
    });
  };
  onClickStar5 = () => {
    this.onResetStar();
    this.setState({
      rank: 5,
      star1: true,
      star2: true,
      star3: true,
      star4: true,
      star5: true,
    });
  };

  onEditComment = () => {
    let {Id, idBook, userId, comment, rank} = this.state;
    if (comment === '') {
      alert('Nh???p n???i dung ????nh gi??');
    } else {
      var updateCommentData = {
        BookId: idBook,
        UserId: userId,
        Content: comment,
        StarRating: rank,
      };
      this.props.onUpdateComment(updateCommentData, Id);
      //   this.props.parentFlatList.refreshCommentList();
      this.refs.myModal.close();
    }
  };

  onCheck = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      if (parsed) {
        let UserId = parsed.Data.Id;
        await this.setState({
          userId: UserId,
        });
      }
    } catch (error) {
      alert('User: ', error);
    }
  };

  componentDidMount() {
    this.onCheck();
  }

  render() {
    const {star1, star2, star3, star4, star5} = this.state;
    // console.log(this.state);
    return (
      <Modal
        ref={'myModal'}
        style={style.styleModal}
        position="center"
        backdrop={true}>
        <Text style={style.styleTitle}>????nh gi??</Text>

        <View style={style.rank}>
          <TouchableWithoutFeedback onPress={this.onClickStar1}>
            <Icon
              name="star"
              size={30}
              style={
                star1 === true
                  ? style.colorStarActive
                  : style.colorStarDisActive
              }
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onClickStar2}>
            <Icon
              name="star"
              size={30}
              style={
                star2 === true
                  ? style.colorStarActive
                  : style.colorStarDisActive
              }
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onClickStar3}>
            <Icon
              name="star"
              size={30}
              style={
                star3 === true
                  ? style.colorStarActive
                  : style.colorStarDisActive
              }
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onClickStar4}>
            <Icon
              name="star"
              size={30}
              style={
                star4 === true
                  ? style.colorStarActive
                  : style.colorStarDisActive
              }
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onClickStar5}>
            <Icon
              name="star"
              size={30}
              style={
                star5 === true
                  ? style.colorStarActive
                  : style.colorStarDisActive
              }
            />
          </TouchableWithoutFeedback>
        </View>

        <View>
          <Text style={style.styleTitle}>B??nh lu???n </Text>
        </View>

        <TextInput
          style={style.textArea}
          underlineColorAndroid="transparent"
          placeholder="Nh???p n???i dung nh???n x??t ??? ????y ..."
          placeholderTextColor="grey"
          numberOfLines={3}
          multiline={true}
          value={this.state.comment}
          onChangeText={text => this.setState({comment: text})}
        />

        <TouchableWithoutFeedback onPress={this.onEditComment}>
          <Text style={style.styleButtonAdd}>G???i nh???n x??t</Text>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const style = StyleSheet.create({
  styleModal: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 40,
    width: screen.width - 80,
    height: 400,
  },
  styleTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  rank: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  styleButtonAdd: {
    fontSize: 18,
    color: 'white',
    padding: 10,
    height: 50,
    borderRadius: 6,
    backgroundColor: 'orange',
  },

  textArea: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 100,
    marginVertical: 20,
    width: 300,
  },
  colorStarDisActive: {
    color: '#979797',
  },
  colorStarActive: {
    color: '#fc9619',
  },
});

export default UpdateModal;
