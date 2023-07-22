import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { Link } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Switch } from 'react-native-gesture-handler'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

export default function NewMemories() {
  const { bottom, top } = useSafeAreaInsets()

  const [isPublic, setIsPublic] = useState(false)
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState<null | string>(null)

  async function openImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      })

      if (result.assets[0]) {
        setPreview(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleCreateMemory() {
    openImagePicker()
  }

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NLWLogo />
        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-red-500">
            <Icon name="arrow-left" size={16} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
            trackColor={{ false: '#767577', true: '#372560' }}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>
        <TouchableOpacity
          onPress={openImagePicker}
          activeOpacity={0.7}
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
        >
          {preview ? (
            <Image
              source={{ uri: preview }}
              className="h-full w-full rounded-lg object-cover "
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" color="#fff" />
              <Text className="font-body text-sm text-gray-200">
                Adicionar foto ou video de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          multiline
          value={content}
          onChangeText={setContent}
          className="p-0 font-body text-lg text-gray-50"
          placeholder="Fique livre para adicionar fotos, videos e relatos sobre essa experiência que vocẽ quer lembrar para sempre"
          placeholderTextColor="#56565a"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="items-center rounded-full bg-green-500 px-5 py-2"
        >
          <Text
            onPress={handleCreateMemory}
            className="font-alt text-sm uppercase text-black"
          >
            Salvar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
