import { Box } from '@chakra-ui/layout'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

import { PlayerbarSelect } from '../../redux/features/playerbarSlice'

import Sidebar from '../sidebar/Sidebar'
import Playerbar from '../playerbar/Playerbar'

interface ILayout {
  children: ReactNode
}

const Layout = ({ children }: ILayout) => {
  const showPlayerbar = useSelector(PlayerbarSelect.showPlayerbar)
  const contentHeight = showPlayerbar ? 'calc(100% - 100px)' : '100vh'

  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          width: '250px',
          left: 0,
          top: 0,
          height: contentHeight,
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          marginLeft: '250px',
          marginBottom: '100px',
          height: contentHeight,
        }}
      >
        {children}
      </Box>
      {showPlayerbar && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100px',
          }}
        >
          <Playerbar />
        </Box>
      )}
    </Box>
  )
}

export default Layout
