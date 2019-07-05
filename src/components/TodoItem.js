import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Button
} from 'react-native';
import colors from '../styles/Colors';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const todoItem = this.props.todoItem;

    const color = todoItem.done ? colors.white + '1A' : colors.white;

    let text = {
      fontSize: 22,
      color: color,
      textDecorationLine: todoItem.done ? 'line-through' : 'none'
    };

    let btn_delete = (
      <TouchableNativeFeedback onPress={this.props.deleteTodo}>
        <View style={styles.btn_delete}>
          <Text>❌</Text>
        </View>
      </TouchableNativeFeedback>
    );

    return (
      <TouchableNativeFeedback onPress={this.props.doneTodo}>
        <View style={styles.todoItem}>
          <View style={styles.todoItem_inner}>
            <Text style={text}>{todoItem.title}</Text>
            <Text style={{ color: colors.white + '1A' }}>
              {todoItem.date_created}
            </Text>
          </View>
          {btn_delete}
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  todoItem: {
    width: '100%',
    borderBottomColor: colors.primaryColor + '1A',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 5
  },
  todoItem_inner: {
    flex: 1,
    height: 50,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  btn_delete: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    marginRight: -15,
    marginVertical: -5
  }
});
