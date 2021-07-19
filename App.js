import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Asset } from 'expo-asset';
import LoadingScreen from './components/LoadingScreen';
import Context from './Context';
import Home from './routes/Home.js';
import Note from './routes/Note';
import Players from './routes/Players';
import Chicken from './routes/Chicken';
import Results from './routes/Results';

import {
	useFonts,
	Montserrat_800ExtraBold,
	Montserrat_800ExtraBold_Italic,
	Montserrat_700Bold,
	Montserrat_700Bold_Italic,
	Montserrat_600SemiBold,
	Montserrat_600SemiBold_Italic,
	Montserrat_900Black_Italic,
	Montserrat_900Black,
} from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator();

export default function App() {
	const [progressDone, setProgressDone] = useState(true);
	const [billValue, setBillValue] = useState(true);
	const [allPlayerNames, setAllPlayerNames] = useState('');
	const [riskyLevel, setriskyLevel] = useState('');
	const [scoreResults, setScoreResults] = useState([]);

	let [fontsLoaded] = useFonts({
		Montserrat_800ExtraBold,
		Montserrat_800ExtraBold_Italic,
		Montserrat_700Bold,
		Montserrat_700Bold_Italic,
		Montserrat_900Black_Italic,
		Montserrat_900Black,
		Montserrat_600SemiBold,
		Montserrat_600SemiBold_Italic,
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
					scoreResults,
					setScoreResults,
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
							<Stack.Screen name='Note' component={Note} />
							<Stack.Screen name='Players' component={Players} />
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
