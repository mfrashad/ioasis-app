import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { MonoText } from '../components/StyledText';
import HeaderNavigationBar from '../components/HeaderNavigationBar'
import * as Permissions from 'expo-permissions';

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

async function getCameraAsync() {
  // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
  const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA);
  if (status === 'granted') {
    alert('Camera Access granted')
  } else {
    throw new Error('Location permission not granted');
  }
}

export default class WebScreen extends React.Component {
  componentDidMount() {
    getCameraAsync()
  }

  render() {
    return (
    <View style={styles.container}>
    <HeaderNavigationBar navigation={this.props.navigation} title="Home" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <WebView
        originWhitelist={['*']}
        source={{ uri: this.props.screenUrl }}
        style={styles.webView}
        />
      </ScrollView>
    </View>
  );
  }
}

WebScreen.navigationOptions = {
  header: null,
};
function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webView: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
  contentContainer: {
    paddingTop: 30,
  },
})
