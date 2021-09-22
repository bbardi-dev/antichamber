import "../styles/normalize.scss";
import "../styles/index.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div className='bg' />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
