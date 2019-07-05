import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/Colors';

const header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primaryColor,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase'
  }
});

export default header;
