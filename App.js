import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  KeyboardAvoidingView,
  AppState
} from 'react-native';
import StatusBarColored from './src/components/StatusBarColored';
import Header from './src/components/Header';
import InputBar from './src/components/InputBar';
import TodoItem from './src/components/TodoItem';
import store from './store';

import colors from './src/styles/Colors';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoInput: '',
      todos: [{}],
      appState: AppState.currentState
    };
  }

  addNewTodo() {
    if (this.state.todoInput !== '') {
      let todos = this.state.todos;

      let date = new Date();
      todos.unshift({
        id: todos.length + 1,
        title: this.state.todoInput,
        date_created: date.toLocaleString(),
        done: false
      });
      this.setState({ todos, todoInput: '' });
    }
  }

  async deleteTodo(todo) {
    let todos = this.state.todos;
    let id = todos.findIndex(item => item.id === todo.id);
    todos.splice(id, 1);
    this.setState({ todos });
  }

  doneTodo(todo) {
    let todos = this.state.todos;
    todos.map(item => {
      if (item.id === todo.id) item.done = !item.done;
      return item;
    });
    this.setState({ todos });
  }

  saveData() {
    let todos = this.state.todos;
    store.storeItem('todos', todos);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBarColored barStyle="light-content" />
        <Header title="Your tasks" />

        <FlatList
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text
                style={{
                  color: colors.white + '33',
                  fontSize: 20
                }}
              >
                Задач нет, создайте прямо сейчас!
              </Text>
            </View>
          }
          data={this.state.todos}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <TodoItem
                todoItem={item}
                deleteTodo={() => this.deleteTodo(item)}
                doneTodo={() => this.doneTodo(item)}
              />
            );
          }}
        />
        <KeyboardAvoidingView behavior="padding">
          <InputBar
            todoInput={this.state.todoInput}
            textChange={todoInput => this.setState({ todoInput })}
            addNewTodo={() => this.addNewTodo()}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }

  async componentDidMount() {
    const todos = await store.retrieveItem('todos');
    this.setState({ todos: todos || [] });
  }

  componentWillMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState == 'active' &&
      nextAppState.match(/background|inactive/)
    ) {
      this.saveData();
    }
    this.setState({ appState: nextAppState });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryText
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70
  }
});
