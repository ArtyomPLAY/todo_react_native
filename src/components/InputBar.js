import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import colors from '../styles/Colors';

const InputBar = props => {
  TouchableNativeFeedback.Ripple({ color: 'red', borderless: false });
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={props.todoInput}
        onChangeText={todoInput => props.textChange(todoInput)}
      />
      <TouchableNativeFeedback onPress={props.addNewTodo}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>ADD</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    flex: 1,
    fontSize: 20,
    height: 45,
    padding: 10,
    color: colors.white,
    backgroundColor: colors.white + '1A'
  },
  button: {
    width: 100,
    backgroundColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: colors.primaryText,
    fontSize: 20,
    fontWeight: '700'
  }
});

export default InputBar;
