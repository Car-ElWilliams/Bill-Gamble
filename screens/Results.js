import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Context from '../Context';

export default function Results({ navigation }) {
	//? Variables
	const [countdownNumber, setCountdownNumber] = useState(3);

	const { allPlayerNames } = useContext(Context);
	const { billValue } = useContext(Context);
	const { riskyLevel } = useContext(Context);
	const { setScoreResults } = useContext(Context);

	const [amountToPay, setAmountToPay] = useState([]);
	const [split, setSplit] = useState(false);

	const [winner, setWinner] = useState('');
	const [loser, setLoser] = useState('');
	const [playerColor, setPlayerColor] = useState('white');

	//!Functions

	useEffect(() => {
		if (riskyLevel) {
			randomizeRiskyResults();
		}
	}, []);

	useEffect(() => {
		if (!riskyLevel) {
			randomizeNormalResults();
		}
	}, []);

	useEffect(() => {
		const belowZero = currentValue => currentValue >= 0;
		amountToPay.every(belowZero);
		if (amountToPay.every(belowZero) === false) {
			if (riskyLevel) {
				('negative value was removed');
				randomizeRiskyResults();
			} else if (!riskyLevel) {
				('negative value was removed');
				randomizeNormalResults();
			}
		} else {
			setScoreResults(amountToPay);
		}
	}, [setAmountToPay, amountToPay]);

	useEffect(() => {
		if (split === true) {
			setWinner('split'), setLoser('split');
		} else {
			findWinner(), findLoser();
		}
	}, [amountToPay]);

	//Normal Mode

	function randomizeNormalResults() {
		const RandomPayOrEvenPay = Math.floor(Math.random() * 2) + 1;

		'RandomPayOrEvenPay:', RandomPayOrEvenPay;

		if (RandomPayOrEvenPay === 1) {
			return [normalModeRandomPay(), setSplit(false)];
		}
		//50% chance of splitting evenly
		return [RiskyAndNormalEvenPay(), setSplit(true)];
	}

	function RiskyAndNormalEvenPay() {
		function round(value, decimals) {
			return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
		}

		let amountArray = [];
		const playerAmount = allPlayerNames.length;
		const split = round(billValue / playerAmount, 2);

		for (let i = 0; i < playerAmount; i++) {
			amountArray.push(split);
		}
		setAmountToPay(amountArray);

		//Reset no winner loser
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

		//(Math.floor((0.8 / howManyPlayers) * billValue));

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

		'RandomPayOrEvenPay:', RandomPayOrEvenPay;

		if (RandomPayOrEvenPay === 50) {
			//1% chance of splitting evenly
			return [RiskyAndNormalEvenPay(), setSplit(true)];
		}
		return [riskyModeRandomPay(), setSplit(false)];
	}

	function riskyModeRandomPay() {
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

				//setTimeout(function () {
				//	('setScore', scoreResults, amountToPay);
				//}, 1000);
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

			//('array coming in', array);
			var currentIndex = array.length,
				randomIndex;
			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;
				[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
			}
			//('array coming out', array);
			return array;
		}

		function randomBetween(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
	}

	//TODO check validator for multiple winners

	function findLoser() {
		let foundLoserIndex = null;
		let currentValue = amountToPay[0];
		for (let i = 0; i < amountToPay.length; i++) {
			if (amountToPay[i] >= currentValue) {
				currentValue = amountToPay[i];
				foundLoserIndex = i;
			}
		}

		return setLoser(allPlayerNames[foundLoserIndex]);
	}

	function findWinner() {
		let foundWinnerIndex = null;
		let currentValue = amountToPay[0];

		for (let i = 0; i <= amountToPay.length; i++) {
			if (amountToPay[i] <= currentValue) {
				currentValue = amountToPay[i];
				foundWinnerIndex = i;
			}
		}
		return setWinner(allPlayerNames[foundWinnerIndex]);
	}
	useEffect(() => {
		'WINNER CHANGED TO ', winner, 'LOSER CHANGED TO', loser;
	}, [winner, setWinner, loser, setLoser]);

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
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}
		>
			{countdownNumber !== null && <Text style={styles.CountdownText}>{countdownNumber}</Text>}
			{countdownNumber === null && (
				<View style={styles.HomeContainer}>
					<View style={styles.HeaderContainer}>
						<Text style={styles.Header}>Results</Text>
					</View>
					<View style={styles.PlayerContainer}>
						{allPlayerNames.map((player, i) => {
							let playerID = player + i;

							return (
								<View key={playerID}>
									{loser === player && winner !== 'split ' && (
										<View>
											<Text style={{ ...styles.PlayerText, color: 'red' }}>
												{player} will pay <Text style={{ color: 'red' }}>{amountToPay[i]}</Text>
											</Text>
										</View>
									)}
									{winner === player && winner !== 'split ' && (
										<View>
											<Text style={{ ...styles.PlayerText, color: 'green' }}>
												{player} will pay <Text style={{ color: 'green' }}>{amountToPay[i]}</Text>
											</Text>
										</View>
									)}

									{loser === 'split' && winner === 'split' && (
										<Text style={{ ...styles.PlayerText, color: 'yellow' }}>
											{player} <Text style={{ color: 'white' }}>will pay</Text>{' '}
											<Text style={{ color: 'yellow' }}> {amountToPay[i]}</Text>
										</Text>
									)}

									{loser !== player &&
										winner !== player &&
										loser !== 'split' &&
										winner !== 'split' && (
											<Text style={styles.PlayerText}>
												{player} will pay{' '}
												<Text style={{ color: playerColor }}>{amountToPay[i]}</Text>
											</Text>
										)}
								</View>
							);
						})}
					</View>
				</View>
			)}
			{countdownNumber === null && (
				<Button style={styles.EndButton} onPress={() => navigation.navigate('Home')}>
					<Text style={styles.EndButtonText}>End</Text>
				</Button>
			)}
			{countdownNumber === null && (
				<Text
					style={{
						...styles.Header,
						fontSize: 12,
						fontFamily: 'Montserrat_700Bold_Italic',
						marginBottom: 20,
						textDecorationLine: 'none',
					}}
				>
					Scores are found in the home menu
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	HomeContainer: {
		flex: 1,
		flexDirection: 'column',
	},
	CountdownText: {
		color: '#fff',
		alignSelf: 'center',
		fontSize: 50,
		fontFamily: 'Montserrat_700Bold',
	},

	HeaderContainer: {
		height: 23,
		marginTop: 45,
		marginBottom: 45,
	},
	Header: {
		color: '#fff',
		fontSize: 55,
		fontFamily: 'Montserrat_700Bold',
		justifyContent: 'center',
		alignSelf: 'center',
		textDecorationLine: 'underline',
	},

	PlayerContainer: {
		flex: 2,
		//flexWrap: 'wrap',
		flexGrow: 1,
		justifyContent: 'center',
		alignSelf: 'center',
		width: '100%',
	},

	PlayerText: {
		color: '#fff',
		fontSize: 20,
		fontFamily: 'Montserrat_700Bold',
		textAlign: 'center',
		marginBottom: 20,
	},
	EndButton: {
		backgroundColor: 'red',
		borderRadius: 30,
		width: '60%',
		marginBottom: 12,
	},
	EndButtonText: {
		color: '#fff',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 20,
	},
});
