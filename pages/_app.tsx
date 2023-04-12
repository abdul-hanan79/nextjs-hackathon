import '../styles/globals.css'
import '../styles/Home.module.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import '../components/components.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import '../public/styles.css'
import Store from '../store/Store'
import MainNavbar from '../components/MainNavbar'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
// import '@fortawesome/fontawesome-free/css/all.min.css';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={Store} >
      <MainNavbar />
      <Component {...pageProps} className="component"/>

    </Provider>
  )
}

export default MyApp
