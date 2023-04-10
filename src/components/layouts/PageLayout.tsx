import { ReactNode } from 'react'

import { Box } from '@chakra-ui/layout'

interface PageLayoutProps {
  children: ReactNode
  headerComponent: ReactNode
  gradient: any
}

const PageLayout = ({
  children,
  gradient,
  headerComponent,
}: PageLayoutProps) => {
  return (
    <Box
      sx={{
        height: '100%',
        overflowY: 'auto',
        bgGradient: `linear(${gradient}.500 0%, ${gradient}.600 15%, ${gradient}.700 40%, rgba(0,0,0,0.9) 75%)`,
      }}
    >
      {headerComponent}
      {children}
    </Box>
  )
}

export default PageLayout
