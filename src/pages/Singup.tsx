/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router'
import { FormEvent, useCallback, useReducer, ChangeEvent } from 'react'

import Form, {
  FormButtonSubmit,
  FromInput,
  FromPassword,
} from '../components/ui/form/Form'

import { ApiClient } from '../lib/api.client'

// eslint-disable-next-line no-shadow
const enum ActionTypes {
  updateEmail = 'updateEmail',
  updatePassword = 'updatePassword',
  updateName = 'updateName',
  updateLoading = 'updateLoading',
}

const initialState = {
  email: {
    value: '',
  },
  password: {
    value: '',
  },
  name: {
    value: '',
  },
  isLoading: false,
}

function reducer(
  state: typeof initialState,
  action: { type: string; payload: any }
): typeof initialState {
  switch (action.type) {
    case ActionTypes.updateEmail:
      return { ...state, email: { ...state.email, value: action.payload } }
    case ActionTypes.updatePassword:
      return {
        ...state,
        password: { ...state.password, value: action.payload },
      }
    case ActionTypes.updateName:
      return {
        ...state,
        name: { ...state.name, value: action.payload },
      }
    case ActionTypes.updateLoading:
      return { ...state, isLoading: action.payload }
    default:
      return { ...state }
  }
}

const Singup = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const router = useRouter()

  const handleChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionTypes.updateName, payload: e.target.value })
  }, [])

  const handleChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionTypes.updateEmail, payload: e.target.value })
  }, [])

  const handleChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: ActionTypes.updatePassword, payload: e.target.value })
    },
    []
  )

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      dispatch({ type: ActionTypes.updateLoading, payload: true })
      try {
        await ApiClient.post('auth/singup', {
          email: state.email.value,
          password: state.password.value,
          name: state.name.value,
        })
        router.push('/')
      } finally {
        dispatch({ type: ActionTypes.updateLoading, payload: false })
      }
    },
    [state.email.value, state.password.value, state.name.value, router]
  )

  return (
    <Form name="Singin" onSubmit={handleSubmit}>
      <FromInput
        value={state.name.value}
        onChange={handleChangeName}
        lableName="Name"
        type="text"
      />
      <FromInput
        value={state.email.value}
        onChange={handleChangeEmail}
        lableName="Email"
        type="email"
      />
      <FromPassword
        value={state.password.value}
        onChange={handleChangePassword}
      />
      <FormButtonSubmit isLoading={state.isLoading} />
    </Form>
  )
}

export default Singup
