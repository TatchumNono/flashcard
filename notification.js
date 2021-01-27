import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Permissions } from 'react-native-unimodules';
import { Alert } from 'react-native';

const NOTIFICATION_KEY = 'Flashcards: notifications';

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  );
};

const createNotification = () => {
  return {
    title: 'Time to Study!',
    body: "👋 Don't forget to learn something new today!",
    android: {
      sound: true,
      priority: 'high',
      vibrate: true,
      sticky: false,
    },
  };
};

export const note = () => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Time's up!",
      body: 'Change sides!',
    },
    trigger: {
      seconds: 10,
    },
  });
};

export const setLocalNotification = () => {
  console.log('notification');
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status !== 'granted') {
            Alert.alert(
              'Access not allowed',
              'Please go to settings and enable permissions for this device',
              [
                { text: 'Cancel', onPress: () => console.log('cancel') },
                {
                  text: 'Allow',
                  //onPress: () => Linking.makeUrl('app-settings:'),
                },
              ],
              { cancelable: false }
            );
            return;
          }
          if (status === 'granted') {
            Notifications.cancelScheduledNotificationsAsync;

            Notifications.setNotificationHandler({
              handleNotification: async () => ({
                shouldPlaySound: true,
                shouldShowAlert: true,
                shouldSetBadge: false,
              }),
            });

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(19);
            tomorrow.setMinutes(20);

            Notifications.scheduleNotificationAsync({
              content: createNotification(),
              trigger: {
                hour: 19,
                minute: 20,
                repeats: true,
              },
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
};
