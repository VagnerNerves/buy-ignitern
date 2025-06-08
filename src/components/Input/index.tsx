import { TextInput, type TextInputProps } from 'react-native'

import { styles } from './styles'

type InputProps = Readonly<TextInputProps>
export function Input({ ...rest }: InputProps) {
  return <TextInput style={styles.container} {...rest} />
}
