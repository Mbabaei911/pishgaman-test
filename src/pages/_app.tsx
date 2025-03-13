// src/pages/_app.tsx
import { Provider } from 'react-redux';
import store from '../store/store'; // Adjust the path if necessary
import '../styles/globals.css'; // Import your global styles
import 'leaflet/dist/leaflet.css'; // Add this line
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;