import { Route } from "react-router-dom";
import "./App.css";
import Homepage from "../src/pages/Homepage";
import Chatpage from "../src/pages/Chatpage";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Homepage} />
      <Route exact path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
