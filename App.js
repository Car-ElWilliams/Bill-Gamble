import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingScreen from './components/LoadingScreen';
import Home from './screens/Home.js';
import Note from './screens/Note';
import Players from './screens/Players';
import Chicken from './screens/Chicken';
import Results from './screens/Results';
import Context from './Context';

import AppLoading from 'expo-app-loading';

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

const Stack = createStackNavigator();

export default function App() {
	const [progressDone, setProgressDone] = useState(true);
	const [billValue, setBillValue] = useState(true);
	const [allPlayerNames, setAllPlayerNames] = useState('');
	const [riskyLevel, setriskyLevel] = useState('');
	const [scoreResults, setScoreResults] = useState([]);

	let [isFontsLoaded] = useFonts({
		Montserrat_800ExtraBold,
		Montserrat_800ExtraBold_Italic,
		Montserrat_700Bold,
		Montserrat_700Bold_Italic,
		Montserrat_900Black_Italic,
		Montserrat_900Black,
		Montserrat_600SemiBold,
		Montserrat_600SemiBold_Italic,
	});

	if (!isFontsLoaded) {
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
							<Stack.Screen name='Home' component={Home} />
							<Stack.Screen name='Note' component={Note} />
							<Stack.Screen name='Players' component={Players} />
							<Stack.Screen name='Chicken' component={Chicken} />
							<Stack.Screen name='Results' component={Results} />
						</Stack.Navigator>
					</NavigationContainer>
				</PaperProvider>
			</Context.Provider>
		);
	}
}
