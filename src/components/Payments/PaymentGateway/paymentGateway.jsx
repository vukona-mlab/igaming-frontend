
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function App() {
    const initialOptions = {
        clientId: "AZzflBQtMhX69mxyJOa7_J4p48Jfda4J5d3nbY9bCetzxmwjhqmuaxfjym1v1TJxxyrjnlc0YZ_ib-eo",
    };

    const styles = {
        shape: "rect",
        layout: "vertical",
    };

    return (
        <div className="App">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons style={styles} />
            </PayPalScriptProvider>
        </div>
    );
}
