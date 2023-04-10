import { ChangeEventHandler, FormEvent, ReactNode, memo } from 'react'
import { useRouter } from 'next/router'

import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import ButtonBack from '../button/ButtonBack'

interface BaseFormElementProps {
  value: string | number | readonly string[] | undefined
  onChange: ChangeEventHandler<HTMLInputElement> | undefined
}

interface FromInputProps {
  lableName?: string
  type: 'email' | 'text'
}

export const FromInput = memo(
  ({
    value,
    onChange,
    lableName,
    type,
  }: BaseFormElementProps & FromInputProps) => {
    return (
      <FormControl variant="floating" isRequired>
        {lableName && <FormLabel>{lableName}</FormLabel>}
        <Input value={value} onChange={onChange} type={type} />
      </FormControl>
    )
  }
)

export const FromPassword = memo(
  ({ value, onChange }: BaseFormElementProps) => {
    return (
      <FormControl variant="floating" isRequired>
        <FormLabel>Password</FormLabel>
        <Input value={value} onChange={onChange} type="password" />
      </FormControl>
    )
  }
)

interface FormButtonSubmitProps {
  isLoading?: boolean
}

export const FormButtonSubmit = memo(({ isLoading }: FormButtonSubmitProps) => {
  return (
    <Button
      type="submit"
      variant="outline"
      color="whiteAlpha.800"
      _hover={{
        color: 'white',
        background: 'purple.600',
      }}
      isLoading={isLoading}
      loadingText="Submitting"
      spinnerPlacement="end"
    >
      Submit
    </Button>
  )
})

interface FormProps {
  children: ReactNode
  name: string
  // eslint-disable-next-line no-unused-vars
  onSubmit: (e: FormEvent) => void
}

const Form = ({ children, name, onSubmit }: FormProps) => {
  const router = useRouter()

  return (
    <Box
      sx={{
        display: 'grid',
        justifyItems: 'center',
        paddingTop: '40px',
        background: 'black',
        height: '100vh',
      }}
      as="form"
      onSubmit={onSubmit}
    >
      <Box
        sx={{
          maxWidth: '400px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text as="h3" fontSize="xl" color="whiteAlpha.800">
            Hello on {name}
          </Text>
          <ButtonBack content="Go back" onClick={() => router.back()} />
        </Box>
        {children}
      </Box>
    </Box>
  )
}

export default Form
