import * as React from 'react';
import { View, useWindowDimensions,StyleSheet,Button, Text, SafeAreaView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import Calendar from './Calendar';

export default function App() {
  const layout = useWindowDimensions();

  const [result, setResult] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const FirstRoute = () => (
    <View style={ styles.tab1}>
      <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />
        <Text>{result && JSON.stringify(result)}</Text>
        <Calendar/>
    </View>
    
  );
  
  const SecondRoute = () => (
    <View style={ styles.tab2}>
      <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />
        <Text>{result && JSON.stringify(result)}</Text>
    </View>
  );
  
  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://expo.dev');
    setResult(result);
  };
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
      <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  tab1: {
    flex: 1, backgroundColor: '#ff4081'
  },
  tab2: {
    flex: 1, backgroundColor: '#ff4081'
  }
});