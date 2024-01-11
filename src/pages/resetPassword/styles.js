import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
	title:{
		fontSize: 25,
		fontFamily: 'Varela-Round',
		marginBottom: '10%'
	},
	container: {
		flex: 1,
		backgroundColor: '#6048AC',
	},
	header: {
		width: '100%',
		padding: 10
	},
	subcontainer: {
		flex:1,
		paddingTop: '10%',
		marginTop: '15%',
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50, 
	},
	paragraph: {
		color: 'black',
		opacity: 0.5,
		textAlign: 'center',
		fontFamily: "Varela-Round",
		fontSize: 13,
		marginTop: 8
	},
	paragraphTwo: {
		color: 'black',
		textAlign: 'center',
		fontFamily: "Varela-Round",
		fontSize: 13,
		marginTop: '5%'
	},
	paragraphThree: {
		paddingHorizontal:10,
		textAlign: 'center',
		fontFamily: "Varela-Round",
		fontSize: 13,
		marginTop: '10%',
		color: 'rgba(0, 0, 0, 0.60)',
		textAlign: 'center'
	},
	input: {
		alignItems:"center",
		flexDirection: "row",
		paddingLeft: 20,
		paddingRight: 20,
		width: '100%',
		height: 34,
		borderWidth: 1.5,
		borderRadius: 10,
		borderColor: "#4A3292",
		marginTop: '10%'
	},
	button: {
		paddingHorizontal: '20%',
		paddingVertical: 8,
		alignItems:"center", 
		marginTop:'15%', 
		backgroundColor:'#6048AC', 
		borderRadius:20,
	},
	textButton: {
		fontFamily:'Varela-Round',
		color:'#FFFFFF',
		fontSize:15,
		justifyContent:'center'
	},
	modalContainer: {
		flex: 1,
		paddingHorizontal:'5%',
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
	rectangle: {
		width: 15,
		height: 8,
		borderRadius: 10,
	},erroMessage: {
		color:'red',
		fontSize: 10,
		textAlign:'center'
	},
	
});

export{styles};