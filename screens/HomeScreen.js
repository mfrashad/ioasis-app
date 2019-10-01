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
  constructor(props) {
    super(props)
    this.state = {
      openHours: []
    }
  }

  fetchOpenHours = () => {
    fetch("https://api3-au.libcal.com/api_hours_today.php?iid=3715&lid=4612&format=json&systemTime=0")
      .then(response => response.json())
      .then(data => {
        this.setState({openHours: data.locations})
      })
      .catch(err => console.log(err))
  }

  renderOpenHours = () => {
    let openHours = []
    for(i=0; i<this.state.openHours.length; i++){
      openHours.push(
      <Text key={i} style={styles.openHoursText}>{this.state.openHours[i].name} | {this.state.openHours[i].times.status.toUpperCase()} | {this.state.openHours[i].rendered} </Text>
      )
    }
    return (
      <View style={styles.openingHourContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Today's Opening Hour</Text>
        </View>
        <View style={styles.openingHourTextContainer}>
          {openHours}
        </View>
      </View>
    )
  }

  componentDidMount() {
    this.fetchOpenHours()
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
        source={{ uri: 'https://gateway.utp.edu.my/ioasis/ads.html' }}
        style={styles.newsWebView}
        />
        {this.renderOpenHours()}
        <View style={styles.footerContainer}>
          <Image
            source={ require('../assets/images/footer.png') }
            style={styles.footerImage}
          />
          <View style={styles.footer}>
            <Text style={styles.footerText}>Information Resource Centre</Text>
            <Text style={styles.footerText}>Universiti Teknologi PETRONAS</Text>
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
  contentContainer: {
    paddingTop: 30,
  },
  openingHourContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  openingHourTextContainer: {
    paddingVertical: 10,
  },
  openHoursText: {
    fontSize: 14,
    textAlign: 'left'
  },
  openingHourWebView:{
    height: 100,
    width: DEVICE_WIDTH,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  navigationFilename: {
    marginTop: 5,
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
