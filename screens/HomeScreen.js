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

export default class HomeScreen extends React.Component {
  render() {
    return (
    <View style={styles.container}>
    <HeaderNavigationBar navigation={this.props.navigation} title="Home" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <WebView
        originWhitelist={['*']}
        source={{ uri: 'https://gateway.utp.edu.my/ioasis/ads.html' }}
        style={styles.newsWebView}
        />
        <View style={styles.openingHourContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Today's Opening Hour</Text>
          </View>
          <WebView
          originWhitelist={['*']}
          source={{ uri: 'https://gateway.utp.edu.my/ioasis/open.html' }}
          style={styles.openingHourWebView}
          />
        </View>
        
        <View style={styles.footerContainer}>
          <Image
            source={ require('../assets/images/footer.png') }
            style={styles.footerImage}
          />
          <View style={styles.footer}>
            <Text style={styles.footerText}>Information Resource Center</Text>
            <Text style={styles.footerText}>Universiti Teknologi Petronas</Text>
            <View style={styles.footerSocial}>
              <Ionicons style={styles.socialIcon} name="logo-facebook" size={30} color="white" />
              <Ionicons style={styles.socialIcon} name="logo-instagram" size={30} color="white" />
              <Ionicons style={styles.socialIcon} name="logo-twitter" size={30} color="white" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
  }
}

HomeScreen.navigationOptions = {
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
  newsWebView: {
    width: DEVICE_WIDTH,
    height: 200,
  },
  titleContainer: {
    width: DEVICE_WIDTH - 20,
    paddingVertical: 5,
    backgroundColor: "#004B85",
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: 'white',
    fontSize: 20,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  openingHourContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  openingHourWebView:{
    height: 100,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  footerContainer: {
  },
  footer: {
    paddingTop: 5,
    height: 100,
    backgroundColor: "#004B85",
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerImage: {
    backgroundColor: 'white',
    width: DEVICE_WIDTH,
    height: 120,
    resizeMode: 'cover',
  },
  footerText: {
    fontSize: 14,
    margin: 5,
    fontWeight: 'bold',
    color: 'white'
  },
  footerSocial: {
    marginTop: 5,
    flex:1,
    flexDirection: 'row',
  },
  socialIcon: {
    marginHorizontal: 10,
  }
})
