import { memo, ReactNode } from 'react'

import { Button } from '@chakra-ui/react'
import { MdArrowBack } from 'react-icons/md'

interface ButtonBackProps {
  onClick: () => void
  content: ReactNode
}

const ButtonBack = ({ onClick, content }: ButtonBackProps) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      leftIcon={<MdArrowBack />}
      variant="outline"
      color="whiteAlpha.800"
      _hover={{
        color: 'white',
        background: 'purple.600',
      }}
    >
      {content}
    </Button>
  )
}

export default memo(ButtonBack)
