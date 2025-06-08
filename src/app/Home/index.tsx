import { View, Image } from 'react-native'

import { styles } from './style'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <Input placeholder="O que você precisa comprar?" />

      <Button title="Adicionar" />
    </View>
  )
}
