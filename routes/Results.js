import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Context from '../Context';

export default function Results({ navigation }) {
	//Todo shuffle array not rendering
	//Todo useEffect console.log makes values be seen without it nothing renders

	//? Variables
	const [countdownNumber, setCountdownNumber] = useState(3);

	const { allPlayerNames } = useContext(Context);
	const { billValue } = useContext(Context);
	const { riskyLevel } = useContext(Context);

	const [evenPay, setEvenPay] = useState(null);
	const [amountToPay, setAmountToPay] = useState([]);

	const [launchRiskyFunctions, setLaunchRiskyFunctions] = useState(false);
	const [launchNormalFunctions, setLaunchNormalFunctions] = useState(false);

	const [winner, setWinner] = useState(null);
	const [loser, setLoser] = useState(null);

	//!Functions
	matchPlayerWithPay();
	function matchPlayerWithPay() {
		let thePlayers = {};

		for (const [i, playerValue] of allPlayerNames.entries()) {
			//thePlayers = { ...playerValue[i], ...playerValue };

			let playerIndex = 'player' + i;

			Object.assign(thePlayers, { playerIndex: playerValue });
			console.log(thePlayers);
			console.log(i, playerValue, playerIndex);
		}
	}

	function sortPay() {
		const sortedArray = amountToPay.sort(function (a, b) {
			return a - b;
		});
		const lowestPay = sortedArray[0];
		const highestPay = sortedArray[amountToPay.length - 1];

		return sortedArray;
	}

	useEffect(() => {
		//console.log(amountToPay, evenPay);
		//console.log(amountToPay.reduce((a, b) => a + b, 0));
		//THis one is making the result appear
		sortPay();

		//console.log(Math.floor(Math.random() * (100 - 0)) / 100);
	}, [amountToPay, evenPay]);

	useEffect(() => {
		randomizeRiskyResults();
	}, [launchRiskyFunctions]);

	useEffect(() => {
		randomizeNormalResults();
	}, [launchNormalFunctions]);

	//Normal Mode

	function randomizeNormalResults() {
		const RandomPayOrEvenPay = Math.floor(Math.random() * 3) + 1;

		console.log('RandomPayOrEvenPay:', RandomPayOrEvenPay);

		if (RandomPayOrEvenPay === 1 || RandomPayOrEvenPay === 2) {
			return normalModeRandomPay();
		}
		//33% chance of splitting evenly
		return RiskyAndNormalEvenPay();
	}

	function RiskyAndNormalEvenPay() {
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

		console.log('howManyPlayers:', howManyPlayers);
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

	// Risky Mode

	function randomizeRiskyResults() {
		const RandomPayOrEvenPay = Math.floor(Math.random() * 101);

		console.log('RandomPayOrEvenPay:', RandomPayOrEvenPay);

		if (RandomPayOrEvenPay === 50) {
			//1% chance of splitting evenly
			return RiskyAndNormalEvenPay();
		}
		return riskyModeRandomPay();
	}

	function riskyModeRandomPay() {
		let randomDecimal = Math.floor(Math.random() * (100 - 0)) / 100;

		const howManyPlayers = allPlayerNames.length;

		let max = billValue;

		let player1;
		let player2;
		let player3;
		let player4;
		let player5;
		let player6;

		switch (howManyPlayers) {
			case 2:
				player1 = randomBetween(0, billValue);
				player2 = max - player1;
				setAmountToPay(shuffleArray([player1, player2]));

				break;

			case 3:
				player1 = randomBetween(0, billValue);
				player2 = randomBetween(0, billValue - player1);
				player3 = max - player1 - player2;
				setAmountToPay(shuffleArray([player1, player2, player3]));

				break;
			//Fix minus resuts below and above
			case 4:
				player1 = randomBetween(0, billValue);
				player2 = randomBetween(0, billValue - player1);
				player3 = randomBetween(0, billValue - player1 - player2);
				player4 = max - player1 - player2 - player3;
				setAmountToPay(shuffleArray([player1, player2, player3, player4]));

				break;

			case 5:
				player1 = randomBetween(0, billValue);
				player2 = randomBetween(0, billValue - player1);
				player3 = randomBetween(0, billValue - player1 - player2);
				player4 = randomBetween(0, billValue - player1 - player2 - player3);

				player5 = max - player1 - player2 - player3 - player4;
				setAmountToPay(shuffleArray([player1, player2, player3, player4, player5]));

				break;

			case 6:
				player1 = randomBetween(0, billValue);
				player2 = randomBetween(0, billValue - player1);
				player3 = randomBetween(0, billValue - player1 - player2);
				player4 = randomBetween(0, billValue - player1 - player2 - player3);
				player5 = randomBetween(0, billValue - player1 - player2 - player3 - player4);
				player6 = max - player1 - player2 - player3 - player4 - player5;
				setAmountToPay(shuffleArray([player1, player2, player3, player4, player5, player6]));

				break;

			default:
				break;
		}

		function shuffleArray(array) {
			//Fisher Yates Baby!

			console.log('array coming in', array);
			var currentIndex = array.length,
				randomIndex;
			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;
				[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
			}
			console.log('array coming out', array);
			return array;
		}

		function randomBetween(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
	}

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			setTimeout(() => {
				setCountdownNumber(2);
				setTimeout(() => {
					setCountdownNumber(1);
					setTimeout(() => {
						setCountdownNumber('GO');
						setTimeout(() => {
							setCountdownNumber(null);
							if (riskyLevel) {
								console.log('riskylevel');
								launchRiskyFunctions;
								setLaunchRiskyFunctions(true);
							} else {
								setLaunchNormalFunctions(true);
								console.log('normalLevel');
							}
						}, 500);
					}, 1000);
				}, 1000);
			}, 1000);
		}

		return () => {
			mounted = false;
		};
	}, []);

	return (
		<View style={styles.HomeContainer}>
			{countdownNumber !== null && <Text>{countdownNumber}</Text>}
			{countdownNumber === null && (
				<View>
					{allPlayerNames.map((player, i) => {
						return (
							<View key={player + i}>
								<Text>
									{player} will pay {amountToPay[i]}
								</Text>
							</View>
						);
					})}
				</View>
			)}
			{countdownNumber === null && (
				<Button onPress={() => navigation.navigate('Home')}>Home</Button>
			)}
		</View>
	);
}

const styles = StyleSheet.create({});
