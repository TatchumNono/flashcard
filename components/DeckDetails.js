import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Title } from 'react-native-paper';
import * as api from '../_DATA';

const DeckDetails = ({ route, navigation }) => {
  const [card, setCard] = useState(null);
  const [title, setTitle] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { id } = route.params;

  useEffect(() => {
    setTimeout(() => {
      api.getDeck(id).then((res) => {
        setCard(res);
        setTitle(res.title);
        setDisabled(false);
        console.log(res);
      });
    }, 1000);
  }, [id]);

  console.log(id);

  const Delete = () => {
    setTitle(title);
    console.log(title);
    api.deleteDeck(title);
    setTimeout(() => {
      navigation.navigate('Home');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title>{card == null ? id : card.title}</Title>
        <Text>{card == null ? 0 : card.cards.length} cards</Text>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigation.navigate('Add', { id: card.title })}
          title="Add Card"
          disabled={disabled}
        />
        <Text> </Text>
        <Button
          onPress={() => navigation.navigate('Quiz', { cards: card.cards })}
          title="Start Quiz"
          disabled={disabled}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          color="grey"
          onPress={Delete}
          title="Delete Deck"
          disabled={disabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    margin: 10,
  },
  buttons: {
    margin: 5,
    paddingTop: 5,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default DeckDetails;
