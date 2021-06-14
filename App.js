import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import LoadingScreen from './components/LoadingScreen.js';
export default function App() {
	return (
		<PaperProvider>
			<View style={styles.container}>
				<LoadingScreen />
				{/*<StatusBar style='auto' />*/}
			</View>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
