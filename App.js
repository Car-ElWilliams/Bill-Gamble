import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import LoadingScreen from './components/LoadingScreen';
import Context from './Context';
import Home from './components/Home';

export default function App() {
	const [progressDone, setProgressDone] = useState(true);

	return (
		<Context.Provider value={{ progressDone, setProgressDone }}>
			<PaperProvider>
				<View style={styles.container}>
					{progressDone && <LoadingScreen />}
					{!progressDone && <Home />}
					{/*<StatusBar style='auto' />*/}
				</View>
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
