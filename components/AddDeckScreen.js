import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import * as api from '../_DATA';

const AddDeckScreen = ({ navigation }) => {
  const [title, setTitle] = React.useState('');
  const isFocused = useIsFocused();

  React.useEffect(() => {
    isFocused ? setTitle('') : setTitle(title);
  }, [isFocused]);

  const showAlert = () =>
    Alert.alert(
      'No Title',
      'Your Deck has no title?, Input one first',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );

  const SaveDeck = () => {
    if (title === '') {
      showAlert();
    } else {
      api.saveDeck(title);
      setTimeout(() => {
        navigation.navigate('Deck', { id: title });
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text>What is the Title of Your Deck</Text>
      <TextInput
        style={styles.field}
        label="Deck Name"
        mode="flat"
        value={title}
        onChangeText={(title) => setTitle(title)}
      />
      <Button mode="contained" onPress={SaveDeck}>
        Create Deck
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 50,
  },
  field: {
    width: 200,
  },
});

export default AddDeckScreen;
