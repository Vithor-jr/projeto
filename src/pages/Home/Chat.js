import React, { useState, useEffect } from 'react';
import { GiftedChat, InputToolbar, Bubble} from 'react-native-gifted-chat';
import { 
	View, 
	Text,
	TouchableOpacity,
	ImageBackground,
	Image,
	TextInput,
	Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml} from 'react-native-svg';
import axios from 'axios';
import { styles as estilos } from './styles';

const svgDrawer = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="0 0 28 21" fill="none">
 <path d="M1.55556 21H11.849C12.7045 21 12.8333 20.2125 12.8333 19.25C12.8333 18.2875 12.7045 17.5 11.849 17.5H1.55556C0.7 17.5 0 18.2875 0 19.25C0 20.2125 0.7 21 1.55556 21ZM1.55556 12.25H19.8333C20.6889 12.25 21.5833 11.4625 21.5833 10.5C21.5833 9.5375 20.6889 8.75 19.8333 8.75H1.55556C0.7 8.75 0 9.5375 0 10.5C0 11.4625 0.7 12.25 1.55556 12.25ZM0 1.75C0 2.7125 0.7 3.5 1.55556 3.5H26.4444C27.3 3.5 28 2.7125 28 1.75C28 0.7875 27.3 0 26.4444 0H1.55556C0.7 0 0 0.7875 0 1.75Z" fill="white"/>
</svg>
`

const svgMessageUser = `
<svg xmlns="http://www.w3.org/2000/svg" width="152" height="80" viewBox="0 0 152 80" fill="none">
<path d="M0 15C0 6.71573 6.71573 0 15 0H131.087C138.625 0 144.996 5.61008 145.973 13.0846C150.964 51.2816 154.388 78.0592 149.944 78.9757C144.926 80.0105 141.165 73.416 136.042 73.416H15C6.71574 73.416 0 66.7003 0 58.416V15Z" fill="#6048AC"/>
</svg>
`
const api = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': 'Bearer ' + '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',
    'Content-Type': 'application/json'
  }
});

const svgSend = `
	<svg xmlns="http://www.w3.org/2000/svg" width="26" height="23" viewBox="0 0 26 23" fill="none">
	<path d="M2.1371 20.125L24.4549 11.5L2.1371 2.875L2.12646 9.58333L18.0754 11.5L2.12646 13.4167L2.1371 20.125Z" fill="white"/>
	</svg>
`

export default function Chat (){
	const navigate = useNavigation();
	const [messages, setMessages] = useState([]);
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    api.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
				 {
          role: 'system',
          content: 'Olá, apresente-se, seu nome é bia e é uma assistante virtual do studus'
        },
      ]
    })
    .then(response => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, {
        _id: Math.random(),
        text: response.data.choices[0].message.content,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Assistant',
        },
      }));
    });
  }, []);

	useEffect(() => {
		//Quando o teclado é acionado
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setKeyboardVisible(true);
      }
    );

		//Quando o teclado é fechado
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setKeyboardVisible(false);
      }
    );
		
		//zera os valores para que sejam atualizados normalmente
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onSend = (newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages[0]));
  
    // Envie uma nova mensagem para o servidor
    api.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: newMessages[0].text
        }
      ]
    })
    .then(response => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, {
        _id: Math.random(),
        text: response.data.choices[0].message.content,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Assistant',
        },
      }));
    });
  };


	return(
		<View style={{flex:1, backgroundColor:'#6048AC'}}>
			<View style={{alignItems:'center', width:'100%', position:'absolute', justifyContent:'center', height: '15%', width: '100%'}}>
					<Image source={require('../Home/eva.png')}/>
					<Text style={{color:'white', fontFamily:'Varela-Round', fontSize:20}}>Eva</Text>
			</View>

			<View style={{padding: 20 , flexDirection:'row',  height: '15%', width: '100%'}}>
				<TouchableOpacity onPress={() => navigate.openDrawer()}>
          <SvgXml xml={svgDrawer} width={28} height={21} />
        </TouchableOpacity>
			</View>

			<View style={estilos.containerChat}>
			<View style={{
        position: 'absolute', // Posiciona esta View sobre a View anterior
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
			}} >
				<Image
					source={require('../Home/backgroundChat.png')}
					style={{
						width: '100%',
						height: '100%',
						transform: [{ scaleX: -1 }],
						opacity: 0.5
					}}
					resizeMode="contain"
    		/>	
				</View>

				<View style={{flex:1, marginBottom: isKeyboardVisible ? 0 : 75}}>
					<GiftedChat
						renderAvatar={() => null}
						messages={messages || []}
						onSend={newMessages => onSend(newMessages)}
						user={{
							_id: 1,
						}}
						textInputProps={{
							placeholder: 'Digite sua mensagem aqui...',
							placeholderTextColor: 'rgba(255, 255, 255, 0.60)',
							style: { color: 'white', width:'90%'},
						}}
						renderInputToolbar={props => (
							<InputToolbar
								{...props}
								containerStyle={{
									backgroundColor: '#6048AC',
									borderRadius: 20,
									paddingStart: 25,
									paddingEnd: 20,
								  paddingVertical:3,
								}}
								
							/>
						)}
						renderBubble={props => {
							return (
								<Bubble
									{...props}
									wrapperStyle={{
										right: {
											borderBottomRightRadius: 0,
											borderBottomLeftRadius: 15,
											borderTopRightRadius: 15,
											borderTopLeftRadius: 15,
											backgroundColor: '#6048AC',
										},
										left: {
											backgroundColor: '#E9E8E8',
											backgroundColor: '#F9F5F0',
											borderBottomRightRadius: 15,
											borderBottomLeftRadius: 0,
											borderTopRightRadius: 15,
											borderTopLeftRadius: 15,
										},
									}}
								/>
							);
						}}
						renderSend={(props) => {
							const {text, user, onSend} = props;
							return (
								<TouchableOpacity
									style={{height:'100%', justifyContent:'center', paddingStart:10}}
									onPress={() => {
										if (text && onSend) {
											onSend([{ text: text.trim(), user: user }], true);
										}
								}}>
									<SvgXml xml={svgSend} width={30}/>
								</TouchableOpacity>
							);
						}}
					/>
				</View>
    </View>
  	</View>
	);
}

