import React, {useState} from "react";
import { View, 
	Text, 
	TouchableOpacity,
	Image,
	TextInput,
	Modal
} from "react-native";
import Svg, { Path } from 'react-native-svg';
import { styles as estilos } from '../resetPassword/styles'; // Renomeando para evitar conflito
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {useNavigation} from '@react-navigation/native'
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';

const ErrorMessage = ({ message, onClose }) => (
  <Modal
    transparent
    animationType="slide"
    visible={!!message}
    onRequestClose={onClose}
  >
    <View style={estilos.modalContainer}>
      <View style={estilos.modalContent}>
        <View style={estilos.errorIconContainer}>
          <Icon name="exclamation-circle" size={30} color="red" />
        </View>
        <Text style={estilos.modalText}>{message}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={estilos.modalButton}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default function Request({ navigation }) {
	const navegacao = useNavigation();
	const [email, setEmail] = useState("");
  const [error, setError] = useState('');

  const validarEmail = () => {
		const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let isValid = true; 

    if (!regexEmail.test(email)) {
      setError('Por favor, insira um email válido');
      isValid = false;
    } else {
      setError('');
    }

    return isValid;
  };

	const enviarEmail = async () => {
		if (validarEmail()) {
			try {
				console.log('Enviando requisição para redefinir senha...');
				const response = await axios.post('http://192.168.1.8:3000/request-password-reset', { email: email });
	
				console.log('Resposta:', response);
	
				if (response.status === 200) {
					navegacao.navigate('UpdatePassword', {email})
				} else {
					console.log('Erro ao enviar o email:', response.status);
				}
			} catch (error) {
				setError('Erro ao enviar o email:', error.message);
			}
		}
	};

  return (
    <View style={estilos.container}>
      {/* Cabeçalho personalizado */}
      <View style={estilos.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
					<Svg xmlns="http://www.w3.org/2000/svg" fill="#6048AC" viewBox="0 0 24 24" strokeWidth="2" stroke="white" width="30" height="30" style={{ paddingHorizontal: 10 }}>
          	<Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        	</Svg>
        </TouchableOpacity>
      </View>

			<View style={estilos.subcontainer}>
				<KeyboardAwareScrollView behavior={Platform.OS === "ios" ? "padding" : "height"}>
					<View style={{alignItems:'center', width: '100%', paddingHorizontal:'15%'}}>
						<Text style={estilos.title}>Esqueceu a senha?</Text>
						<Image
							style={{width: 250, height: 166}}
							source={require("../resetPassword/resetimage.png")}
						/>
						<Text style={estilos.paragraph}>
							Digite seu e-mail no campo abaixo e lhe enviaremos uma nova senha.
						</Text>

						<TextInput
							style={estilos.input}
							placeholder='E-mail'
							keyboardType='email-address'
							placeholderTextColor="rgba(0, 0, 0, 0.4)"
							onChangeText={text => setEmail(text)}
              value={email}
						/>
						{error && <ErrorMessage message={error} onClose={() => setError('')} />}

						<TouchableOpacity style={estilos.button} onPress={() => {enviarEmail()}}>
							<Text style={estilos.textButton}>Redefinir Senha</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAwareScrollView>
			</View>
    </View>
  );
}
