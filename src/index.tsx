import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import store from "./context/store"

ReactDOM.createRoot(document.getElementById("content") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
