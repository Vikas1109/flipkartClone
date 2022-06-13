import "./App.css";
import NavBar from "./components/common/NavBar";
import { BrowserRouter, Route, Switch, HashRouter } from "react-router-dom";
import Allroutes from "./routes/Allroutes";

function App() {
  return (
    <div>
      <HashRouter>
        <Allroutes />
      </HashRouter>
    </div>
  );
}

export default App;
