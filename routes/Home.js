import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground, Animated } from 'react-native';
import { Button } from 'react-native-paper';
import Context from '../Context';

export default function Home({ navigation }) {
	useEffect(() => {
		abba();
	}, []);

	const [joke, setJoke] = useState('');

	const abba = async () => {
		try {
			let data = await fetch('https://api.chucknorris.io/jokes/random');
			let json = await data.json();
			setJoke(json.value);
		} catch {
			console.log(error.message);
		}
	};
	const { setriskyLevel } = useContext(Context);

	return (
		<View style={styles.HomeContainer}>
			<Text style={styles.Header}>Choose Risk Level</Text>
			<Button
				mode='contained'
				color='green'
				onPress={() => {
					return [
						navigation.navigate('InputSelections', {
							risky: false,
							bill: 'bill',
						}),
						setriskyLevel(false),
					];
				}}
			>
				Normal
			</Button>
			<Text>Chances of splitting the bill equally is much higher</Text>

			<Button
				mode='contained'
				color='red'
				onPress={() => {
					return [
						navigation.navigate('InputSelections', {
							risky: true,
							bill: 'bill',
						}),
						setriskyLevel(true),
					];
				}}
			>
				Risky
			</Button>
			<Text>For the greedy and the brave</Text>

			{/*Remove this after assignment:*/}
			<View style={styles.deleteMe}>
				<Text>{joke}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	HomeContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},
	Header: {
		fontSize: 50,
	},
	deleteMe: {
		marginTop: 100,
	},
});
