import React from 'react';
import { 
	View, 
	Text,
	TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml} from 'react-native-svg';

const svgDrawer = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="0 0 28 21" fill="none">
 <path d="M1.55556 21H11.849C12.7045 21 12.8333 20.2125 12.8333 19.25C12.8333 18.2875 12.7045 17.5 11.849 17.5H1.55556C0.7 17.5 0 18.2875 0 19.25C0 20.2125 0.7 21 1.55556 21ZM1.55556 12.25H19.8333C20.6889 12.25 21.5833 11.4625 21.5833 10.5C21.5833 9.5375 20.6889 8.75 19.8333 8.75H1.55556C0.7 8.75 0 9.5375 0 10.5C0 11.4625 0.7 12.25 1.55556 12.25ZM0 1.75C0 2.7125 0.7 3.5 1.55556 3.5H26.4444C27.3 3.5 28 2.7125 28 1.75C28 0.7875 27.3 0 26.4444 0H1.55556C0.7 0 0 0.7875 0 1.75Z" fill="white"/>
</svg>
`

export default function Cronograma (){
	const navigate = useNavigation();

	return(
		<View style={{flex:1, backgroundColor:'#6048AC'}}>
			<View style={{ height: '30%', width: '100%', padding: 20 }}>
				<TouchableOpacity onPress={() => navigate.openDrawer()}>
          <SvgXml xml={svgDrawer} width={28} height={21} />
        </TouchableOpacity>
			</View>
  	</View>
	);
}

