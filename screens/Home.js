import React, { useState, useEffect, useContext } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	SafeAreaView,
	Modal,
	Platform,
	TouchableOpacity,
	Dimensions,
	Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import Context from '../Context';
import TransparentLogo from '../assets/bill-gamble-logo-transparent.png';
import TrophySVG from '../components/TrophySVG.js';
import CashSVG from '../components/CashSVG.js';
import QuestionMark from '../components/QuestionMark.js';
import constantStyle from '../constants/primeColors.js';

export default function Home({ navigation }) {
	const { setriskyLevel } = useContext(Context);
	const { scoreResults } = useContext(Context);
	const { allPlayerNames } = useContext(Context);

	const [showSavedScore, setShowSavedScore] = useState(false);
	const [showInformation, setShowInformation] = useState(false);

	function showOrHideScore() {
		if (showSavedScore) {
			return setShowSavedScore(true);
		}
		return setShowSavedScore(false);
	}

	function showOrHideInformation() {
		if (showInformation) {
			return setShowInformation(false);
		}
		return setShowInformation(true);
	}

	function renderAllPlayers() {
		if (allPlayerNames) {
			console.log(scoreResults);
			return allPlayerNames.map((players, i) => {
				console.log(players, 'test');
				return (
					<View key={players + i}>
						<Text
							style={{
								color: 'white',
								fontSize: 20.2,
								fontFamily: 'Montserrat_600SemiBold',
								marginTop: 20,
								textAlign: 'center',
							}}
						>
							{players} pays <Text style={{ color: 'orange' }}>{scoreResults[i]}</Text>
						</Text>
					</View>
				);
			});
		}
	}

	return (
		<SafeAreaView
			style={{
				...styles.HomeContainer,
				backgroundColor: showInformation ? 'rgb(0,200,255)' : constantStyle.primaryThemeColor,
			}}
		>
			<ImageBackground source={TransparentLogo} style={styles.TransparentLogo}></ImageBackground>
			<Text style={styles.Header}>CHOOSE{'\n'} RISK LEVEL</Text>
			<Button
				style={styles.Buttons}
				labelStyle={styles.ButtonInnerText}
				mode='contained'
				color='#189615'
				onPress={() => {
					return [
						navigation.navigate('Note', {
							risky: false,
							bill: 'bill',
						}),
						setriskyLevel(false),
					];
				}}
			>
				<Text>Normal</Text>
			</Button>
			<Text style={styles.ButtonText}>Win less, lose less</Text>
			<Button
				style={styles.Buttons}
				labelStyle={styles.ButtonInnerText}
				mode='contained'
				color='#D00404'
				onPress={() => {
					return [
						navigation.navigate('Note', {
							risky: true,
							bill: 'bill',
						}),
						setriskyLevel(true),
					];
				}}
			>
				<Text>Risky</Text>
			</Button>
			<Text style={styles.ButtonText}>For the greedy and the brave</Text>
			<TouchableOpacity
				onPress={() => {
					showOrHideInformation();
				}}
				style={{
					height: 'auto',
					//backgroundColor: 'orange',
					borderColor: 'white',
					borderRadius: 50,
					width: TrophyLogoWidth,
					height: TrophyLogoHeight,
					position: 'absolute',
					right: 0,
					bottom: '0%',
				}}
			>
				<QuestionMark />
			</TouchableOpacity>

			{/*Modal Showing Informtion About The App*/}

			<Modal animationType='slide' visible={showInformation} transparent={true}>
				<View style={{ flex: 1, verticalAlign: 'center', alignItems: 'center' }}>
					<TouchableOpacity
						onPress={() => {
							[showOrHideInformation(), console.log('information:', showInformation)];
						}}
						style={{
							backgroundColor: 'rgb(0,200,255)',
							height: '100%',
							width: '100%',
							borderRadius: 15,
							padding: 15,
						}}
					>
						<View
							style={{
								flex: 2,
								flexDirection: 'column',
								alignItems: 'center',
								backgroundColor: 'yellow',
							}}
						>
							<Text
								style={{
									color: 'white',
									fontFamily: constantStyle.defaultFont,
									fontSize: 40,
									marginTop: '-5%',
									marginBottom: '10%',
								}}
							>
								Bill Gamble?
							</Text>
							<Text
								style={{
									color: 'white',
									fontFamily: constantStyle.defaultFont,
									fontSize: 13,
									textAlign: 'center',
								}}
							>
								Let’s say you had a great night out with your friends {'\n'} and you all decided to
								buy a pizza.
							</Text>
							<Text
								style={{
									color: 'white',
									fontFamily: constantStyle.defaultFont,
									fontSize: 13,
									textAlign: 'center',
								}}
							>
								Instead of splitting the bill you decide to use {'\n'}{' '}
								<Text style={{ fontFamily: 'Montserrat_800ExtraBold' }}>Bill Gamble</Text> and let
								chance decide how much each will pay!
							</Text>
						</View>
						<View
							style={{
								flex: 0,
								//backgroundColor: '#FFF, fontFamily: 'Montserrat_800ExtraBold'FFF',
								alignItems: 'center',
								flexDirection: 'row',
								justifyContent: 'center',
								height: '10%',
							}}
						>
							<View style={{ width: '15%', height: '70%' }}>
								<Image
									style={{ borderRadius: 12, maxWidth: '100%', maxHeight: '100%' }}
									//source={require('../assets/InfoAppIcon.png')}
									source={require('../assets/bill-gamble-icon-correct.png')}
								></Image>
							</View>
							<Text style={{ color: 'white', fontSize: 30, fontFamily: 'Montserrat_800ExtraBold' }}>
								{' '}
								+{' '}
							</Text>
							<View style={{ width: '15%', height: '35%' }}>
								<CashSVG />
							</View>
							<Text style={{ color: 'white', fontSize: 30, fontFamily: 'Montserrat_800ExtraBold' }}>
								{' '}
								={' '}
							</Text>
							<Text
								style={{
									color: 'rgb(255,184,0)',
									fontSize: 25,
									fontFamily: 'Montserrat_800ExtraBold',
								}}
							>
								EXCITING!
							</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text
								style={{
									color: 'white',
									fontFamily: constantStyle.defaultFont,
									fontSize: 40,
									marginBottom: '5%',
									textAlign: 'center',
								}}
							>
								Modes?
							</Text>
							<Text
								style={{
									color: 'white',
									fontFamily: constantStyle.defaultFont,
									fontSize: 13,
									textAlign: 'center',
								}}
							>
								Bill Gamble offers you two modes depending on how much everyone is willing to lose
							</Text>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'space-around',
							}}
						>
							<View
								style={{
									flex: 0,
									alignItems: 'center',
									width: '40%',
									height: '90%',
								}}
							>
								<Text
									style={{
										color: 'green',
										fontSize: 18,
										fontFamily: constantStyle.defaultFont,
									}}
								>
									Normal Mode
								</Text>
								<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
									<View
										style={{
											flex: 1,
											flexDirection: 'row',
											alignItems: 'center',
											width: '100%',
										}}
									>
										<Text
											style={{
												textAlign: 'center',
												fontSize: 30,
												color: 'green',
												alignItems: 'center',
												marginLeft: -10,
												paddingRight: 10,
											}}
										>
											{'\u2022'}
										</Text>
										<Text
											style={{
												textAlign: 'center',
												fontSize: 12,
												fontFamily: constantStyle.defaultFont,
												color: 'white',
												//height: '33%',
												width: '70%',
											}}
										>
											50% chance of splitting the bill
										</Text>
									</View>
									<View
										style={{
											flex: 1,
											flexDirection: 'row',
											alignItems: 'center',
											width: '100%',
										}}
									>
										<Text
											style={{
												textAlign: 'center',
												fontSize: 30,
												color: 'green',
												alignItems: 'center',
												marginLeft: -10,
												paddingRight: 10,
											}}
										>
											{'\u2022'}
										</Text>
										<Text
											style={{
												textAlign: 'center',
												fontSize: 12,
												fontFamily: constantStyle.defaultFont,
												color: 'white',
												width: '100%',
												textShadowColor: 'rgba(0, 0, 0, 0.25)',
												textShadowOffset: { width: 0, height: 1.5 },
												textShadowRadius: 2,
											}}
										>
											No chance of anyone {'\n'}paying everything
										</Text>
									</View>
								</View>
							</View>
							<View
								style={{
									flex: 0,
									alignItems: 'center',
									width: '40%',
									height: '90%',
								}}
							>
								<Text
									style={{
										color: 'red',
										fontSize: 18,
										fontFamily: constantStyle.defaultFont,
									}}
								>
									Risky Mode
								</Text>
								<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
									<View
										style={{
											flex: 1,
											flexDirection: 'row',
											alignItems: 'center',
											width: '100%',
										}}
									>
										<Text
											style={{
												textAlign: 'center',
												fontSize: 30,
												color: 'red',
												alignItems: 'center',
												marginLeft: -10,
												paddingRight: 10,
											}}
										>
											{'\u2022'}
										</Text>
										<Text
											style={{
												textAlign: 'center',
												fontSize: 12,
												fontFamily: constantStyle.defaultFont,
												color: 'white',
												//height: '33%',
												width: '70%',
											}}
										>
											1% chance of splitting the bill
										</Text>
									</View>
									<View
										style={{
											flex: 1,
											flexDirection: 'row',
											alignItems: 'center',
											width: '100%',
										}}
									>
										<Text
											style={{
												textAlign: 'center',
												fontSize: 30,
												color: 'red',
												alignItems: 'center',
												marginLeft: -10,
												paddingRight: 10,
											}}
										>
											{'\u2022'}
										</Text>
										<Text
											style={{
												textAlign: 'center',
												fontSize: 12,
												fontFamily: constantStyle.defaultFont,
												color: 'white',
												width: '85%',
											}}
										>
											One person can pay for everything
										</Text>
									</View>
								</View>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			</Modal>

			{scoreResults.length === 0 && (
				<TouchableOpacity
					onPress={() => {
						return [showOrHideScore(), console.log(showSavedScore)];
					}}
					style={{
						height: 'auto',
						backgroundColor: 'orange',
						borderColor: 'white',
						borderWidth: 1.25,
						borderRadius: 50,
						width: TrophyLogoWidth,
						height: TrophyLogoHeight,
						position: 'absolute',
						left: 15,
						bottom: '2%',
					}}
				>
					<TrophySVG style={{ width: 35, height: 35 }} />
				</TouchableOpacity>
			)}
			{showSavedScore && (
				<Modal animationType='slide' visible={showSavedScore} transparent={true}>
					<TouchableOpacity
						onPress={() => {
							return [showOrHideScore(), console.log(showSavedScore)];
						}}
						style={{
							flex: 1,
							position: 'absolute',
							height: '80%',
							width: '82.5%',
							backgroundColor: '#98521F',
							top: '4%',
							alignItems: 'center',
							alignSelf: 'center',
							paddingLeft: 17.5,
							paddingRight: 17.5,
							borderRadius: 12,
							elevation: Platform.OS === 'android' ? 101 : 0,
							borderWidth: 3,
							borderColor: '#FAA500',
						}}
					>
						<Text
							style={{
								color: 'white',
								fontSize: 30,
								fontFamily: 'Montserrat_700Bold',
								marginTop: 20,
								marginBottom: '-20%',
								textDecorationLine: 'underline',
							}}
						>
							Score Results
						</Text>
						<View style={{ flex: 1, justifyContent: 'center' }}>{renderAllPlayers()}</View>
					</TouchableOpacity>
				</Modal>
			)}
			{/*<Ads />*/}
		</SafeAreaView>
	);
}

let TextSizeHeader;
let TransparentLogoMarginTop;
let TrophyLogoHeight;
let TrophyLogoWidth;

if (Dimensions.get('window').height > 640) {
	TextSizeHeader = 40;
	TransparentLogoMarginTop = -10;
	TrophyLogoHeight = 80;
	TrophyLogoWidth = 80;
}
if (Dimensions.get('window').height <= 640) {
	TextSizeHeader = 34;
	TransparentLogoMarginTop = -40;
	TrophyLogoHeight = 65;
	TrophyLogoWidth = 65;
}

const styles = StyleSheet.create({
	HomeContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		//opacity: 0,

		backgroundColor: constantStyle.primaryThemeColor,
	},

	TransparentLogo: {
		width: 110,
		height: 110,
		alignSelf: 'center',
		marginTop: TransparentLogoMarginTop,
	},
	Header: {
		marginTop: 15,
		marginBottom: 75,
		fontSize: TextSizeHeader,
		color: '#fff',
		fontFamily: 'Montserrat_800ExtraBold',
		textAlign: 'center',
	},

	Buttons: {
		width: '60%',
		borderColor: '#fff',
		borderWidth: 2,
		borderRadius: 60,
		position: 'relative',
		zIndex: 2,
	},
	ButtonInnerText: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16,
		padding: '4.5%',
	},
	ButtonText: {
		color: '#fff',
		fontFamily: 'Montserrat_700Bold',
		marginTop: 10,
		marginBottom: 30,
		fontSize: 10,
	},
});
