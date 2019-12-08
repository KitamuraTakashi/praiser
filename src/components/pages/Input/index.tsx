import * as React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import IconButton from '../../atoms/IconButton'
import SafeAreaView from 'react-native-safe-area-view'
import { useNavigation } from 'react-navigation-hooks'
import useTextInput from '../../../lib/hooks/use-TextInput'
import useNetworker from '../../../lib/hooks/use-networker'
import { userContext } from '../../../contexts'
import TextField, { dismiss } from '../../atoms/TextField'
import Button from '../../atoms/Button'
import { COLOR } from '../../../constants'
import { Todo } from '../../../domain/entities'
import testIDs from '../../../constants/testIDs'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: COLOR.MAIN,
  },
  text: {
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
})

interface Props {
  actions: {
    addTodo: (userId: string, newValues: Todo.Values) => void
  }
}

export default function Input(props: Props) {
  const { goBack } = useNavigation()
  const { actions } = props
  const title = useTextInput('')
  const detail = useTextInput('')
  const networker = useNetworker()
  const { userState } = React.useContext(userContext)
  const back = React.useCallback(() => {
    goBack()
  }, [goBack])
  const addTodo = React.useCallback(async () => {
    await networker(async () => {
      actions.addTodo(userState.id, { title: title.value, detail: detail.value })
      back()
      title.onChangeText('')
      detail.onChangeText('')
    })
  }, [networker, actions, userState.id, detail, title])

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismiss} testID={testIDs.TODO_INPUT_DISMISS}>
        <View style={styles.container} testID={testIDs.TODO_INPUT_SCREEN}>
          <IconButton
            icon="close"
            size={30}
            iconColor={COLOR.PRIMARY}
            onPress={back}
            style={styles.iconButton}
            testID={testIDs.TODO_INPUT_CLOSE}
          />
          <TextField
            label="Title"
            value={title.value}
            onChangeText={title.onChangeText}
            style={styles.text}
            testID={testIDs.TODO_INPUT_TITLE}
          />
          <TextField
            label="Detail"
            value={detail.value}
            onChangeText={detail.onChangeText}
            style={styles.text}
            testID={testIDs.TODO_INPUT_DETAIL}
          />
          <Button
            onPress={addTodo}
            label="Add"
            style={styles.button}
            disabled={!title.value}
            testID={testIDs.TODO_INPUT_ADD_BUTTON}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
