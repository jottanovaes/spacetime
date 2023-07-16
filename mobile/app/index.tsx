import { useEffect } from 'react'
import { styled } from 'nativewind'
import { StatusBar } from 'expo-status-bar'
import * as SecureStore from 'expo-secure-store'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { api } from '../src/lib/api'
import blur_bg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { useRouter } from 'expo-router'

const StyledStripes = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/f6f73a3cb7e25c003297',
}

export default function App() {
  const router = useRouter()
  const [hasFontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })
  const [, response, signinWithGitHub] = useAuthRequest(
    {
      clientId: 'f6f73a3cb7e25c003297',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )
  async function handleGitHubOAuthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })
    const { token } = response.data

    await SecureStore.setItemAsync('token', token)

    router.push('/memories')
  }
  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params
      handleGitHubOAuthCode(code)
    }
  }, [response])

  if (!hasFontsLoaded) return null

  return (
    <ImageBackground
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
      source={blur_bg}
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />
        <View className="space-y-2">
          <Text className="font-tile text-center text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="font-ody text-center text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
        >
          <Text
            className="font-alt text-sm uppercase text-black"
            onPress={() => signinWithGitHub()}
          >
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
