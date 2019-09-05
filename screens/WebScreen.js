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

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

export default class WebScreen extends React.Component {
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