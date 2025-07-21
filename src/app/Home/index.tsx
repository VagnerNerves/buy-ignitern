import { useState } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Alert
} from 'react-native'

import { styles } from './style'

import { FilterStatus } from '@/types/FilterStatus'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { Item } from '@/components/Item'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
// const ITEMS = [
//   {
//     id: '1',
//     status: FilterStatus.DONE,
//     description: '1 pacote de café'
//   },
//   {
//     id: '2',
//     status: FilterStatus.PENDING,
//     description: '3 pacotes de macarrão'
//   },
//   {
//     id: '3',
//     status: FilterStatus.PENDING,
//     description: '3 cebolas'
//   }
// ]

export function Home() {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING)
  const [description, setDescription] = useState('')
  const [itens, setItens] = useState<any>([])

  function handleAdd() {
    if (!description.trim()) {
      return Alert.alert('Adicionar', 'Informe a descrição para adicionar.')
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description: description.trim(),
      status: FilterStatus.PENDING
    }

    setItens(prevState => [...prevState, newItem])
  }

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map(status => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)} // TODO: Fazer verificação para só executar se o filtro for diferente
            />
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={itens}
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
