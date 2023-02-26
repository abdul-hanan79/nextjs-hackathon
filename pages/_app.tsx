import '../styles/globals.css'
import '../styles/Home.module.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import '../components/components.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import '../public/styles.css'
import { store } from '../store/Store'
import MainNavbar from '../components/MainNavbar'
// import '@fortawesome/fontawesome-free/css/all.min.css';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainNavbar/>
        <Component {...pageProps} />
      
    </Provider>
  )
}

export default MyApp
