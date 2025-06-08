import { View, Image } from 'react-native'

import { styles } from './style'

import { Button } from '@/components/Button'

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <Button title="Adicionar" />
    </View>
  )
}
