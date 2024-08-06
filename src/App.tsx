import { Provider } from "react-redux";
import "./index.css";
import TaskPage from "./pages/tasks";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Provider store={store}>
        <TaskPage /> <Toaster />
      </Provider>
    </>
  );
}

export default App;
