import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as api from '../_DATA';

function AddCard({ route, navigation }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { id } = route.params;

  const Submit = () => {
    let card = {
      question: question,
      answer: answer,
    };
    console.log(card);
    api.saveCard(id, card);
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text>What is your question</Text>
      <TextInput
        style={styles.field}
        label="Question"
        mode="flat"
        value={question}
        onChangeText={(question) => setQuestion(question)}
      />
      <TextInput
        style={styles.field}
        label="answer"
        mode="flat"
        value={answer}
        onChangeText={(answer) => setAnswer(answer)}
      />
      <Button mode="contained" onPress={Submit}>
        ADD
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  field: {
    width: 200,
  },
});

export default AddCard;
