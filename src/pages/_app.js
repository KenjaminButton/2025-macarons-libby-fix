import { Toaster } from 'react-hot-toast'
import "@/styles/globals.css";
import Layout from '../components/Layout'

import { StateContext } from "../context/StateContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />

        </Layout>
      </StateContext>
    </>
  )
}

