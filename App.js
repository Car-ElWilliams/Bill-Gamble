import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Asset } from 'expo-asset';
import LoadingScreen from './components/LoadingScreen';
import Context from './Context';
import Home from './routes/Home.js';
import InputSelections from './routes/InputSelections';
import Chicken from './routes/Chicken';
import Results from './routes/Results';
import {
	useFonts,
	Montserrat_800ExtraBold,
	Montserrat_700Bold,
	Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator();

export default function App() {
	const [progressDone, setProgressDone] = useState(true);
	const [billValue, setBillValue] = useState(true);
	const [allPlayerNames, setAllPlayerNames] = useState('');
	const [riskyLevel, setriskyLevel] = useState('');

	let [fontsLoaded] = useFonts({
		Montserrat_800ExtraBold,
		Montserrat_700Bold,
		Montserrat_900Black_Italic,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<Context.Provider
				value={{
					progressDone,
					setProgressDone,
					billValue,
					setBillValue,
					allPlayerNames,
					setAllPlayerNames,
					riskyLevel,
					setriskyLevel,
				}}
			>
				<PaperProvider>
					<NavigationContainer>
						<Stack.Navigator screenOptions={{ headerShown: false }}>
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
							<Stack.Screen name='Chicken' component={Chicken} />
							<Stack.Screen name='Results' component={Results} />
							{/*{progressDone && <LoadingScreen />}*/}
							{/*{!progressDone && <Home />}*/}
							{/*<StatusBar style='auto' />*/}
						</Stack.Navigator>
					</NavigationContainer>
				</PaperProvider>
			</Context.Provider>
		);
	}
}
