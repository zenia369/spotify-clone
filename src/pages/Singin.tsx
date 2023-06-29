/* eslint-disable no-unused-vars */
import Link from 'next/link'
import { FormEvent, useCallback, useReducer, ChangeEvent } from 'react'

import { Divider, LinkBox, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
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
  updateLoading = 'updateLoading',
}

const initialState = {
  email: {
    value: '',
  },
  password: {
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
    case ActionTypes.updateLoading:
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return { ...state }
  }
}

const Singin = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const router = useRouter()

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
        await ApiClient.post('auth/singin', {
          email: state.email.value,
          password: state.password.value,
        })
        router.push('/')
      } finally {
        dispatch({ type: ActionTypes.updateLoading, payload: false })
      }
    },
    [state.email.value, state.password.value, router]
  )

  return (
    <Form name="Singin" onSubmit={handleSubmit}>
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
      <Divider padding="10px" width="auto" />
      <Text textAlign="center">
        Or, you can try{' '}
        <LinkBox
          display="inline"
          textDecoration="underline"
          as="span"
          _hover={{ color: 'white' }}
        >
          <Link href="/singup">Singup</Link>
        </LinkBox>
      </Text>
    </Form>
  )
}

export default Singin
