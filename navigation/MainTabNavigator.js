import React from 'react';
import { Platform, View, Button, Text, StyleSheet} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WebScreen from '../screens/WebScreen';
import * as WebBrowser from 'expo-web-browser';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const openIRCAR = () => {
  WebBrowser.openBrowserAsync(
    'https://ulibrary.utp.edu.my/ircar/p1.html'
  );
}

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
    slug: 'remote',
    title: 'Remote Access',
    url: 'https://libguides.utp.edu.my/remoteaccess_app',
  },
  {
    slug: 'booking',
    title: 'Room Booking',
    url: 'https://ibest.utp.edu.my/reserve/discussionroom',
  },
  {
    slug: 'ill',
    title: 'Interlibrary Loan (ILL)',
    url: 'https://libguides.utp.edu.my/ircresearchsupport/ill',
  },
  {
    slug: 'appointment',
    title: 'Appointment with Librarian',
    url: 'https://ibest.utp.edu.my/appointments/',
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
    slug: 'faq',
    title: 'FAQ',
    url: 'https://libanswers.utp.edu.my',
  },
  {
    slug: 'chat',
    title: 'Live Chat',
    url: 'https://gateway.utp.edu.my/ioasis/chat.html',
  },
  {
    slug: 'feedback',
    title: 'Feedback',
    url: 'https://utp.libsurveys.com/ioasisurvey',
  }
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

const tabNavigator = createDrawerNavigator({
  Home: HomeStack,
  ...getScreens(ScreenUrls)
},
{
  contentComponent:(props) => (
      <ScrollView>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItems {...props} />
              <TouchableOpacity style={styles.drawerButton} onPress={openIRCAR}>
                <Text styles={styles.drawerText} >IRC AR</Text>
              </TouchableOpacity>
          </SafeAreaView>
      </ScrollView>
  ),
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  contentOptions: {
    labelStyle: {
      fontWeight: 'normal'
    }
  }
});

tabNavigator.path = '';

const styles = StyleSheet.create({
  drawerButton: {
    textAlign: 'left',
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingVertical: 15,
    color: 'red'
  },
  drawerText: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 30
  }
})

export default tabNavigator;
