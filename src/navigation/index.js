import React from 'react';
import { Navigation } from 'react-native-navigation';
import App from '../../App';
import Home from '../screens/Home';

import Book from '../component/Book';
import Search from '../screens/Home/Search';
import ShowAllBook from '../screens/Home/ShowAllBook';

import Order from '../screens/Order';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import Intro from '../screens/Intro';
import Library from '../screens/Library';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Detail from '../screens/Home/Detail';
import ShoppingCard from '../screens/ShoppingCard';
import Filter from '../screens/Filter/Filter';
import Categories from '../screens/Filter/Categories';
import Sort from '../screens/Filter/Sort';
import iconPaper from '../../assets/images/paper_icon.jpg';
import iconNotification from '../../assets/images/notification_icon.png';
import iconLibrary from '../../assets/images/library_icon.jpg';
import books_icon from '../../assets/images/books_icon.png';
import profile_icon from '../../assets/images/profile_icon.png';

import { Provider } from 'react-redux';
import store from '../redux/store';

function ReduxProvider(Component) {
  return props => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

export default () => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: 'App',
        },
      },
    });
  });

  Navigation.registerComponent(
    'App',
    () => ReduxProvider(App),
    () => App,
  );

  Navigation.registerComponent(
    'Search',
    () => ReduxProvider(Search),
    () => Search,
  );

  Navigation.registerComponent(
    'Book',
    () => ReduxProvider(Book),
    () => Book,
  );

  Navigation.registerComponent(
    'ShowAllBook',
    () => ReduxProvider(ShowAllBook),
    () => ShowAllBook,
  );

  Navigation.registerComponent(
    'Intro',
    () => ReduxProvider(Intro),
    () => Intro,
  );

  Navigation.registerComponent(
    'Library',
    () => ReduxProvider(Library),
    () => Library,
  );

  Navigation.registerComponent(
    'Home',
    () => ReduxProvider(Home),
    () => Home,
  );

  Navigation.registerComponent(
    'Order',
    () => ReduxProvider(Order),
    () => Order,
  );

  Navigation.registerComponent(
    'Notification',
    () => ReduxProvider(Notification),
    () => Notification,
  );

  Navigation.registerComponent(
    'Profile',
    () => ReduxProvider(Profile),
    () => Profile,
  );

  Navigation.registerComponent(
    'SignIn',
    () => ReduxProvider(SignIn),
    () => SignIn,
  );

  Navigation.registerComponent(
    'SignUp',
    () => ReduxProvider(SignUp),
    () => SignUp,
  );

  Navigation.registerComponent(
    'Detail',
    () => ReduxProvider(Detail),
    () => Detail,
  );

  Navigation.registerComponent(
    'ShoppingCard',
    () => ReduxProvider(ShoppingCard),
    () => ShoppingCard,
  );

  Navigation.registerComponent('Filter', () => Filter);
  Navigation.registerComponent('Categories', () => Categories);
  Navigation.registerComponent('Sort', () => Sort);
};

export const onChangeIntoMainScreen = () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Home',
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
              options: {
                bottomTab: {
                  text: 'Home',
                  icon: books_icon,
                  testID: 'FIRST_TAB_BAR_BUTTON',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Order',
                    options: {
                      topBar: {
                        title: {
                          text: '',
                          alignment: 'center',
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Order',
                  icon: iconPaper,
                  testID: 'SECOND_TAB_BAR_BUTTON',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Notification',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Notification',
                  icon: iconNotification,
                  testID: 'THIRST_TAB_BAR_BUTTON',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Library',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Library',
                  icon: iconLibrary,
                  testID: 'FOUR_TAB_BAR_BUTTON',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Profile',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Profile',
                  icon: profile_icon,
                  testID: 'FOUR_TAB_BAR_BUTTON',
                },
              },
            },
          },
        ],
      },
    },
  });
};

export const onIntro = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Intro',
        options: {
          topBar: {
            title: {
              text: 'Intro',
              alignment: 'center',
            },
          },
        },
      },
    },
  });
};

export const onSignIn = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'SignIn',
        options: {
          topBar: {
            title: {
              text: 'SignIn',
              alignment: 'center',
            },
          },
        },
      },
    },
  });
};

export const onSignUp = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'SignUp',
        options: {
          topBar: {
            title: {
              text: 'SignUp',
              alignment: 'center',
            },
          },
        },
      },
    },
  });
};



