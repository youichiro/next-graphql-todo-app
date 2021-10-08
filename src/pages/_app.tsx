import Head from 'next/head'
import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../components/theme'
import { CssBaseline } from '@mui/material'


function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp
