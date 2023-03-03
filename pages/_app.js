import { SessionProvider } from 'next-auth/react';
import 'primereact/resources/themes/arya-blue/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'; //icons
import './style.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Component className="background" {...pageProps} />
        </SessionProvider>
    );
}
