import { StyleSheet} from "react-native";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const calculatedHeight = screenWidth * (599 / 360);


const styles = StyleSheet.create({
	container: {
    width: '100%',
    height: calculatedHeight,
  },
	top:{
		width:'100%',
		justifyContent:'space-between',
		flexDirection:'row'
	},
	pFazer: {
		fontFamily: 'Varela-Round',
		fontSize: 25,
		color:'#000',
		borderBottomWidth: 3,
		borderBottomColor: '#FFE7D1'
	},
	qtdAtv:{
		padding:2,
		color:'#E84D35',
		fontFamily: 'Varela-Round',
		fontSize:10,
		borderRadius: 2,
		backgroundColor: 'rgba(247, 165, 138, 0.60)',
	},
	hello:{
		width: '80%',
		color: 'white',
		fontFamily: 'Varela-Round',
		fontSize: 25, 
		marginBottom: 10
	},
	frameTop:{
		backgroundColor:'white',
		width: '80%',
		justifyContent: 'space-between',
		flexDirection:'row',
		paddingStart:25,
		borderRadius: 10
	},
	frameToptext:{
		justifyContent: 'space-between',
		flexDirection: 'column',
		height: '100%',
		paddingBottom: 15,
		paddingVertical:10
	},
	today:{
		color:'black',
		fontFamily: 'Varela-Round',
		fontSize: 16
	},
	activitys: {
		color: 'black',
		fontFamily: 'Varela-Round',
		fontSize: 20
	},
	containerChat:{
		flex:1,
		padding:'5%',
		backgroundColor: 'white',
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
	}
});

export {styles}