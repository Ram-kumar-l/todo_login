// import Login from './login';
// import Todo from './todo';

// function App() {
//   const token = localStorage.getItem("token");

//   return (
//     <div className="App">
//       {token ? <Todo /> : <Login />}
//     </div>
//   );
// }

// export default App;
// import './App.css';
// import Login from './login';

// function App() {
//   return (
//     <div className="App">
//       <Login />
//     </div>
//   );
// }

// export default App;
// import Login from './login';
// import Todo from './todo';

// function App() {
//   const token = localStorage.getItem("token");

//   return (
//     <div className="App">
//       {token ? <Todo /> : <Login />}
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import Login from "./login";
import Register from "./register";
import Todo from "./todo";

function App() {

    const [showRegister, setShowRegister] = useState(false);

    const token = localStorage.getItem("token");

    if (token) {
        return <Todo />;
    }

    return (
        <>
            {
                showRegister ?
                <Register goToLogin={() => setShowRegister(false)} />
                :
                <Login goToRegister={() => setShowRegister(true)} />
            }
        </>
    );
}

export default App;
