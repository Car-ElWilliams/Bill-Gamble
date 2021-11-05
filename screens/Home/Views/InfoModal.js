import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Modal,
	TouchableOpacity,
	Dimensions,
	Image,
	useWindowDimensions,
} from 'react-native';
import CashSVG from '../../../components/CashSVG.js';
import PizzaSVG from '../../../components/PizzaSVG.js';
import ExcitingSVG from '../../../components/ExcitingSVG.js';
import constantStyle from '../../../constants/primeColors.js';

const InfoModal = ({ handleInfoModalVisibility }) => {
	const [isVisible, setIsVisible] = useState();

	const onButtonPress = () => {
		setIsVisible(false);
		handleInfoModalVisibility(isVisible);
	};

	return (
		<Modal animationType='slide' visible={isVisible} transparent={true}>
			<View
				style={{
					flex: 1,
					verticalAlign: 'center',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<TouchableOpacity
					onPress={onButtonPress}
					style={{
						backgroundColor: 'rgb(0,200,255)',
						height: '100%',
						width: '100%',
						paddingLeft: 15,
						paddingRight: 15,
					}}
				>
					<View
						style={{
							flex: 1.5,
							flexDirection: 'column',
							alignItems: 'center',
							//backgroundColor: 'yellow',
							marginTop: '-2%',
							marginBottom: 20,
						}}
					>
						<Text
							style={{
								color: 'white',
								fontFamily: constantStyle.blackFont,
								fontSize: Dimensions.get('window').width < 380 ? 35 : 40,
								marginVertical: 15,
							}}
						>
							Bill Gamble?
						</Text>
						<Text
							style={{
								color: 'white',
								fontFamily: constantStyle.defaultFont,
								fontSize: Dimensions.get('window').width < 380 ? 11.5 : 13,
								textAlign: 'center',
							}}
						>
							Let’s say you had a great night out with your friends {'\n'} and you all decided to
							buy a pizza.
						</Text>
						<View
							style={{
								width: Dimensions.get('window').height < 680 ? '75%' : '80%',
								height: Dimensions.get('window').height < 680 ? '30%' : '35%',
								marginTop: 20,
								marginBottom: 15,
							}}
						>
							<PizzaSVG></PizzaSVG>
						</View>
						<Text
							style={{
								color: 'white',
								fontFamily: constantStyle.defaultFont,
								fontSize: Dimensions.get('window').width < 380 ? 11.5 : 13,

								textAlign: 'center',
							}}
						>
							Instead of splitting the bill you decide to use {'\n'}{' '}
							<Text
								style={{
									fontFamily: constantStyle.blackFont,
									fontSize: 14,
									color: 'rgb(255, 210, 0)',
								}}
							>
								Bill Gamble
							</Text>{' '}
							and let chance decide how much each will pay!
						</Text>
					</View>
					<View
						style={{
							flex: 0,
							alignItems: 'center',
							flexDirection: 'row',
							justifyContent: 'center',
							height: '10%',
						}}
					>
						<View
							style={{
								width: Dimensions.get('window').height < 680 ? '11%' : '13%',
								height: Dimensions.get('window').height < 680 ? '46%' : '55%',
							}}
						>
							<Image
								style={{ borderRadius: 4, maxWidth: '100%', maxHeight: '100%' }}
								source={require('../../../assets/InfoAppIconHome.png')}
							></Image>
						</View>
						<Text style={{ color: 'white', fontSize: 30, fontFamily: 'Montserrat_800ExtraBold' }}>
							{' '}
							+{' '}
						</Text>
						<View
							style={{
								width: Dimensions.get('window').height < 680 ? '15%' : '20%',
								height: Dimensions.get('window').height < 680 ? '40%' : '50%',
							}}
						>
							<CashSVG />
						</View>
						<Text style={{ color: 'white', fontSize: 30, fontFamily: 'Montserrat_800ExtraBold' }}>
							{' '}
							={' '}
						</Text>
						<View style={{ width: Dimensions.get('window').height < 680 ? '35%' : '40%' }}>
							<ExcitingSVG></ExcitingSVG>
						</View>
					</View>
					<View
						style={{
							flex: 0,
							marginTop: Dimensions.get('window').height < 680 ? 10 : 25,
							marginBottom: Dimensions.get('window').height < 680 ? 0 : 25,
						}}
					>
						<Text
							style={{
								color: 'white',
								fontFamily: constantStyle.blackFont,
								fontSize: Dimensions.get('window').width < 380 ? 32 : 35,
								marginBottom: Dimensions.get('window').height < 680 ? '2%' : '5%',
								textAlign: 'center',
							}}
						>
							Modes?
						</Text>
						<Text
							style={{
								color: 'white',
								fontFamily: constantStyle.defaultFont,
								fontSize: Dimensions.get('window').width < 380 ? 11.5 : 13,
								textAlign: 'center',
								marginBottom: Dimensions.get('window').height < 680 ? 15 : 0,
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
							//backgroundColor: 'blue',
						}}
					>
						<View
							style={{
								flex: 0,
								alignItems: 'center',
								width: '40%',
								height: Dimensions.get('window').height < 680 ? '70%' : '67.5%',
							}}
						>
							<Text
								style={{
									color: 'green',
									fontSize: 18,
									fontFamily: constantStyle.blackFont,
									borderBottomWidth: 3,
									borderColor: 'white',
									marginBottom: 10,
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
											fontFamily: constantStyle.defaultFont,
											fontSize: Dimensions.get('window').width < 380 ? 10.5 : 12,

											color: 'white',
											//height: '33%',
											width: '70%',
											textShadowColor: 'rgba(0, 0, 0, 0.2)',
											textShadowOffset: { width: 0.5, height: 1.7 },
											textShadowRadius: 2,
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
											fontSize: Dimensions.get('window').width < 380 ? 10.5 : 12,
											fontFamily: constantStyle.defaultFont,
											color: 'white',
											width: '100%',
											textShadowColor: 'rgba(0, 0, 0, 0.2)',
											textShadowOffset: { width: 0.5, height: 1.7 },
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
								height: Dimensions.get('window').height < 680 ? '80%' : '67.5%',
							}}
						>
							<Text
								style={{
									color: 'rgba(243, 30, 30,.95)',
									fontSize: 18,
									fontFamily: constantStyle.blackFont,
									borderBottomWidth: 3,
									borderColor: 'white',
									marginBottom: 10,
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
											color: 'rgba(243, 30, 30,.95)',
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
											fontSize: Dimensions.get('window').width < 380 ? 10.5 : 12,
											fontFamily: constantStyle.defaultFont,
											color: 'white',
											//height: '33%',
											width: '70%',
											textShadowColor: 'rgba(0, 0, 0, 0.2)',
											textShadowOffset: { width: 0.5, height: 1.7 },
											textShadowRadius: 2,
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
											color: 'rgba(243, 30, 30,.95)',
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
											fontSize: Dimensions.get('window').width < 380 ? 10.5 : 12,
											fontFamily: constantStyle.defaultFont,
											color: 'white',
											width: '85%',
											textShadowColor: 'rgba(0, 0, 0, 0.2)',
											textShadowOffset: { width: 0.5, height: 1.7 },
											textShadowRadius: 2,
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
	);
};

export default InfoModal;
