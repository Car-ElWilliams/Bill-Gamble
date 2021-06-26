import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
	return (
		<Svg viewBox='0 0 207 207' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
			<Path
				d='M103.5 207c57.161 0 103.5-46.339 103.5-103.5S160.661 0 103.5 0 0 46.339 0 103.5 46.339 207 103.5 207z'
				fill='#FF5757'
			/>
			<Path
				d='M81.506 40.753v27.492h53.691v.324c-5.499.97-9.703 6.145-9.703 11.967v70.509h36.225c6.792 0 11.967-5.498 11.967-11.967V40.753c0-3.558-2.911-6.469-6.469-6.469H88.298c-3.88 0-6.792 2.911-6.792 6.47z'
				fill='#fff'
			/>
			<Path
				d='M163.336 43.34H92.18v4.529h71.156V43.34zM163.336 52.397H92.18v4.528h71.156v-4.528zM163.336 61.777H92.18v4.528h71.156v-4.528zM163.336 70.833H92.18v4.528h71.156v-4.528zM163.336 80.212H92.18v4.529h71.156v-4.529zM163.336 89.592H92.18v4.528h71.156v-4.528z'
				fill='#E0E1E5'
			/>
			<Path
				d='M149.752 138.431V80.859c0-5.822-3.882-11.32-10.027-12.614-7.762-1.294-14.231 4.528-14.231 11.968v70.185h36.225c-6.792.324-11.967-5.175-11.967-11.967z'
				fill='#CACBCE'
			/>
			<Path
				d='M98.648 68.245h-52.72c-7.115 0-12.937 5.822-12.937 12.938v86.034l5.822 5.822 5.821-5.822 5.822 5.822 5.822-5.822 5.822 5.822 5.822-5.822 5.822 5.822 5.822-5.822 5.822 5.822 5.821-5.822 5.822 5.822 5.822-5.822 5.822 5.822 5.822-5.822 5.822 5.822 5.822-5.822V80.212c0-5.821 4.204-10.673 9.703-11.967v-.323H98.649v.323z'
				fill='#fff'
			/>
			<Path
				d='M99.619 109.322H45.605v4.528h54.014v-4.528zM99.619 118.702H45.605v4.528h54.014v-4.528zM73.42 128.081H45.605v4.528H73.42v-4.528zM73.42 137.138H45.605v4.528H73.42v-4.528z'
				fill='#E0E1E5'
			/>
			<Path d='M112.88 81.183H45.605v19.406h67.275V81.183z' fill='#00A8EA' />
			<Path
				d='M86.681 133.58v-3.235c.647.324.97.647 1.294 1.294 0 .647.323.647.97.647.324 0 1.94-.324.324-2.588-.324-.323-.647-.97-2.264-.97v-1.294h-.97v1.294c-2.912.324-3.235 2.264-3.235 2.911 0 2.588 2.588 2.911 3.234 3.234v3.558c-1.293-.323-1.617-1.617-1.617-1.94-.323-.647-.647-.647-.97-.647-.647 0-.97.647-.97.97 0 .323.323 1.941 1.94 2.588.324.323.97.323 1.617.323v1.294h.97v-1.294c.648 0 1.294-.323 1.941-.647 1.294-.97 1.94-2.587 1.294-3.881-.647.323-.97-.97-3.558-1.617zm-.97 0c-.647-.324-1.294-.324-1.294-1.294 0-.324 0-.97 1.294-1.294v2.588zm.97 5.498v-3.234c1.617.647 1.617 1.293 1.617 1.617 0 .323 0 .97-1.617 1.617zM96.384 133.58v-3.235c.647.324.97.647 1.294 1.294 0 .647.324.647.97.647.324 0 1.941-.324.324-2.588-.324-.323-.647-.97-2.264-.97v-1.294h-.97v1.294c-2.911.324-3.235 2.264-3.235 2.911 0 2.588 2.588 2.911 3.234 3.234v3.558c-1.293-.323-1.617-1.617-1.617-1.94-.323-.647-.647-.647-.97-.647-.647 0-.97.647-.97.97 0 .323.323 1.941 1.94 2.588.324.323.97.323 1.617.323v1.294h.97v-1.294c.648 0 1.295-.323 1.941-.647 1.294-.97 1.941-2.587 1.294-3.881-.647.323-.97-.97-3.558-1.617zm-.97 0c-.647-.324-1.294-.324-1.294-1.294 0-.324 0-.97 1.294-1.294v2.588zm.97 5.498v-3.234c1.618.647 1.618 1.293 1.618 1.617 0 .323-.324.97-1.618 1.617z'
				fill='#EB5151'
			/>
			<Path
				d='M58.219 92.827s0-.324-.324-.324l-.323-.323-.324-.324H54.984v3.235h-1.617v-8.41h5.175c.324 0 .324 0 .647.324.324 0 .324.323.647.323.323.324.323.647.647.97 0 .324.323.647.323.97 0 .648 0 .971-.323 1.295l-.97.97c.323 0 .323.323.646.647 0 .323.324.323.324.647l.97 2.587h-1.617l-1.617-2.587zm-3.235-2.588h2.588c.323 0 .323 0 .647-.323l.323-.324v-.647c0-.323 0-.646-.323-.97-.324-.323-.647-.323-.97-.323h-2.265v2.587zM68.892 95.09h-6.469v-8.409h6.146v1.294H64.04v1.94h4.204v1.294h-4.204v2.588h4.851v1.294zM75.684 89.269c0-.324 0-.324-.323-.647 0-.323-.323-.323-.323-.323s-.324-.324-.647-.324h-.647c-.324 0-.647 0-.97.324-.324 0-.647.323-.647.646-.324.324-.324.647-.324.97 0 .324-.323.648-.323 1.294 0 .324 0 .97.323 1.294 0 .324.324.647.324.97l.647.647c.323 0 .646.324.97.324.647 0 .97 0 1.294-.324.323-.323.646-.647.646-1.293h1.618c0 .323-.324.97-.324 1.293-.323.324-.323.647-.647.97-.323.324-.647.324-.97.648-.323 0-.97.323-1.294.323-.647 0-1.293 0-1.617-.323-.323-.324-.97-.647-1.294-.97-.323-.324-.647-.971-.647-1.294-.323-.647-.323-.97-.323-1.941 0-.97 0-1.294.323-1.94.324-.648.324-.971.647-1.294.324-.324.647-.647 1.294-.97.323-.324.97-.324 1.617-.324.324 0 .97 0 1.294.323.323 0 .647.324.97.647.324.324.647.647.647.97.324.324.324.647.324 1.294h-1.618v-.97zM85.388 95.09h-6.47v-8.409h6.146v1.294h-4.528v1.94h4.205v1.294h-4.205v2.588h4.852v1.294zM88.622 95.09h-1.617v-8.409h1.617v8.41zM90.563 86.681H95.09c.323 0 .647.324.97.324.323.323.647.323.647.647.323.323.323.647.323 1.293 0 .97-.323 1.618-.97 1.941-.647.323-1.294.647-2.264.647H92.18v3.234h-1.618v-8.086zm1.617 3.882H94.444c.323 0 .323 0 .647-.324l.323-.323v-.647-.647l-.323-.323s-.324 0-.647-.324H92.18v2.588zM104.794 88.299h-2.588v6.792h-1.617v-6.792h-2.588v-1.294h6.793v1.294z'
				fill='#33D3F4'
			/>
			<Path
				d='M56.278 150.398h-.97v11.644h.97v-11.644zM61.453 150.398h-.97v11.644h.97v-11.644zM63.394 150.398h-.97v11.644h.97v-11.644zM65.334 150.398h-.97v11.644h.97v-11.644zM69.216 150.398h-.97v11.644h.97v-11.644zM71.156 150.398h-.97v11.644h.97v-11.644zM76.331 150.398h-.97v11.644h.97v-11.644zM80.86 150.398h-.97v11.644h.97v-11.644zM94.444 150.398h-.97v11.644h.97v-11.644zM96.06 150.398h-.97v11.644h.97v-11.644zM98.002 150.398h-.97v11.644h.97v-11.644zM103.5 150.398h-.97v11.644h.97v-11.644zM67.275 150.398h-1.294v11.644h1.294v-11.644zM78.919 150.398h-1.617v11.644h1.617v-11.644zM89.592 150.398h-1.617v11.644h1.617v-11.644zM92.503 150.398h-1.617v11.644h1.617v-11.644zM83.447 150.398H81.83v11.644h1.617v-11.644zM74.39 150.398h-2.587v11.644h2.588v-11.644zM87.005 150.398h-2.588v11.644h2.588v-11.644zM101.559 150.398h-2.587v11.644h2.587v-11.644zM59.513 150.398h-2.588v11.644h2.588v-11.644z'
				fill='#474E5E'
			/>
			<Path
				d='M56.278 156.22h-.97v5.822h.97v-5.822zM61.453 156.22h-.97v5.822h.97v-5.822zM63.394 156.22h-.97v5.822h.97v-5.822zM65.334 156.22h-.97v5.822h.97v-5.822zM69.216 156.22h-.97v5.822h.97v-5.822zM71.156 156.22h-.97v5.822h.97v-5.822zM76.331 156.22h-.97v5.822h.97v-5.822zM80.86 156.22h-.97v5.822h.97v-5.822zM94.444 156.22h-.97v5.822h.97v-5.822zM96.06 156.22h-.97v5.822h.97v-5.822zM98.002 156.22h-.97v5.822h.97v-5.822zM103.5 156.22h-.97v5.822h.97v-5.822zM67.275 156.22h-1.294v5.822h1.294v-5.822zM78.919 156.22h-1.617v5.822h1.617v-5.822zM89.592 156.22h-1.617v5.822h1.617v-5.822zM92.503 156.22h-1.617v5.822h1.617v-5.822zM83.447 156.22H81.83v5.822h1.617v-5.822zM74.39 156.22h-2.587v5.822h2.588v-5.822zM87.005 156.22h-2.588v5.822h2.588v-5.822zM101.559 156.22h-2.587v5.822h2.587v-5.822zM59.513 156.22h-2.588v5.822h2.588v-5.822z'
				fill='#2E3545'
			/>
		</Svg>
	);
	const styles = StyleSheet.create({
		svg: { position: 'relative' },
	});
}

export default SvgComponent;
