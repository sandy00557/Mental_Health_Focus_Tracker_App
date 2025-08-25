import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // step 3: wrap the App component inside Helmet
  /*Why do we need <Provider store={store}> for useSelector and useDispatch to work?

Because all state in Redux lives inside the store, and useSelector and useDispatch are hooks from react-redux that rely on accessing that store through React Context.

🔌 Here's What Happens Without <Provider>:
useSelector() can't access the state

useDispatch() can't dispatch actions

Neither hook can subscribe to the store

So it throws an error:

❌ "Could not find react-redux context value; please ensure the component is wrapped in a <Provider>"

🔁 So What Does <Provider> Do?
<Provider store={store}> is like a wiring system that injects the Redux store into the entire React component tree using React Context.

This allows:

useSelector() to read and subscribe to the store

useDispatch() to send actions to the store

*/
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </Provider>
);
