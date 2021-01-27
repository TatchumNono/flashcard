import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Modal, Portal, Card, Provider } from 'react-native-paper';
import FlipCard from 'react-native-flip-card';
import { clearLocalNotification } from '../notification';

const Quiz = ({ route, navigation }) => {
  const { cards } = route.params;
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [flip, setFlip] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = { backgroundColor: 'white', padding: 40 };

  React.useEffect(() => {
    clearLocalNotification();
    setQuestionNumber(cards.length);
  }, []);

  const correct = () => {
    setQuestionNumber((prev) => prev - 1);
    setScore((prev) => (prev == cards.length ? prev : prev + 1));
    setFlip((prev) => !prev);
    if (cards.length == count + 1) {
      setCount(count);
      showModal();
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const incorrect = () => {
    setScore((prev) => (prev == 0 ? 0 : prev - 1));
    setFlip((prev) => !prev);
    if (cards.length == count + 1) {
      setCount(count);
      showModal();
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const seeanswer = () => {
    setFlip(!flip);
  };

  const Restart = () => {
    hideModal();
    setQuestionNumber(cards.length);
    setCount(0);
    setScore(0);
  };

  const Goback = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {cards.length === 0 ? (
        <Text>
          Sorry you can't take a quiz because there is no card in this deck
        </Text>
      ) : (
        <FlipCard friction={6} flip={flip} clickable={false}>
          <Card style={styles.card}>
            <View>
              <Text style={styles.p}>{cards[count].question}</Text>
            </View>
            <View style={styles.buttons}>
              <Button onPress={seeanswer} title="See answer" />
            </View>
            <View style={styles.number}>
              <Text> {questionNumber} questions remaining!</Text>
            </View>
          </Card>
          <Card style={styles.card}>
            <View>
              <Text>{cards[count].answer}</Text>
            </View>
            <View style={styles.buttons}>
              <Button onPress={correct} title="Correct" />
            </View>
            <View style={styles.buttons}>
              <Button onPress={incorrect} title="InCorrect" />
            </View>
            <View style={styles.number}>
              <Text> {questionNumber} questions remaining!</Text>
            </View>
          </Card>
        </FlipCard>
      )}
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <Text>You finished the Quiz!</Text>
            <Text>
              You have a score of {score} / {cards.length}
            </Text>
            <View style={styles.buttons}>
              <Button onPress={Restart} title="Restart Quiz" />
            </View>
            <View style={styles.buttons}>
              <Button onPress={Goback} title="Go back to deck" />
            </View>
          </Modal>
        </Portal>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 300,
    height: 300,
    padding: 50,
    margin: 20,
  },
  p: {
    textAlign: 'center',
  },
  buttons: {
    margin: 10,
    paddingTop: 5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  number: {
    paddingTop: 40,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default Quiz;
