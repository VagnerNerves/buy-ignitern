import { useState } from 'react'
import { View, Image, TouchableOpacity, Text, FlatList } from 'react-native'

import { styles } from './style'

import { FilterStatus } from '@/types/FilterStatus'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { Item } from '@/components/Item'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
const ITEMS = [
  {
    id: '1',
    status: FilterStatus.DONE,
    description: '1 pacote de café'
  },
  {
    id: '2',
    status: FilterStatus.PENDING,
    description: '3 pacotes de macarrão'
  },
  {
    id: '3',
    status: FilterStatus.PENDING,
    description: '3 cebolas'
  }
]

export function Home() {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING)

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
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={ITEMS}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Item
              key={item.id}
              data={item}
              onStatus={() => console.log('status')}
              onRemove={() => console.log('remove')}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui.</Text>
          )}
        />
      </View>
    </View>
  )
}
