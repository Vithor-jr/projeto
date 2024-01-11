import React, {useState} from 'react';
import {View, 
	Text, 
	TouchableOpacity, 
	TextInput,
	Modal
} from "react-native";
import {styles} from "../create/styles"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native'
import axios from 'axios';

const ErrorMessage = ({ message, onClose }) => (
  <Modal
    transparent
    animationType="slide"
    visible={!!message}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.errorIconContainer}>
          <Icon name="exclamation-circle" size={30} color="red" />
        </View>
        <Text style={styles.modalText}>{message}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.modalButton}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default function Create(){
	const [email, setEmail] = useState(null)
  const [nome, setNome] = useState(null)
	const [nomeUser, setNomeUser] = useState(null)
	const [telefone, setTelefone] = useState(null)
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [erroEmail, setErroEmail] = useState(null)
  const [erroNome, setErroNome] = useState(null)
	const [erroNomeUser, setErroNomeUser] = useState(null)
	const [erroTelefone, setErroTelefone] = useState(null)
	const [erroPassword, setErroPassword] = useState(null)
	const [erroConfirmPassword, setErroConfirmPassword] = useState(null)

  const [passwordStrength, setPasswordStrength] = useState('');

	const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
	
	const [passwordWarningColor, setPasswordWarningColor] = useState(null);
	const [rectangleColors, setRectangleColors] = useState({
    rectangle1: 'transparent',
    rectangle2: 'transparent',
    rectangle3: 'transparent',
  });

	const [modalError, setModalError] = useState(null);
	const navigation = useNavigation();
		
	const salvar = () => {
		const regexEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
		const regexTelefone = /^\(\d{2}\) \d{4,5}-\d{4}$/;
	
		if (!email || email.trim() === '' || !regexEmail.test(email)) {
			setErroEmail('Preencha seu email corretamente');
		} else {
			setErroEmail(null);
		}
	
		if (!nome || nome.trim() === '') {
			setErroNome('Preencha seu nome corretamente');
		} else {
			setErroNome(null);
		}
	
		if (!nomeUser || nomeUser.trim() === '') {
			setErroNomeUser('Preencha seu nome de usuário corretamente');
		} else {
			setErroNomeUser(null);
		}
	
		if (!telefone || telefone.trim() === '' || !regexTelefone.test(telefone) || telefone.length !== 15) {
			setErroTelefone('Preencha seu telefone corretamente');
		} else {
			setErroTelefone(null);
		}
	
		if (!password || password.trim() === '') {
			setErroPassword('Digite uma senha');
		} else if(password.length < 8){
			setErroPassword('A senha deve ter no mínimo 8 dígitos');
		} else {
			setErroPassword(null);
		}
	
		if (!confirmPassword || confirmPassword.trim() === '' && password.length !== 0) {
			setErroConfirmPassword('Confirme sua senha');
		} else if (password !== confirmPassword && password.length !== 0) {
			setErroConfirmPassword('Senhas diferentes');
		} else {
			setErroConfirmPassword(null);
		}

		if (!erroEmail && !erroNome && !erroTelefone && !erroNomeUser && !erroConfirmPassword && !erroPassword) {
      if(passwordStrength !== 'Senha forte'){
				setModalError('Por favor, digite uma senha forte\nUma senha forte contém letras, numeros e caracteres especiais.');
		  } else {
				return true;
			}
    } else {
      setModalError('Por favor, corrija todos os erros antes de continuar.');
      return false;
    }
	};

	const createUser = async () => {
		if (salvar()) {
			try {
				console.log('Enviando dados para o servidor...');
				const response = await axios.post('http://192.168.1.8:3000/user', {
					name: nome,
					username: nomeUser,
					phone: telefone,
					email: email,
					password: password,
				});
	
				console.log('Resposta do servidor:', response.data);
	
			} catch (error) {
				if (error.response) {
					 if (error.response && error.response.status === 409) {
						// Trate o erro de conflito (usuário já cadastrado)
						const errorMessage = error.response.data.message;
						const duplicatedFields = error.response.data.fields;
						
						if (duplicatedFields.includes('E-mail')) {
							setModalError('E-mail já cadastrado. Por favor, escolha outro.');
						} else if (duplicatedFields.includes('Telefone')) {
							setModalError('Telefone já cadastrado. Por favor, escolha outro.');
						} else {
							// Se não contiver informações específicas, trate o erro de forma genérica
							console.log('Erro ao enviar dados:', error);
							setModalError('Erro ao cadastrar usuário. Por favor, tente novamente.');
						}
					} else {
						// Trate outros erros
						console.log('Erro ao enviar dados:', error);
						setModalError('Erro ao cadastrar usuário. Por favor, tente novamente.');
					}
				} else {
					console.log('Erro ao enviar dados:', error);
					setModalError('Erro ao cadastrar usuário.');
				}
			}
		}
	};
	

	const clearErrorMessage = (field) => {
    switch (field) {
      case 'email':
        setErroEmail(null);
        break;
      case 'nome':
        setErroNome(null);
        break;
      case 'nomeUser':
        setErroNomeUser(null);
        break;
      case 'telefone':
        setErroTelefone(null);
        break;
      case 'password':
        setErroPassword(null);
        break;
      case 'confirmPassword':
        setErroConfirmPassword(null);
        break;
      default:
        break;
    }
  };
	
	const validatePassword = () => {
		const regexUpperCase = /[A-Z]/;
		const regexLowerCase = /[a-z]/;
		const regexNumber = /\d/;
		const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
	
		const hasUpperCase = regexUpperCase.test(password);
		const hasLowerCase = regexLowerCase.test(password);
		const hasNumber = regexNumber.test(password);
		const hasSpecialChar = regexSpecialChar.test(password);

			if (password.length > 7 && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
				setPasswordStrength('Senha forte');
				setRectangleColors({
					rectangle1: '#47AF39',
					rectangle2: '#47AF39',
					rectangle3: '#47AF39',
				});
				setPasswordWarningColor('#47AF39');
			} else if (password.length > 7 && ((hasUpperCase && hasLowerCase) || (hasUpperCase && hasNumber) || (hasUpperCase && hasSpecialChar) || (hasLowerCase && hasNumber) || (hasLowerCase && hasSpecialChar) || (hasNumber && hasSpecialChar))) {
				setPasswordStrength('Senha média');
				setRectangleColors({
					rectangle1: '#F78223',
					rectangle2: '#F78223',
					rectangle3: '#B3B3B3',
				});
				setPasswordWarningColor('#F78223');
			} else if (password.length > 7 && (hasUpperCase || hasLowerCase || hasNumber || hasSpecialChar)) {
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

	return(
			<View style={styles.container}>
				<View style={styles.subContainer}>
				<KeyboardAwareScrollView
							behavior={Platform.OS === "ios" ? "padding" : "height"}
						>
							<View style={styles.frame}>
								<View style={{width:'80%'}}>
									<View style={{width:'100%', alignItems:'center'}}>
										<Text style={styles.title2}>Crie sua conta</Text>
										<Text style={styles.subtitle}>Cadastre-se</Text>
									</View>

									{modalError && (<ErrorMessage message={modalError} onClose={() => setModalError(null)}/>)}
								{/*Craindo Inputs*/}
									<Text style={styles.textCadastro}>Nome: </Text>
									<TextInput
									 style={styles.inputCadastro}
									 errorMessage={erroNome}
        					 onChangeText={value => setNome(value)}
									 onFocus={() => clearErrorMessage('nome')}
									 />
									 {erroNome ? <Text style={styles.erroMessage}>{erroNome}</Text> : null}

									<Text style={styles.textCadastro}>Nome de Usuário:</Text>
									<TextInput 
									style={styles.inputCadastro}
									errorMessage={erroNomeUser}
									onChangeText={value => setNomeUser(value)}
									onFocus={() => clearErrorMessage('nomeUser')}
									/>
									{erroNomeUser ? <Text style={styles.erroMessage}>{erroNomeUser}</Text> : null}

									<Text style={styles.textCadastro}>Email:</Text>
									<TextInput
										style={styles.inputCadastro}
										onChangeText={value => setEmail(value)}
										placeholder='xxxx123@gmail.com'
										keyboardType='email-address'
										placeholderTextColor="rgba(0, 0, 0, 0.4)"
										onFocus={() => clearErrorMessage('email')}
									/>
									{erroEmail ? <Text style={styles.erroMessage}>{erroEmail}</Text> : null}

									<Text style={styles.textCadastro}>Telefone:</Text>
									<TextInput
										style={styles.inputCadastro}
										keyboardType="phone-pad"
										value={telefone}
										onFocus={() => clearErrorMessage('telefone')}
										onChangeText={(value) => {
											let formattedValue = value.replace(/\D/g, ''); // remove non-digit characters
											if (formattedValue.length > 9) {
												formattedValue = formattedValue.replace(
													/^(\d{2})(\d{5})(\d{4}).*/,
													'($1) $2-$3'
												);
											} else if (formattedValue.length > 6) {
												formattedValue = formattedValue.replace(
													/^(\d{2})(\d{4,5})(\d{0,4}).*/,
													'($1) $2-$3'
												);
											} else if (formattedValue.length > 2) {
												formattedValue = formattedValue.replace(
													/^(\d{2})(\d{0,5}).*/,
													'($1) $2'
												);
											} else if(formattedValue.length === 1){
												formattedValue = '(' + formattedValue;
											}
												setTelefone(formattedValue);
											
										}}
									/>
              		{erroTelefone ? (<Text style={styles.erroMessage}>{erroTelefone}</Text>) : null}

									<Text style={styles.textCadastro}>Senha:</Text>
									<View style={styles.inputCadastro}>
       						 	<TextInput
										  onFocus={() => clearErrorMessage('password')}
									  	style={{width:'95%'}}
          						placeholder='• • • • • • • •'
        					  	secureTextEntry={!isPasswordVisible1} 
											placeholderTextColor="rgba(0, 0, 0, 0.4)"
											onChangeText={(value) => {
												setPassword(value)
												if (value.trim() !== '') {
													validatePassword();
												} else {
													setPasswordStrength(null);
												}
											}}
									  />	
       					 		<TouchableOpacity onPress={() => setIsPasswordVisible1(!isPasswordVisible1)}>
          						<Icon name={isPasswordVisible1 ? 'eye' : 'eye-slash'} size={20} color="rgba(0, 0, 0, 0.5)"/>
        						</TouchableOpacity>
      						</View>

									<View style={{alignItems:'flex-end', flexDirection:'row', justifyContent:'space-between'}}>
										<View style={{ flexDirection: 'row', marginTop: 5, alignItems:'center'}}>
											<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap:10}}>
											  {passwordStrength ? (<Text style={{ ...styles.erroMessage, color: passwordWarningColor }}>{passwordStrength}</Text>) : null}
												{password.length >= 8 && (
													<View style={{flexDirection:'row', gap:2, alignItems: 'center'}}>
														<View style={[styles.rectangle, { backgroundColor: rectangleColors.rectangle1 }]} />
														<View style={[styles.rectangle, { backgroundColor: rectangleColors.rectangle2 }]} />
														<View style={[styles.rectangle, { backgroundColor: rectangleColors.rectangle3 }]} />
													</View>
												)}
											</View>
										</View>
										<Text style={{color:'#999', fontFamily:'Varela-Round', fontSize:10}}>mínimo 8 caracteres</Text>
									</View>
									{erroPassword ? (<Text style={styles.erroMessage}>{erroPassword}</Text>) : null}

									<Text style={styles.textCadastro}>Confirmar Senha:</Text>
									<View style={styles.inputCadastro}>
        						<TextInput
										 onFocus={() => clearErrorMessage('confirmPassword')}
          						style={{width:'95%'}}
          						placeholder='• • • • • • • •'
         						  secureTextEntry={!isPasswordVisible2}
											placeholderTextColor="rgba(0, 0, 0, 0.4)"
											onChangeText={value => setConfirmPassword(value)}/>
        							<TouchableOpacity onPress={() => setIsPasswordVisible2(!isPasswordVisible2)}>
         							 <Icon name={isPasswordVisible2 ? 'eye' : 'eye-slash'} size={20} color="rgba(0, 0, 0, 0.5)"/>
        							</TouchableOpacity>
      						</View>
									{erroConfirmPassword ? (<Text style={styles.erroMessage}>{erroConfirmPassword}</Text>) : null}

									<View style={{width:'100%', alignItems:'center'}}>
										<TouchableOpacity style={styles.buttonCadastro} onPress={() => createUser()}>
												<Text style={{fontFamily:'Varela-Round', color:'#FFFFFF', fontSize:15, justifyContent:'center'}}>Confirmar</Text>
										</TouchableOpacity>

										<View style={{width:'85%', flexDirection:'row', justifyContent:'space-between',marginTop:'5%'}}>
											<Text style={{fontSize:13, color:'#3B267B', fontFamily:'Varela-Round'}}>Já possui uma conta?</Text>
											<TouchableOpacity style={{alignItems:'center'}} onPress={() => navigation.navigate('Login')}>
												<Text style={{fontSize:13, fontFamily:'Varela-Round'}}>entre aqui</Text>
												<View style={{width:60, height:1.5, backgroundColor:"#FF7300", borderRadius:100}}></View>
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</View>
						</KeyboardAwareScrollView>
				</View>
			</View>
		);
	}