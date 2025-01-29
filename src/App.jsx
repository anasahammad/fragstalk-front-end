import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import TidioChat from "../TidioChat";

function App() {
  
  return  <div>
<RouterProvider router={router} />;
<TidioChat/>
  </div> 
}

export default App;
