import React, { useState, useContext } from 'react';
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
	ScrollView,
	useWindowDimensions,
} from 'react-native';

import { Button } from 'react-native-paper';

import Context from '../../Context';
import TransparentLogo from '../../assets/bill-gamble-logo-transparent.png';
import TrophySVG from '../../components/TrophySVG.js';
import QuestionMark from '../../components/QuestionMark.js';
import constantStyle from '../../constants/primeColors.js';
import InfoModal from './Views/InfoModal';

export default function Home({ navigation }) {
	const { setriskyLevel } = useContext(Context);
	const { scoreResults } = useContext(Context);
	const { allPlayerNames } = useContext(Context);

	const { width, height } = useWindowDimensions();
	console.log(height);

	const [showSavedScore, setShowSavedScore] = useState(false);
	const [showInformation, setShowInformation] = useState(false);

	function showOrHideScore() {
		if (showSavedScore) {
			return setShowSavedScore(false);
		}
		return setShowSavedScore(true);
	}

	function handleInfoModalVisibility(state) {
		return setShowInformation(state);
	}

	function renderAllPlayers() {
		if (allPlayerNames) {
			scoreResults;
			return allPlayerNames.map((players, i) => {
				players, 'test';
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
		<ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
			{showInformation && <InfoModal handleInfoModalVisibility={handleInfoModalVisibility} />}
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
					color={constantStyle.normalBannerColor}
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
					color={constantStyle.riskyBannerColor}
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
					onPress={() => setShowInformation(true)}
					style={{
						height: 'auto',
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

				{scoreResults.length > 0 && (
					<TouchableOpacity
						onPress={() => {
							return [showOrHideScore(), showSavedScore];
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
								return [showOrHideScore(), showSavedScore];
							}}
							style={{
								flex: 1,
								position: 'absolute',
								height: '80%',
								width: '82.5%',
								backgroundColor: '#98521F',
								backgroundColor: '#000',
								top: '4%',
								alignItems: 'center',
								alignSelf: 'center',
								paddingLeft: 17.5,
								paddingRight: 17.5,
								borderRadius: 12,
								elevation: Platform.OS === 'android' ? 101 : 0,
								borderWidth: 3,
								borderColor: 'orange',
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
			</SafeAreaView>
		</ScrollView>
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
		fontSize: 10.77,
	},
});
