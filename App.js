import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './components/LoadingScreen';
import Context from './Context';
import Home from './routes/Home.js';
import InputSelections from './routes/InputSelections';

const Stack = createStackNavigator();

export default function App() {
	const [progressDone, setProgressDone] = useState(true);
	const [billValue, setBillValue] = useState(true);

	return (
		<Context.Provider value={{ progressDone, setProgressDone, billValue, setBillValue }}>
			<PaperProvider>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{ headerShown: true }}>
						{/*<View style={styles.container}>*/}
						{progressDone && <Stack.Screen name='LoadingScreen' component={LoadingScreen} />}
						<Stack.Screen
							name='Home'
							component={Home}
							//options={{
							//	title: 'My home',
							//	headerStyle: { backgroundColor: 'red', display: 'none' },
							//	headerTintColor: '#fff',
							//	headerTitleStyle: {
							//		fontWeight: 'bold',
							//		fontSize: 25,
							//	},
							//}}
						/>
						<Stack.Screen name='InputSelections' component={InputSelections} />
						{/*{progressDone && <LoadingScreen />}*/}
						{/*{!progressDone && <Home />}*/}
						{/*<StatusBar style='auto' />*/}
						{/*</View>*/}
					</Stack.Navigator>
				</NavigationContainer>
			</PaperProvider>
		</Context.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		flexDirection: 'column',
		alignItems: 'center',
	},
});
