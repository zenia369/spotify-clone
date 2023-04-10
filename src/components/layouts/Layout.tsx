import { Box } from '@chakra-ui/layout'
import { ReactNode } from 'react'

import Sidebar from '../sidebar/Sidebar'

interface ILayout {
  children: ReactNode
}

const Layout = ({ children }: ILayout) => {
  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Box
        sx={{
          position: 'absolute',
          width: '250px',
          height: '100%',
          left: 0,
          top: 0,
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          marginLeft: '250px',
          marginBottom: '100px',
          height: 'calc(100% - 100px)',
        }}
      >
        {children}
      </Box>
      <Box sx={{ position: 'absolute', bottom: 0, left: 0 }}>player</Box>
    </Box>
  )
}

export default Layout
