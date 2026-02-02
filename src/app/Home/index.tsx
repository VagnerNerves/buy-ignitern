import { useState, useEffect } from 'react'
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

import { itemsStorage, type ItemStorage } from '@/storage/itemsStorage'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { Item } from '@/components/Item'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING)
  const [description, setDescription] = useState('')
  const [itens, setItens] = useState<ItemStorage[]>([])

  async function handleAdd() {
    if (!description.trim()) {
      return Alert.alert('Adicionar', 'Informe a descrição para adicionar.')
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description: description.trim(),
      status: FilterStatus.PENDING
    }

    await itemsStorage.add(newItem)
    await itemsByStatus()

    Alert.alert('Adicionado', `Adicionado ${description}`)
    setFilter(FilterStatus.PENDING)
    setDescription('')
  }

  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter)
      setItens(response)
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Não foi possível filtrar os itens')
    }
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id)
      await itemsByStatus()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover', 'Não foi possível remover.')
    }
  }

  function handleClear() {
    Alert.alert('Limpar', 'Deseja remover todos?', [
      {
        text: 'Não',
        style: 'cancel'
      },
      { text: 'Sim', onPress: () => onClear() }
    ])
  }

  async function onClear() {
    try {
      await itemsStorage.clear()
      setItens([])
    } catch (error) {
      console.log(error)
      Alert.alert('Limpar', 'Não foi possível remover todos os itens.')
    }
  }

  useEffect(() => {
    itemsByStatus()
  }, [filter])

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
          value={description}
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

          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
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
              onRemove={() => handleRemove(item.id)}
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
