import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import { Container } from "../styles/pages/app";

import { CartContextProvider } from "../context/CartContext";
import AppHeader from "./components/AppHeader";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
    
    return (
        <CartContextProvider>
            <Container>
                <AppHeader />
                <Component {...pageProps} />
            </Container>
        </CartContextProvider>
    )
}
