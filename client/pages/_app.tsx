import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "../styles/normalize.scss";
import "../styles/index.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='layout'>
      <div className='bg' />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
