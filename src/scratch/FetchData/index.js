import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';

export default class FetchData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    };
  }

  async componentDidMount() {
    return await fetch(
      'https://entropiya-api.herokuapp.com/api/quiz/questions?amount=3&chapter=151&difficulty=1',
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          isLoading: false,
          dataSource: res,
        });

        // console.log(this.state.dataSource[0].title);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {this.state.dataSource.map((item, key) => (
          <View key={key}>
            <Text>{`Question: ${item.question}`}</Text>
            <Text>{`Correct answer: ${item.correct_answer}`}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
