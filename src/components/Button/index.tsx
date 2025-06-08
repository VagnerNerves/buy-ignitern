import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps
} from 'react-native'

import { styles } from './styles'

type ButtonProps = TouchableOpacityProps &
  Readonly<{
    title: string
  }>
export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}
