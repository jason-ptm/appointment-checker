import "./App.scss";
import { Provider } from "./context";
import { RouteWrapper } from "./routes";

function App() {
  return (
    <>
      <Provider>
        <RouteWrapper />
      </Provider>
    </>
  );
}

export default App;
