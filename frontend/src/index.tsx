import ReactDOM from "react-dom/client";
import { App } from "./Components/App/App";

const rootElement = document.getElementById("root");

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(

        <App />
    );
} else {
    console.error("Elementul cu ID-ul 'root' nu a fost găsit.");
}
