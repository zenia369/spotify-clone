import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider as StoreProvider } from 'react-redux'

import 'reset-css'

import { storeWrapper } from '@/src/redux/store'

import Layout from '@/src/components/layouts/Layout'

const theme = extendTheme({
  colors: {
    gray: {
      100: '#f5f5fr',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ':focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
        outline: {
          ':active': {
            background: 'none',
            scale: 1.1,
          },
        },
      },
    },
  },
})

const App = ({ Component, ...params }: AppProps) => {
  const { store, props } = storeWrapper.useWrappedStore(params)
  const { pageProps } = props

  return (
    <ChakraProvider theme={theme}>
      {pageProps.authPage ? (
        <Component {...pageProps} />
      ) : (
        <StoreProvider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StoreProvider>
      )}
    </ChakraProvider>
  )
}

export default App
