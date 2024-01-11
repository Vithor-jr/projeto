import React from 'react';
import { SvgXml} from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { 
  View, 
  Text,
  TouchableOpacity, 
  Dimensions,
  Image
} from 'react-native';
import {styles as estilo} from '../Home/styles'

const { width, height} = Dimensions.get("window");

const svgDrawer = `
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="0 0 28 21" fill="none">
   <path d="M1.55556 21H11.849C12.7045 21 12.8333 20.2125 12.8333 19.25C12.8333 18.2875 12.7045 17.5 11.849 17.5H1.55556C0.7 17.5 0 18.2875 0 19.25C0 20.2125 0.7 21 1.55556 21ZM1.55556 12.25H19.8333C20.6889 12.25 21.5833 11.4625 21.5833 10.5C21.5833 9.5375 20.6889 8.75 19.8333 8.75H1.55556C0.7 8.75 0 9.5375 0 10.5C0 11.4625 0.7 12.25 1.55556 12.25ZM0 1.75C0 2.7125 0.7 3.5 1.55556 3.5H26.4444C27.3 3.5 28 2.7125 28 1.75C28 0.7875 27.3 0 26.4444 0H1.55556C0.7 0 0 0.7875 0 1.75Z" fill="white"/>
  </svg>
`

const svgFundo = `
  <svg xmlns="http://www.w3.org/2000/svg" width="360" height="599" viewBox="0 0 360 599" fill="none">
    <g filter="url(#filter0_i_148_29)">
      <path d="M0 24.5441C0 -5.4118 360 -11 360 29.5C360 70 360 599.001 360 599.001H0C0 599.001 0 54.5 0 24.5441Z" fill="white"/>
    </g>
    <defs>
      <filter id="filter0_i_148_29" x="-50%" y="-50%" width="200%" height="200%">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="5"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.215736 0 0 0 0 0.215736 0 0 0 0 0.215736 0 0 0 0.5 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_148_29"/>
      </filter>
    </defs>
  </svg>
`

const svgAdd = `
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
    <path d="M15.5789 9.14286H9.58702V14.8571C9.58702 15.4857 9.04775 16 8.38864 16C7.72954 16 7.19027 15.4857 7.19027 14.8571V9.14286H1.19838C0.53927 9.14286 0 8.62857 0 8C0 7.37143 0.53927 6.85714 1.19838 6.85714H7.19027V1.14286C7.19027 0.514286 7.72954 0 8.38864 0C9.04775 0 9.58702 0.514286 9.58702 1.14286V6.85714H15.5789C16.238 6.85714 16.7773 7.37143 16.7773 8C16.7773 8.62857 16.238 9.14286 15.5789 9.14286Z" fill="#6048AC"/>
    <path opacity="0.87" d="M0 16L0 0L17 0V16H0Z" fill="white" fill-opacity="0.2"/>
  </svg>
`

const svgPoints = `
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
  <path d="M2.25008 7.16663C1.10425 7.16663 0.166748 7.99163 0.166748 8.99996C0.166748 10.0083 1.10425 10.8333 2.25008 10.8333C3.39591 10.8333 4.33341 10.0083 4.33341 8.99996C4.33341 7.99163 3.39591 7.16663 2.25008 7.16663ZM14.7501 7.16663C13.6042 7.16663 12.6667 7.99163 12.6667 8.99996C12.6667 10.0083 13.6042 10.8333 14.7501 10.8333C15.8959 10.8333 16.8334 10.0083 16.8334 8.99996C16.8334 7.99163 15.8959 7.16663 14.7501 7.16663ZM8.50008 7.16663C7.35425 7.16663 6.41675 7.99163 6.41675 8.99996C6.41675 10.0083 7.35425 10.8333 8.50008 10.8333C9.64591 10.8333 10.5834 10.0083 10.5834 8.99996C10.5834 7.99163 9.64591 7.16663 8.50008 7.16663Z" fill="#6048AC"/>
  <path opacity="0.87" d="M0 16L0 0L17 0V16H0Z" fill="white" fill-opacity="0.2"/>
  </svg>
`

export default function HomeScreen() {
  const navigate = useNavigation();

  return (
    <View style={{ backgroundColor: '#6048AC', flex: 1 }}>
      <View style={{ height: '30%', width: '100%', padding: 20 }}>
        <TouchableOpacity onPress={() => navigate.openDrawer()}>
          <SvgXml xml={svgDrawer} width={28} height={21} />
        </TouchableOpacity>

        <View style={{height: '30%', width:'100%', alignItems:'center'}}>
          <Text style={estilo.hello}>Olá, user</Text>

          <View style={estilo.frameTop}>
            <View style={estilo.frameToptext}>
              <Text style={estilo.today}>Hoje</Text>
              <Text style={estilo.activitys}>0/0 tarefas</Text>
            </View>
            <Image
              source={require('../Home/Home.png')}
              style={{width:120, height:92.16, borderRadius:10}}
              />
          </View>
        </View>
      </View>

      <View style={estilo.container}>
        <SvgXml xml={svgFundo} width="100%" height="100%" />
        <View style={{position: 'absolute', paddingVertical:30, paddingHorizontal:20, width:'100%'}}>
          <View style={estilo.top}>
            <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
              <Text style={estilo.pFazer}>Para fazer</Text>
              <Text style={estilo.qtdAtv}>0</Text>
            </View>

            <View style={{alignItems:'center', flexDirection:'row', gap:13}}>
              <TouchableOpacity>
                <SvgXml xml={svgAdd} width={17} height={16}/>
              </TouchableOpacity>

              <TouchableOpacity>
                <SvgXml xml={svgPoints} width={17} height={16}/>   
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
