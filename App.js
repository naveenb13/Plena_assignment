import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Stacknavigator from './src/navigation/Stacknavigator';
import colors from './src/constants/colors';
import store from './src/store/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <View style={styles.container}>
          <Stacknavigator />
        </View >
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
});