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
  Dimensions,
  Linking
} from 'react-native';

import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import HeaderNavigationBar from '../components/HeaderNavigationBar'
import SocialMedia from '../components/SocialMedia'

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
          {(this.state.openHours.length != 0) ? openHours : (<Text>Loading...</Text> )}
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
              <SocialMedia icon="logo-facebook" link={"https://www.facebook.com/IRCUTP"} size={30} color="white" />
              <SocialMedia icon="logo-instagram" link={"https://twitter.com/IRCUTP"} size={30} color="white" />
              <SocialMedia icon="logo-twitter" link={"https://instagram.com/ircutp"} size={30} color="white" />
            </View>
          </View>
        </View>
      </ScrollView>
      <ActionButton
        buttonColor="#FFF"
        onPress={() => this.props.navigation.navigate('Scanner') }
        renderIcon={() => (<Ionicons name={"md-qr-scanner"} size={30} color={'#004B85'} />)}
        shadowStyle={styles.fabShadow}
        fixNativeFeedbackRadius={true}
      />
      
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
    flexGrow: 1,
    backgroundColor: '#FFF',
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
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  footer: {
    paddingTop: 5,
    paddingBottom: 40,
    height: 120,
    maxHeight: 120,
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
  },
  fabShadow: {
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: '#000',
    shadowRadius: 3,
    elevation: 5,
  }
})
