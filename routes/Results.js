import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Context from '../Context';

export default function Results({ navigation }) {
	//? Variables
	const [countdownNumber, setCountdownNumber] = useState(3);

	const { allPlayerNames, setAllPlayerNames } = useContext(Context);
	const { billValue, setBillValue } = useContext(Context);

	const [evenPay, setEvenPay] = useState(null);
	const [amountToPay, setAmountToPay] = useState([]);

	//!Functions

	useEffect(() => {
		console.log(amountToPay, evenPay);
		console.log(amountToPay.reduce((a, b) => a + b, 0));
	}, [amountToPay, evenPay]);

	function randomizeNormalResults() {
		const RandomPayOrEvenPay = Math.floor(Math.random() * 3) + 1;

		console.log('RandomPayOrEvenPay:', RandomPayOrEvenPay);

		if (RandomPayOrEvenPay === 1 || RandomPayOrEvenPay === 2) {
			//66% chance of splitting evenly
			return normalModeRandomPay();
		}
		return normalModeEvenPay();
	}

	function normalModeEvenPay() {
		const playerAmount = allPlayerNames.length;
		const split = billValue / playerAmount;

		setEvenPay(split);

		return evenPay;
	}

	function normalModeRandomPay() {
		const howManyPlayers = allPlayerNames.length;

		let max = billValue;

		let player1;
		let player2;
		let player3;
		let player4;
		let player5;
		let player6;

		console.log('howManyPlayers', howManyPlayers);
		console.log(Math.floor((0.8 / howManyPlayers) * billValue));

		switch (howManyPlayers) {
			case 2:
				player1 = randomBetween(0.4 * billValue, 0.6 * billValue);
				player2 = max - player1;
				setAmountToPay([player1, player2]);

				break;

			case 3:
				player1 = randomBetween(0.23 * billValue, 0.43 * billValue);
				player2 = randomBetween(0.23 * billValue, 0.43 * billValue);
				player3 = billValue - player1 - player2;
				setAmountToPay([player1, player2, player3]);

				break;

			case 4:
				player1 = randomBetween(0.15 * billValue, 0.35 * billValue);
				player2 = randomBetween(0.15 * billValue, 0.35 * billValue);
				player3 = randomBetween(0.15 * billValue, 0.35 * billValue);
				player4 = max - player1 - player2 - player3;
				setAmountToPay([player1, player2, player3, player4]);

				break;

			case 5:
				player1 = randomBetween(0.1 * billValue, 0.3 * billValue);
				player2 = randomBetween(0.1 * billValue, 0.3 * billValue);
				player3 = randomBetween(0.1 * billValue, 0.3 * billValue);
				player4 = randomBetween(0.1 * billValue, 0.3 * billValue);
				player5 = max - player1 - player2 - player3 - player4;
				setAmountToPay([player1, player2, player3, player4, player5]);

				break;

			case 6:
				player1 = randomBetween(0.06 * billValue, 0.26 * billValue);
				player2 = randomBetween(0.06 * billValue, 0.26 * billValue);
				player3 = randomBetween(0.06 * billValue, 0.26 * billValue);
				player4 = randomBetween(0.06 * billValue, 0.26 * billValue);
				player5 = randomBetween(0.06 * billValue, 0.26 * billValue);
				player6 = max - player1 - player2 - player3 - player4 - player5;
				setAmountToPay([player1, player2, player3, player4, player5, player6]);

				break;

			default:
				break;
		}

		function randomBetween(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
	}

	useEffect(() => {
		setTimeout(() => {
			setCountdownNumber(2);
			setTimeout(() => {
				setCountdownNumber(1);
				setTimeout(() => {
					setCountdownNumber('GO');
					setTimeout(() => {
						setCountdownNumber(null);
						randomizeNormalResults();
					}, 500);
				}, 1000);
			}, 1000);
		}, 1000);
	}, []);

	return (
		<View style={styles.HomeContainer}>
			{countdownNumber !== null && <Text>{countdownNumber}</Text>}
			{countdownNumber === null && (
				<View>
					<Text>Results</Text>
				</View>
			)}

			<Button onPress={() => navigation.navigate('Home')}>Home</Button>
		</View>
	);
}

const styles = StyleSheet.create({});
