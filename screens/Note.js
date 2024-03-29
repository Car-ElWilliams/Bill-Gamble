import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { render } from 'react-dom';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	SafeAreaView,
	Dimensions,
} from 'react-native';
import { Button } from 'react-native-paper';
import Context from '../Context';
import RecieptSVG from '../components/RecieptSVG';
import constantStyle from '../constants/primeColors.js';

export default function BillAmount({ route, navigation }) {
	//UseContext
	const { billValue, setBillValue } = useContext(Context);
	const { setAllPlayerNames } = useContext(Context);
	const { riskyLevel } = useContext(Context);

	//? Variables

	const [billValidation, setBillValidation] = useState(false);
	const [currentBillValue, setCurrentBillValue] = useState('');
	const [moneyText, setMoneyText] = useState('Show me the money...');

	const { bill } = route.params;
	const [disableNextButton, setDisableNextButton] = useState(true);

	//! Functions

	useEffect(() => {
		enableNextButton();

		if (currentBillValue === null) {
			setMoneyText('Show me the money...');
		}
		if (currentBillValue < 299 && currentBillValue > 0) {
			setMoneyText('Good luck! You will need it ;)');
		}

		if (currentBillValue > 299) {
			setMoneyText("Now we're talking!");
		}
		if (currentBillValue > 999) {
			setMoneyText('I like what I see...');
		}
		if (currentBillValue > 1499) {
			setMoneyText("RISK? Ain't nobody got time for that!");
		}
		if (currentBillValue > 2499) {
			setMoneyText('Woh! Someone will win/lose BIG!');
		}
		if (currentBillValue > 9999) {
			setMoneyText('Do not sue us if you lose🙏 ');
		}
		if (currentBillValue > 99999) {
			setMoneyText('Can we have some too?');
		}
		if (currentBillValue > 999999) {
			setMoneyText('That is just ridiculous, but I like it😎 ');
		}
	}, [currentBillValue]);

	function enableNextButton() {
		const regex = new RegExp(/^[0-9\b]+$/);

		if (currentBillValue === '') {
			return setDisableNextButton(true);
		}

		return setDisableNextButton(false);
	}

	return (
		<View style={styles.rootContainer}>
			<SafeAreaView style={styles.SafeAreaView}>
				<KeyboardAvoidingView
					behavior='padding'
					keyboardVerticalOffset={Platform.select({
						ios: () => 0,
						android: () => -225,
					})()}
					style={styles.KeyboardAvoidingView}
				>
					<ScrollView bounces={false}>
						{riskyLevel ? (
							<View id='Banner-Risky' style={styles.riskyBanner}>
								<Text style={styles.riskyBannerText}>Risk Level: HIGH</Text>
							</View>
						) : (
							<View id='Banner-Normal' style={{ ...styles.riskyBanner, backgroundColor: 'green' }}>
								<Text style={{ ...styles.riskyBannerText, backgroundColor: 'green' }}>
									Risk Level: NORMAL
								</Text>
							</View>
						)}

						<View style={styles.SecondRootContainer}>
							<View style={styles.RecieptSVGContainer}>
								<RecieptSVG />
							</View>

							<Text style={styles.BillAmountText}>Enter bill total </Text>

							<TextInput
								label='Enter Bill Amount'
								placeholder='500'
								placeholderTextColor='rgba(15, 7, 7, 0.24)'
								keyboardType='number-pad'
								onChangeText={e => {
									const regex = new RegExp(/^[0-9\b]+$/);

									if (regex.test(e) || e === '') {
										setCurrentBillValue(e);
									}
								}}
								error={billValidation}
								value={currentBillValue}
								style={styles.BillInput}
								textAlign='center'
								maxLength={9}
							></TextInput>
							<Text
								style={{
									color: 'white',
									fontFamily: 'Montserrat_600SemiBold_Italic',
									fontSize: Dimensions.get('window').width < 380 ? 13 : 14.5,

									marginTop: 15,
								}}
							>
								{moneyText}
							</Text>
							<Button
								style={styles.nextButton}
								onPress={() => {
									return [setBillValue(currentBillValue), navigation.navigate('Players')];
								}}
								disabled={disableNextButton}
								labelStyle={styles.NextButtonInnerText}
							>
								<Text>Next</Text>
							</Button>

							<Button
								onPress={() => {
									return navigation.navigate('Home');
								}}
								labelStyle={styles.BackButtonText}
								style={styles.BackButton}
							>
								<Text>Back</Text>
							</Button>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</View>
	);
}

const heightRiskLevelBanner = Platform.OS === 'ios' ? 55 : 75;
const marginTopRiskLevelBanner = Platform.OS === 'ios' ? -10 : 15;
//const windowHeight = Dimensions.get('screen').height;

let svgNoteImageMaxHeight;
let svgNoteImageMarginBottom;
let svgNoteImageMarginTop;

if (Dimensions.get('window').height >= 680) {
	svgNoteImageMaxHeight = '28%';
	svgNoteImageMarginBottom = '6%';
	svgNoteImageMarginTop = '11%';
}

if (Dimensions.get('window').height < 680) {
	svgNoteImageMaxHeight = '17.5%';
	svgNoteImageMarginBottom = '1%';
	svgNoteImageMarginTop = Dimensions.get('window').height * 0.05;
}

const styles = StyleSheet.create({
	removeButton: {
		backgroundColor: 'rgb(255, 40, 40)',
	},
	rootContainer: {
		//flex: 1,
		//flexDirection: 'column',
		//justifyContent: 'center',
		//backgroundColor: '#D00404',
		backgroundColor: constantStyle.primaryThemeColor,
		height: '100%',
	},

	SecondRootContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: constantStyle.primaryThemeColor,
		minHeight: 600,
		maxHeight: 900,
	},

	KeyboardAvoidingView: {
		backgroundColor: '#fff',
		flex: -1,
	},

	SafeAreaView: {
		marginHorizontal: 0,
	},

	RecieptSVGContainer: {
		width: Dimensions.get('window').width < 380 ? '40%' : '50.5%',
		minHeight: Dimensions.get('window').height < 680 ? '22%' : '25%',
		maxHeight: svgNoteImageMaxHeight,
		//backgroundColor: 'green',
		//backgroundColor: constantStyle.primaryThemeColor,
		//backgroundColor: 'rgb(255, 218,68)',

		marginTop: svgNoteImageMarginTop,
		marginBottom: svgNoteImageMarginBottom,
	},

	riskyBanner: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: constantStyle.riskyBannerColor,
		height: heightRiskLevelBanner,
		justifyContent: 'center',
		alignItems: 'center',
	},
	riskyBannerText: {
		alignItems: 'center',
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 19,
		marginTop: marginTopRiskLevelBanner,
	},
	BillAmountText: {
		color: 'white',
		fontFamily: 'Montserrat_700Bold',
		fontSize: Dimensions.get('window').width < 380 ? 36 : 38,
		marginTop: 15,
		marginBottom: '9%',
	},

	BillInput: {
		width: '70%',
		borderWidth: 3,
		borderColor: 'rgb(255, 255, 255)',
		borderRadius: 100,
		backgroundColor: 'rgb(255,255,255)',
		padding: Dimensions.get('window').width < 380 ? 7.5 : 10,
		fontSize: Dimensions.get('window').width < 380 ? 28 : 30,

		fontFamily: 'Montserrat_700Bold',
		color: 'rgb(49, 49, 49)',
	},

	nextButton: {
		marginTop: 53,
		//borderWidth: 1.2,
		borderColor: 'rgb(255, 255, 255)',
		backgroundColor: 'rgba(24,150,21,0)',
		//borderRadius: 40,
		width: '40%',
	},

	NextButtonInnerText: {
		color: 'rgb(248,248,0)',
		fontFamily: 'Montserrat_700Bold',
		fontSize: Dimensions.get('window').width < 380 ? 22 : 30,
		//textDecorationLine: 'underline',
		textShadowColor: 'rgba(0, 0, 0, 0.17)',
		textShadowOffset: { width: 0.5, height: 3 },
		textShadowRadius: 2,
	},

	BackButton: {
		marginTop: 22.5,
	},

	BackButtonText: {
		color: 'rgba(0,0,0,0.77)',
		fontFamily: constantStyle.defaultFont,
		fontSize: Dimensions.get('window').width < 380 ? 14 : 16,
	},
});
