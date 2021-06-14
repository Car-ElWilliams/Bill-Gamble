import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoadingScreen from './components/LoadingScreen.js';
export default function App() {
	return (
		<View style={styles.container}>
			<LoadingScreen />
			{/*<StatusBar style='auto' />*/}
		</View>
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
