import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';
import * as api from '../_DATA';

const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [decks, setDecks] = React.useState(null);

  React.useEffect(() => {
    isFocused
      ? api.getDecks().then((res) => {
          setDecks(res);
          console.log(res);
        })
      : console.log('unFocused');
  }, [isFocused]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {decks === null || Object.keys(decks).length == 0 ? (
          <View style={styles.container}>
            <Text>No decks create one</Text>
          </View>
        ) : (
          Object.keys(decks).map((key) => (
            <TouchableOpacity
              key={decks[key].id}
              onPress={() =>
                navigation.navigate('Deck', { id: decks[key].title })
              }>
              <View>
                <Card key={decks[key].id} style={styles.card}>
                  <Card.Content key={decks[key].id}>
                    <Title key={decks[key].id}>{decks[key].title}</Title>
                    <Paragraph>{decks[key].cards.length} cards</Paragraph>
                  </Card.Content>
                </Card>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 200,
    height: 200,
    margin: 10,
    paddingTop: 30,
  },
});

export default HomeScreen;
