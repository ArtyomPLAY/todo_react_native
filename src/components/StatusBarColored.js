import React from 'react';
import { Platform, View, StatusBar, StyleSheet } from 'react-native';
import colors from '../styles/Colors';

export default class StatusBarColored extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statusbar: {
        backgroundColor: this.props.bgColor || colors.primaryColor,
        height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
      }
    };
  }

  render() {
    return (
      <View style={this.state.statusbar}>
        <StatusBar translucent {...this.props} />
      </View>
    );
  }
}
