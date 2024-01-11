import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
		title:{
			fontSize: 20,
			fontFamily: 'Varela-Round'
		},

		subtitle:{
			marginTop:7,
			opacity: 0.4,
			fontSize: 11,
			fontFamily: "Varela-Round"
		},

		frame: {
			alignItems: "center",
			paddingBottom: 30
		},

		inputLogin: {
			alignItems:"center",
			flexDirection: "row",
			paddingLeft: 20,
			paddingRight: 20,
			width: '70%',
			height: 37,
			borderWidth: 1.5,
			borderRadius: 10,
			borderColor: "#4A3292"
		},

		buttonLogin: {
			width:'55%',
			paddingVertical: 8,
			alignItems:"center", 
			marginTop:'10%', 
			backgroundColor:'#6048AC', 
			borderRadius:20,
			marginBottom:'3%'
		},
		containerDad:{
			flex: 1,
			backgroundColor: "#6048AC",
		},
		container:{
			flex:1,
			marginTop: '25%',
			backgroundColor: "#FFFFFF",
			borderTopLeftRadius: 50, // Raio na parte superior esquerda
			borderTopRightRadius: 50, // Raio na parte superior direita
		},
		textInput: {
			fontSize:15,
			marginBottom:7,
			fontFamily:'Varela-Round'
		},
		textButton: {
			fontFamily:'Varela-Round',
			color:'#FFFFFF',
			fontSize:15,
			justifyContent:'center'
		},
		modalContainer: {
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
		errorIconContainer: {
			marginBottom: 10,
			alignItems: 'center',
		},
		
	}	
);

	export{styles};