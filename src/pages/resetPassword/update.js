import React, {useState} from "react";
import { 
	View, 
	Text, 
	TouchableOpacity,
	TextInput,
	Modal
} from "react-native";
import Svg, { Path } from 'react-native-svg';
import { styles as estilos } from '../resetPassword/styles'; // Renomeando para evitar conflito
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

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
          <FontAwesome name="exclamation-circle" size={30} color="red" />
        </View>
        <Text style={estilos.modalText}>{message}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={estilos.modalButton}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default function UpdatePassword({ navigation, route}) {
	const navegacao = useNavigation();
	const { email } = route.params;
	const [codigo, setCodigo] = useState("");
	const [error, setError] = useState('');
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
	const [passwordStrength, setPasswordStrength] = useState('');
	const [passwordWarningColor, setPasswordWarningColor] = useState(null);
	const [rectangleColors, setRectangleColors] = useState({
    rectangle1: 'transparent',
    rectangle2: 'transparent',
    rectangle3: 'transparent',
  });

  const validarRedefinicao = () => {
    if (!codigo.trim()) {
      setError('Por favor, insira o código recebido por email.');
      return false;
    } else if (!novaSenha.trim() || !confirmarSenha.trim()) {
      setError('Por favor, preencha todos os campos de senha.');
      return false;
    } else if(passwordStrength !== 'Senha forte'){
			setError('Por favor, digite uma senha forte\nUma senha forte contém letras, numeros e caracteres especiais.');
      return false;
		} else if (novaSenha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return false;
    }

    return true;
  };

	const validatePassword = () => {
		const regexUpperCase = /[A-Z]/;
		const regexLowerCase = /[a-z]/;
		const regexNumber = /\d/;
		const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
	
		const hasUpperCase = regexUpperCase.test(novaSenha);
		const hasLowerCase = regexLowerCase.test(novaSenha);
		const hasNumber = regexNumber.test(novaSenha);
		const hasSpecialChar = regexSpecialChar.test(novaSenha);

			if (novaSenha.length > 7 && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
				setPasswordStrength('Senha forte');
				setRectangleColors({
					rectangle1: '#47AF39',
					rectangle2: '#47AF39',
					rectangle3: '#47AF39',
				});
				setPasswordWarningColor('#47AF39');
			} else if (novaSenha.length > 7 && ((hasUpperCase && hasLowerCase) || (hasUpperCase && hasNumber) || (hasUpperCase && hasSpecialChar) || (hasLowerCase && hasNumber) || (hasLowerCase && hasSpecialChar) || (hasNumber && hasSpecialChar))) {
				setPasswordStrength('Senha média');
				setRectangleColors({
					rectangle1: '#F78223',
					rectangle2: '#F78223',
					rectangle3: '#B3B3B3',
				});
				setPasswordWarningColor('#F78223');
			} else if (novaSenha.length > 7 && (hasUpperCase || hasLowerCase || hasNumber || hasSpecialChar)) {
				setPasswordStrength('Senha fraca');
				setRectangleColors({
					rectangle1: '#E84D35',
					rectangle2: '#B3B3B3',
					rectangle3: '#B3B3B3',
				});
				setPasswordWarningColor('#E84D35');
			} else {
				setPasswordStrength('');
			}

	};

	const redefinirSenha = async () => {
		if (validarRedefinicao()) {
			console.log('Enviando dados')
			try {
				console.log('falando com o servidor')
				const response = await axios.post('http://192.168.1.8:3000/reset-password', {
					email: email,
					code: codigo,
					newPassword: novaSenha,
				});
	
				if (response.status === 200) {
					if (response.data.error) {
						setError(response.data.error);
					} else {
						navegacao.navigate('Login');
					}
				} else {
					console.log('Erro ao redefinir a senha:', response.status);
				}
			} catch (error) {
				console.log('Erro ao redefinir a senha:', error.message);
				setError('Erro ao redefinir a senha. Tente novamente mais tarde.');
			}
		}
	};
	


  return (
    <View style={estilos.container}>
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
						<View style={{borderRadius: 10, backgroundColor: 'rgba(71, 175, 57, 0.30)', width:'100%', padding:'2%'}}>
							<Text style={estilos.paragraphTwo}>
								{`Um e-mail foi enviado para ${email} para finalizar a redefinição de senha.`}
							</Text>
							<MaterialIcons name="check-circle" size={30} color="#47AF39" />
						</View>

						<Text style={estilos.paragraphThree}>
							Por favor, insira no campo abaixo o código  de ativação que você recebeu por e-mail e redefina sua senha.
						</Text>

						<TextInput
							style={estilos.input}
							placeholder='Código'
							placeholderTextColor="rgba(0, 0, 0, 0.4)"
							onChangeText={text => setCodigo(text)}
						/>

						<TextInput
							style={estilos.input}
							placeholder='Nova Senha'
							placeholderTextColor="rgba(0, 0, 0, 0.4)"
							onChangeText={(value) => {
								setNovaSenha(value)
								if (value.trim() !== '') {
									validatePassword();
								} else {
									setPasswordStrength(null);
								}
							}}
						/>
						<View style={{alignItems:'flex-end', flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
								<View style={{ flexDirection: 'row', marginTop: 5, alignItems:'center'}}>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap:10}}>
								  {passwordStrength ? (<Text style={{ ...estilos.erroMessage, color: passwordWarningColor }}>{passwordStrength}</Text>) : null}
									{novaSenha.length >= 8 && (
										<View style={{flexDirection:'row', gap:2, alignItems: 'center'}}>
										<View style={[estilos.rectangle, { backgroundColor: rectangleColors.rectangle1 }]} />
										<View style={[estilos.rectangle, { backgroundColor: rectangleColors.rectangle2 }]} />
										<View style={[estilos.rectangle, { backgroundColor: rectangleColors.rectangle3 }]} />
										</View>
									)}
								</View>
							</View>
						<Text style={{color:'#999', fontFamily:'Varela-Round', fontSize:10}}>mínimo 8 caracteres</Text>
					</View>

						<TextInput
							style={estilos.input}
							placeholder='Repita a nova senha'
							placeholderTextColor="rgba(0, 0, 0, 0.4)"
							onChangeText={text => setConfirmarSenha(text)}
						/>

						{error && <ErrorMessage message={error} onClose={() => setError('')} />}

						<TouchableOpacity style={estilos.button} onPress={() => {redefinirSenha()}}>
							<Text style={estilos.textButton}>Redefinir</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAwareScrollView>
			</View>

      {/* Seu conteúdo aqui */}
    </View>
  );
}
