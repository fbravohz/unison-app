import { Provider } from 'react-redux';
import { store } from './../store/store';
import { useRouter } from 'next/router';
import '../styles/styles.css'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <Component {...pageProps} key={router.asPath} />
    </Provider>
  )
}