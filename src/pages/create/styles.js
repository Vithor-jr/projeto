import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#6048AC'
		},
		subContainer: {
				flex:1,
				paddingTop:'10%',
				marginTop: '25%',
				backgroundColor: "#FFFFFF",
				borderTopLeftRadius: 50, // Raio na parte superior esquerda
				borderTopRightRadius: 50, // Raio na parte superior direita
		},
		title2:{
			fontFamily:'Varela-Round',
			fontSize:25
			},

		subtitle:{
			opacity: 0.4,
			fontSize: 11,
			fontFamily: "Varela-Round"
		},

		frame: {
			alignItems: "center",
			width:'80%',
			marginLeft:'10%',
			marginRight: '10%',
			borderRadius: 30,
			paddingBottom: 30
		},
	
		inputCadastro: {
			alignItems:"center",
			flexDirection: "row",
			paddingLeft: 20,
			paddingRight: 20,
			width: '100%',
			height: 34,
			borderWidth: 1,
			borderRadius: 10,
			borderColor: "#3B267B"
		},
		buttonCadastro: {
			width:'85%',
			paddingVertical: 7,
			alignItems:"center", 
			marginTop:'10%', 
			backgroundColor:'#6048AC', 
			borderRadius:20,
			marginBottom:'3%'
		},
		textCadastro:{
			marginTop: 13,
			fontSize:12, 
			marginBottom:7, 
			fontFamily:'Varela-Round'
		},
		erroMessage: {
			color:'red',
			fontSize: 10,
			textAlign:'center'
		},
		rectangle: {
			width: 15,
			height: 8,
			borderRadius: 10,
		},
		modalContainer: {
			paddingHorizontal:'5%',
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
		},
		modalContent: {
			backgroundColor: '#FFF',
			padding: 20,
			borderRadius: 10,
			alignItems: 'center',
		},
		errorIconContainer: {
			marginBottom: 10,
			alignItems: 'center',
		},
		modalText: {
			textAlign: 'center',
			fontFamily:'Varela-Round',
			fontSize: 16,
			marginBottom: 20,
		},
		modalButton: {
			fontFamily:'Varela-Round',
			fontSize: 18,
			color: '#17A1FA',
		},
	}	
);

	export{styles};