import React from 'react';
import { View, Text, TouchableHighlight, Image, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigator } from 'react-navigation';
import Constants from 'expo-constants';

export default class HeaderNavigationBar extends React.Component {
  render() {
    return (<View style={{
      height: 60,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#004B85',
      color: 'white',
      marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
    }}>
      <TouchableHighlight style={{ marginLeft: 15 }}
        onPress={() => { this.props.navigation.openDrawer() }}>
        <Ionicons name="md-menu" size={40} color="white" />
        {/* <Image
            style={{ width: 32, height: 32 }}
            source={{uri: 'https://png.icons8.com/ios/2x/menu-filled.png'}}
        /> */}
      </TouchableHighlight>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{this.props.title} </Text>
      </View>
    </View>);
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})