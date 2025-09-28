import '@/styles/globals.css'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from "@/components/ui/toaster"

export default function App({ Component, pageProps }) {
  return (
    <HelmetProvider>
      <Component {...pageProps} />
      <Toaster />
    </HelmetProvider>
  )
}
