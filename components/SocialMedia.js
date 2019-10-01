import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Linking} from 'react-native'

export default function SocialMedia(props) {
  return (
    <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => Linking.openURL(props.link)}>
      <Ionicons
        name={props.icon}
        size={props.size}
        color={props.color}
      />
    </TouchableOpacity>
  );
}
