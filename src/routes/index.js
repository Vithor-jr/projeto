import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { SvgXml } from 'react-native-svg';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';

import Create from '../pages/create';
import Google from '../pages/login/google';
import Login from '../pages/login';
import Request from '../pages/resetPassword/request';
import SplashScreen from '../pages/splash';
import UpdatePassword from '../pages/resetPassword/update';

import Chat from '../pages/Home/Chat';
import Cronograma from '../pages/Home/Cronograma';
import HomeScreen from '../pages/Home/HomeScreen';
import Mind from '../pages/Home/mind';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const svgIconHomeActive = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 28 32" fill="none">
    <path d="M14.764 6.73352L14.7621 6.73186C14.0437 6.08938 12.9512 6.08938 12.2328 6.73186L12.231 6.73352L2.69203 15.3217C1.79579 16.1172 2.34671 17.6236 3.5682 17.6236H4.7584V24.8592C4.7584 25.9012 5.60807 26.75 6.64969 26.75H10.0736C11.1152 26.75 11.9649 25.9012 11.9649 24.8592V19.9052H15.0301V24.8592C15.0301 25.9012 15.8797 26.75 16.9214 26.75H20.3452C21.3869 26.75 22.2365 25.9012 22.2365 24.8592V17.6236H23.4267C24.6135 17.6236 25.2396 16.1357 24.2995 15.3186L14.764 6.73352Z" fill="white" stroke="white" stroke-width="1.5"/>
  </svg>
`;

const svgIconHomeInactive = `
	<svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">
		<path d="M13.764 1.73352L13.7621 1.73186C13.0437 1.08938 11.9512 1.08938 11.2328 1.73186L11.231 1.73352L1.69203 10.3217C0.795789 11.1172 1.34671 12.6236 2.5682 12.6236H3.7584V19.8592C3.7584 20.9012 4.60807 21.75 5.64969 21.75H9.07358C10.1152 21.75 10.9649 20.9012 10.9649 19.8592V14.9052H14.0301V19.8592C14.0301 20.9012 14.8797 21.75 15.9214 21.75H19.3452C20.3869 21.75 21.2365 20.9012 21.2365 19.8592V12.6236H22.4267C23.6135 12.6236 24.2396 11.1357 23.2995 10.3186L13.764 1.73352Z" fill="#6048AC" stroke="#6048AC" stroke-width="1.5"/>
	</svg>
`;

const svgIconChatActive = `
	<svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 25 22" fill="none">
		<path d="M2.5 2.13668H22.5V14.9568H3.9625L2.5 16.2067V2.13668ZM2.5 0C1.125 0 0.0125 0.961506 0.0125 2.13668L0 21.3668L5 17.0934H22.5C23.875 17.0934 25 16.1319 25 14.9568V2.13668C25 0.961506 23.875 0 22.5 0H2.5ZM5 10.6834H15V12.8201H5V10.6834ZM5 7.47838H20V9.61506H5V7.47838ZM5 4.27336H20V6.41004H5V4.27336Z" fill="white"/>
	</svg>
`;

const svgIconChatInactive = `
	<svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 25 22" fill="none">
		<path d="M2.5 2.13668H22.5V14.9568H3.9625L2.5 16.2067V2.13668ZM2.5 0C1.125 0 0.0125 0.961506 0.0125 2.13668L0 21.3668L5 17.0934H22.5C23.875 17.0934 25 16.1319 25 14.9568V2.13668C25 0.961506 23.875 0 22.5 0H2.5ZM5 10.6834H15V12.8201H5V10.6834ZM5 7.47838H20V9.61506H5V7.47838ZM5 4.27336H20V6.41004H5V4.27336Z" fill="#6048AC"/>
	</svg>
`;

const svgIconCronogramaInactive = `
	<svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
		<path d="M10.875 6.875H15.7083C16.3729 6.875 16.9167 6.40625 16.9167 5.83333C16.9167 5.26042 16.3729 4.79167 15.7083 4.79167H10.875C10.2104 4.79167 9.66667 5.26042 9.66667 5.83333C9.66667 6.40625 10.2104 6.875 10.875 6.875ZM10.875 11.0417H15.7083C16.3729 11.0417 16.9167 10.5729 16.9167 10C16.9167 9.42708 16.3729 8.95833 15.7083 8.95833H10.875C10.2104 8.95833 9.66667 9.42708 9.66667 10C9.66667 10.5729 10.2104 11.0417 10.875 11.0417ZM10.875 15.2083H15.7083C16.3729 15.2083 16.9167 14.7396 16.9167 14.1667C16.9167 13.5937 16.3729 13.125 15.7083 13.125H10.875C10.2104 13.125 9.66667 13.5937 9.66667 14.1667C9.66667 14.7396 10.2104 15.2083 10.875 15.2083ZM4.83333 4.79167H7.25V6.875H4.83333V4.79167ZM4.83333 8.95833H7.25V11.0417H4.83333V8.95833ZM4.83333 13.125H7.25V15.2083H4.83333V13.125ZM20.5417 0.625H1.20833C0.54375 0.625 0 1.09375 0 1.66667V18.3333C0 18.9062 0.54375 19.375 1.20833 19.375H20.5417C21.2063 19.375 21.75 18.9062 21.75 18.3333V1.66667C21.75 1.09375 21.2063 0.625 20.5417 0.625ZM19.3333 17.2917H2.41667V2.70833H19.3333V17.2917Z" fill="#6048AC"/>
	</svg>
`;

const svgIconCronogramaActive = `
	<svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
		<path d="M10.875 6.875H15.7083C16.3729 6.875 16.9167 6.40625 16.9167 5.83333C16.9167 5.26042 16.3729 4.79167 15.7083 4.79167H10.875C10.2104 4.79167 9.66667 5.26042 9.66667 5.83333C9.66667 6.40625 10.2104 6.875 10.875 6.875ZM10.875 11.0417H15.7083C16.3729 11.0417 16.9167 10.5729 16.9167 10C16.9167 9.42708 16.3729 8.95833 15.7083 8.95833H10.875C10.2104 8.95833 9.66667 9.42708 9.66667 10C9.66667 10.5729 10.2104 11.0417 10.875 11.0417ZM10.875 15.2083H15.7083C16.3729 15.2083 16.9167 14.7396 16.9167 14.1667C16.9167 13.5937 16.3729 13.125 15.7083 13.125H10.875C10.2104 13.125 9.66667 13.5937 9.66667 14.1667C9.66667 14.7396 10.2104 15.2083 10.875 15.2083ZM4.83333 4.79167H7.25V6.875H4.83333V4.79167ZM4.83333 8.95833H7.25V11.0417H4.83333V8.95833ZM4.83333 13.125H7.25V15.2083H4.83333V13.125ZM20.5417 0.625H1.20833C0.54375 0.625 0 1.09375 0 1.66667V18.3333C0 18.9062 0.54375 19.375 1.20833 19.375H20.5417C21.2063 19.375 21.75 18.9062 21.75 18.3333V1.66667C21.75 1.09375 21.2063 0.625 20.5417 0.625ZM19.3333 17.2917H2.41667V2.70833H19.3333V17.2917Z" fill="white"/>
	</svg>
`;

const svgIconMindInactive = `
	<svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18" fill="none">
		<path d="M10.7513 17.5017C10.6197 17.5025 10.4893 17.4772 10.3674 17.4274C10.2456 17.3777 10.1348 17.3043 10.0413 17.2116L2.27134 9.42985C1.2967 8.44481 0.75 7.11489 0.75 5.72901C0.75 4.34313 1.2967 3.01322 2.27134 2.02817C3.2536 1.04846 4.58417 0.498291 5.97134 0.498291C7.3585 0.498291 8.68907 1.04846 9.67134 2.02817L10.7513 3.10841L11.8313 2.02817C12.8136 1.04846 14.1442 0.498291 15.5313 0.498291C16.9185 0.498291 18.2491 1.04846 19.2313 2.02817C20.206 3.01322 20.7527 4.34313 20.7527 5.72901C20.7527 7.11489 20.206 8.44481 19.2313 9.42985L11.4613 17.2116C11.3679 17.3043 11.2571 17.3777 11.1352 17.4274C11.0134 17.4772 10.8829 17.5025 10.7513 17.5017Z" fill="#6048AC"/>
	</svg>
`

const svgIconMindActive = `
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0.5 0 21 18" fill="none">
		<path d="M10.7513 17.5017C10.6197 17.5025 10.4893 17.4772 10.3674 17.4274C10.2456 17.3777 10.1348 17.3043 10.0413 17.2116L2.27134 9.42985C1.2967 8.44481 0.75 7.11489 0.75 5.72901C0.75 4.34313 1.2967 3.01322 2.27134 2.02817C3.2536 1.04846 4.58417 0.498291 5.97134 0.498291C7.3585 0.498291 8.68907 1.04846 9.67134 2.02817L10.7513 3.10841L11.8313 2.02817C12.8136 1.04846 14.1442 0.498291 15.5313 0.498291C16.9185 0.498291 18.2491 1.04846 19.2313 2.02817C20.206 3.01322 20.7527 4.34313 20.7527 5.72901C20.7527 7.11489 20.206 8.44481 19.2313 9.42985L11.4613 17.2116C11.3679 17.3043 11.2571 17.3777 11.1352 17.4274C11.0134 17.4772 10.8829 17.5025 10.7513 17.5017Z" fill="white"/>
	</svg>
`

const svgIconGrafics = `
	<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
		<rect x="6.51514" y="4.79443" width="2" height="9.3625" rx="1" fill="white"/>
		<rect x="3.51514" y="6.875" width="2" height="7.28194" rx="1" fill="white"/>
		<rect x="0.515137" y="8.95557" width="2" height="5.20139" rx="1" fill="white"/>
		<rect x="9.51514" y="2.71399" width="2" height="11.4431" rx="1" fill="white"/>
		<rect x="12.5151" y="0.633301" width="2" height="13.5236" rx="1" fill="white"/>
	</svg>
`

const svgIconTemporizador = `
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
		<path d="M11.0578 10.3146L8.27821 8.73157V5.14598C8.27821 4.82938 8.01427 4.57609 7.68434 4.57609H7.63485C7.30492 4.57609 7.04098 4.82938 7.04098 5.14598V8.88196C7.04098 9.15899 7.18945 9.42019 7.44514 9.56267L10.4557 11.2961C10.7362 11.4544 11.0991 11.3752 11.2641 11.1061C11.4373 10.8291 11.3465 10.4729 11.0578 10.3146ZM15.4376 2.20944L12.8972 0.18315C12.5508 -0.0938819 12.0311 -0.054306 11.7342 0.286048C11.4455 0.618486 11.495 1.11714 11.8414 1.40209L14.3736 3.42838C14.72 3.70542 15.2397 3.66584 15.5366 3.32549C15.8336 2.99305 15.7841 2.49439 15.4376 2.20944ZM1.34972 3.42838L3.88192 1.40209C4.23659 1.11714 4.28608 0.618486 3.98914 0.286048C3.70046 -0.054306 3.18082 -0.0938819 2.8344 0.18315L0.293952 2.20944C-0.0524728 2.49439 -0.101962 2.99305 0.194973 3.32549C0.48366 3.66584 1.0033 3.70542 1.34972 3.42838ZM7.8658 1.41001C3.76644 1.41001 0.442419 4.59983 0.442419 8.53369C0.442419 12.4675 3.76644 15.6574 7.8658 15.6574C11.9652 15.6574 15.2892 12.4675 15.2892 8.53369C15.2892 4.59983 11.9652 1.41001 7.8658 1.41001ZM7.8658 14.0743C4.68199 14.0743 2.09206 11.589 2.09206 8.53369C2.09206 5.47842 4.68199 2.99305 7.8658 2.99305C11.0496 2.99305 13.6395 5.47842 13.6395 8.53369C13.6395 11.589 11.0496 14.0743 7.8658 14.0743Z" fill="white"/>
	</svg>
`

const svgIconCategorias = `
	<svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
		<rect x="0.515137" y="9.71838" width="7.41051" height="7.63439" rx="2" fill="white"/>
		<rect x="8.74902" y="9.71838" width="7.41051" height="7.63439" rx="2" fill="white"/>
		<rect x="0.515137" y="1.23547" width="7.41051" height="7.63439" rx="2" fill="white"/>
		<rect width="6.61596" height="6.758" rx="2" transform="matrix(0.921646 -0.388032 0.368736 0.929534 7.92578 3.27539)" fill="white"/>
	</svg>
`

const svgGradient = `
	<svg xmlns="http://www.w3.org/2000/svg" width="105" height="105" viewBox="0 0 105 105" fill="none">
		<path d="M103.5 52.625C103.5 80.5099 80.6797 103.139 52.5 103.139C24.3203 103.139 1.5 80.5099 1.5 52.625C1.5 24.74 24.3203 2.11108 52.5 2.11108C80.6797 2.11108 103.5 24.74 103.5 52.625Z" fill="#D9D9D9" stroke="url(#paint0_linear_123_81)" stroke-width="3"/>
		<defs>
			<linearGradient id="paint0_linear_123_81" x1="61" y1="12.0541" x2="106.975" y2="70.8685" gradientUnits="userSpaceOnUse">
				<stop stop-color="#950397"/>
				<stop offset="1" stop-color="#1D63A7"/>
			</linearGradient>
		</defs>
	</svg>
`

const svgLogout = `
	<svg xmlns="http://www.w3.org/2000/svg" height="490pt" viewBox="0 -10 490.66667 490" width="490pt">
		<path d="m474.667969 251h-309.335938c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h309.335938c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" fill="white"/>
		<path d="m250.667969 336.332031c-4.097657 0-8.191407-1.554687-11.308594-4.691406l-85.332031-85.332031c-6.25-6.253906-6.25-16.386719 0-22.636719l85.332031-85.332031c6.25-6.25 16.382813-6.25 22.636719 0 6.25 6.25 6.25 16.382812 0 22.632812l-74.027344 74.027344 74.027344 74.027344c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.234375 4.671875-11.328125 4.671875zm0 0" fill="white"/>
		<path d="m234.667969 469.667969c-129.386719 0-234.667969-105.28125-234.667969-234.667969s105.28125-234.667969 234.667969-234.667969c97.085937 0 182.804687 58.410157 218.410156 148.824219 3.242187 8.210938-.8125 17.492188-9.023437 20.753906-8.214844 3.203125-17.496094-.789062-20.757813-9.042968-30.742187-78.082032-104.789063-128.535157-188.628906-128.535157-111.746094 0-202.667969 90.925781-202.667969 202.667969s90.921875 202.667969 202.667969 202.667969c83.839843 0 157.886719-50.453125 188.628906-128.511719 3.242187-8.257812 12.523437-12.246094 20.757813-9.046875 8.210937 3.242187 12.265624 12.542969 9.023437 20.757813-35.605469 90.390624-121.324219 148.800781-218.410156 148.800781zm0 0" fill="white"/>
	</svg>
`

const BottomTabNavigator = () => (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: 'white',
      	tabBarInactiveTintColor: 'purple',
				tabBarStyle: {
        	backgroundColor: '#F3F3F3',
        	borderTopLeftRadius: 30, 
        	borderTopRightRadius: 30,
					height: 75,
					position: 'absolute',
				},
				tabBarHideOnKeyboard: true
			}}
		>
			<Tab.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarIcon: ({ focused }) => (
					<View style={{ 
						alignItems:'center',
						justifyContent: 'center',
						backgroundColor: focused ? '#6048AC' : 'transparent', 
						borderRadius: 50,
						padding:10,
					}}>
						<SvgXml xml={focused ? svgIconHomeActive : svgIconHomeInactive} width="30" height="30" />
					</View>
				),
      }}
			/>

			<Tab.Screen
				name="Chat"
				component={Chat}
				options={{
					headerShown: false,
					tabBarLabel: () => null,
					tabBarIcon: ({ focused }) => (
						<View style={{ 
							alignItems:'center',
							justifyContent: 'center',
							backgroundColor: focused ? '#6048AC' : 'transparent',
							paddingTop: 13, 
							borderRadius: 50,
							padding:12,
							
						}}>
							<SvgXml xml={focused ? svgIconChatActive : svgIconChatInactive} width="25" height="25" />
						</View>
					),
				}}
			/>

			<Tab.Screen 
				name="Cronograma"
				component={Cronograma}	
				options={{
					headerShown: false,
					tabBarLabel: () => null,
					tabBarIcon: ({ focused }) => (
						<View style={{ 
							alignItems:'center',
							justifyContent: 'center',
							backgroundColor: focused ? '#6048AC' : 'transparent', 
							borderRadius: 50,
							padding:12,
						}}>
							<SvgXml xml={focused ? svgIconCronogramaActive : svgIconCronogramaInactive} width="25" height="25" />
						</View>
					),
				}}
			/>

			<Tab.Screen
				name="Mind"
				component={Mind}
				options={{ 
					headerShown: false,
					tabBarLabel: () => null,
					tabBarIcon: ({ focused }) => (
						<View style={{ 
							alignItems:'center',
							justifyContent: 'center',
							backgroundColor: focused ? '#6048AC' : 'transparent', 
							borderRadius: 50,
							padding:12,
						}}>
							<SvgXml xml={focused ? svgIconMindActive : svgIconMindInactive} width="27" height="27" />
						</View>
					),
				}}
			/>
		</Tab.Navigator>
);

const AppDrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
			drawerStyle: {
				backgroundColor:  '#6048AC' ,
				width: '60%', 
				borderTopRightRadius: 70,
				borderBottomRightRadius: 70,
				marginBottom: 10,
				marginTop: 10,
			},
  }}
    drawerContent={(props) => <DrawerContent {...props} />}
  >
    <Drawer.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }}/>
  </Drawer.Navigator>
);

const DrawerContent = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
			<View style={{marginVertical:20, borderRadius:50}}>
				<View>
					<View style={{ width: "100%", alignItems: 'center', justifyContent: 'center', gap:5, borderBottomColor: 'rgba(255, 255, 255, 0.18)', borderBottomWidth: 1, paddingBottom:20}}>
						<View style={{width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}>
							<SvgXml xml={svgGradient} width="100%" height="100%" />
							<Image
								source={{uri: 'https://www.emath.be/uploads/7/3/9/1/73911267/published/no-profil.png?1608697745'}}
								style={{
									width: '95%',
									height: '95%',
									borderRadius: 50,
									position: 'absolute',
								}}
							/>
						</View>
						<Text style={{color: '#FFF', fontFamily: 'Varela-Round', fontSize: 15}}>
								Usuário
						</Text>
						<TouchableOpacity>
							<Text style={{color: '#FFF', fontFamily: 'Varela-Round', fontSize: 10, borderWidth: 1, borderColor: 'white', borderRadius:20, paddingHorizontal:7}}>
								editar perfil
							</Text>
						</TouchableOpacity>
					</View>
					
					<View style={{paddingEnd:20, marginTop:30}}>
						<DrawerItem
								label={() => (
									<View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: 'rgba(255, 255, 255, 0.18)', borderBottomWidth: 1, paddingBottom:4}}>
										<SvgXml xml={svgIconGrafics} width={14} height={14}/>
										<Text style={{ color: 'white', fontFamily: 'Varela-Round', fontSize: 15, marginStart:10 }}>Gráficos</Text>
									</View>
								)}
								onPress={() => navigation.navigate('Home')}
							/>

							<DrawerItem
								label={() => (
									<View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: 'rgba(255, 255, 255, 0.18)', borderBottomWidth: 1, paddingBottom:4}}>
										<SvgXml xml={svgIconTemporizador} width={14} height={14}/>
										<Text style={{ color: 'white', fontFamily: 'Varela-Round', fontSize: 15, marginStart:10 }}>Temporizador</Text>
									</View>
								)}
								onPress={() => navigation.navigate('Home')} 
							/>

							<DrawerItem
								label={() => (
									<View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: 'rgba(255, 255, 255, 0.18)', borderBottomWidth: 1, paddingBottom:4}}>
										<SvgXml xml={svgIconCategorias} width={14} height={14}/>
										<Text style={{ color: 'white', fontFamily: 'Varela-Round', fontSize: 15, marginStart:10 }}>Categoria</Text>
									</View>
								)}
								onPress={() => navigation.navigate('Home')}
							/>
					</View>
				</View>

				<View style={{marginTop:'120%'}}>
						<TouchableOpacity style={{flexDirection:'row', gap:5, alignItems:'center', marginStart:20}}>
							<SvgXml xml={svgLogout} width={25} height={25}/>
							<Text style={{color:'white', fontFamily:'Varela-Round', fontSize: 15}}>Sair do app</Text>
						</TouchableOpacity>
				</View>
			</View>
    </DrawerContentScrollView>
  );
};

const Routes = () => (
  <Stack.Navigator initialRouteName="Splash">
    <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Menu" component={AppDrawerNavigator} options={{ headerShown: false }} />
		<Stack.Screen name="Chat"	component={Chat} options={{headerShown: false}} />
		<Stack.Screen name="Google" component={Google} options={{ headerShown: false }} />
		<Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
		<Stack.Screen name="Create" component={Create} options={{headerShown: false}} />
		<Stack.Screen	name="Request" component={Request} options={{headerShown: false}} />
		<Stack.Screen name="UpdatePassword" component={UpdatePassword} options={{headerShown: false}} />
  </Stack.Navigator>
);

export default Routes;