import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WebScreen from '../screens/WebScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

const ScreenUrls = [
  {
    slug: 'iscan',
    title: 'iScan Search Engine',
    url: 'https://mulibrary.utp.edu.my/search',
  },
  {
    slug: 'account',
    title: 'My Library Account',
    url: 'https://sierra-app.utp.edu.my/iii/cas/login?service=https%3A%2F%2Fmulibrary.utp.edu.my%3A443%2Fpatroninfo~S19%2FIIITICKET&scope=19',
  },
  {
    slug: 'database',
    title: 'A-Z Database List',
    url: 'https://libguides.utp.edu.my/az.php',
  },
  {
    slug: 'calendar',
    title: 'Calendar & Event',
    url: 'https://ibest.utp.edu.my/calendar/event/?cid=5413&t=d&d=0000-00-00&cal%5B%5D=5413',
  },
  {
    slug: 'enquiry',
    title: 'Enquiry',
    url: 'https://libanswers.utp.edu.my/ioasisfaq/',
  },
  {
    slug: 'remote',
    title: 'Remote Access',
    url: 'https://libguides.utp.edu.my/remoteaccess_app',
  },
  {
    slug: 'faq',
    title: 'FAQ',
    url: 'https://libanswers.utp.edu.my',
  },
  {
    slug: 'appointment',
    title: 'Appointment with Librarian',
    url: 'https://ibest.utp.edu.my/appointments/',
  },
  {
    slug: 'booking',
    title: 'Room Booking',
    url: 'https://ibest.utp.edu.my/reserve/discussionroom',
  },
  {
    slug: 'chat',
    title: 'Live Chat',
    url: 'https://gateway.utp.edu.my/ioasis/chat.html',
  },
  {
    slug: 'ill',
    title: 'Interlibrary Loan (ILL)',
    url: 'https://libguides.utp.edu.my/ircresearchsupport/ill',
  },
  {
    slug: 'feedback',
    title: 'Feedback',
    url: 'https://utp.libsurveys.com/ioasisurvey',
  },
]

const getScreens = (ScreenUrls) => {
  screens = {}
  ScreenUrls.forEach((screen) => {
    screens[screen.title] = {
      screen: (props) => (<WebScreen {...props} screenUrl={screen.url} />),
    }
  })
  return screens
}

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createDrawerNavigator({
  Home: HomeStack,
  ...getScreens(ScreenUrls)
});

tabNavigator.path = '';

export default tabNavigator;
