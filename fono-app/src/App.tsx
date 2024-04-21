import React/*, { Fragment, useEffect }*/ from "react";
import AlertProvider from './components/organisms/Snackbar'
// import { useAppSelector } from './app/hooks'
// import { fonoAPI } from "./services/fonoAPI";
import Login from "./Login";
import { useAuth } from './store/session'
import { Loading } from './components/pages/Loading'
import ErrosFonologicos from "./components/pages/ErrosFonologicos";
import { ErroFonologicoProvider } from "./store/ErroFonologico";

function App() {
  console.log()
  const { logged, loading } = useAuth()

  return (
    <div className="App">
      <AlertProvider>
        {loading
          ? Loading
          : logged ?
            <ErroFonologicoProvider>
              <ErrosFonologicos />
            </ErroFonologicoProvider>
            :
            <Login />
        }
      </AlertProvider>
    </div>

    // </Provider>,
  );
}

export default App;
