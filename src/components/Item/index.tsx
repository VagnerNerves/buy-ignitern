import { Text, TouchableOpacity, View } from 'react-native'

import { Trash2 } from 'lucide-react-native'

import { styles } from './styles'

import type { FilterStatus } from '@/types/FilterStatus'

import { StatusIcon } from '../StatusIcon'

type ItemDataProps = {
  status: FilterStatus
  description: string
}

type ItemProps = Readonly<{
  data: ItemDataProps
  onStatus: () => void
  onRemove: () => void
}>
export function Item({ data, onStatus, onRemove }: ItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <Trash2 size={18} color="#828282" />
      </TouchableOpacity>
    </View>
  )
}
