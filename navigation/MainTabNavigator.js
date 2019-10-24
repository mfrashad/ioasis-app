import React from 'react';
import { Platform, View, Button, Text, StyleSheet} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import WebScreen from '../screens/WebScreen';
import * as WebBrowser from 'expo-web-browser';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import QRScannerScreen from '../screens/QRScannerScreen';

import ScreenUrls from '../constants/ScreenUrls';

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
    Scanner: QRScannerScreen,
  },
  config
);

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
                <Text >IRC AR</Text>
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
  }
})

export default tabNavigator;
