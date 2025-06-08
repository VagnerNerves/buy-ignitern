import { View, Image } from 'react-native'

import { styles } from './style'

import { FilterStatus } from '@/types/FilterStatus'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Adicionar" />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map(status => (
            <Filter key={status} status={status} isActive={true} />
          ))}
        </View>
      </View>
    </View>
  )
}
