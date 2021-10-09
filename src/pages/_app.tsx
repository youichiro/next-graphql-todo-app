import Head from 'next/head'
import '../styles/pages/globals.scss'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../components/theme'
import { CssBaseline } from '@mui/material'
import createEmotionCache from '../components/createEmotionCache'
import { AppProps } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react'

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={apolloClient}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  )
}
