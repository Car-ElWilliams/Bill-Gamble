import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Audio } from 'expo-av';

export default function Chicken({ navigation }) {
	const [chickenSound, setChickenSound] = useState(false);

	useEffect(() => {
		return chickenSound
			? () => {
					console.log('Unloading Sound');
					chickenSound.unloadAsync();
			  }
			: undefined;
	}, []);

	//! Functions

	async function playSound() {
		console.log('Loading Sound');
		const { sound } = await Audio.Sound.createAsync(
			require('../assets/Chicken-www.fesliyanstudios.com.mp3')
		);
		setChickenSound(sound);
		console.log('Playing Sound');
		await sound.playAsync();
	}

	return (
		<View style={styles.HomeContainer}>
			<Button onPress={() => navigation.navigate('Results')}>Let's go</Button>
			<Button
				onPress={() => {
					return [navigation.navigate('Home'), playSound()];
				}}
			>
				Chicken out🐔
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({});
