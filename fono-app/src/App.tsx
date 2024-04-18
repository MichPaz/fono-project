import React/*, { Fragment, useEffect }*/ from "react";
import AlertProvider from './components/organisms/Snackbar'
// import { useAppSelector } from './app/hooks'
// import { fonoAPI } from "./services/fonoAPI";
import Login from "./Login";
import { useAuth } from './store/session'
import { Loading } from './components/pages/Loading'
import ErrosFonologicos from "./components/pages/ErrosFonologicos";

function App() {
  console.log()
  const { logged, loading } = useAuth()
  // const token = useAppSelector((state) => state.session.token)
  // const user = useAppSelector((state) => state.session.user)
  // const dispatch = useAppDispatch()

  // const get_analise_troca = () => { };

  // get_analise_troca();

  // useEffect(() => {
  //   const getSessionLocal = async () => {
  //     console.log('----getSessionLocal----')
  //     let tokenLocal = sessionStorage.getItem('token')
  //     if (!tokenLocal) {
  //       console.log('----!tokenLocal----', !tokenLocal, tokenLocal)
  //       tokenLocal = localStorage.getItem('token')
  //     }
  //     if (!!tokenLocal) {
  //       console.log('----!!tokenLocal----', !!tokenLocal)
  //       fonoAPI.defaults.headers['authorization'] = 'Bearer ' + tokenLocal;
  //       await fonoAPI.get('tokenVerify')
  //         .then((res) => {
  //           console.log("res.data ", res.data)
  //           // const token = res.data
  //           // dispatch(updateSession())
  //         })
  //     }
  //   };

  //   getSessionLocal();
  // }, []);

  return (
    // <Provider store={store}>
    <div className="App">
      <AlertProvider>
        {loading
          ? Loading
          : logged ? <ErrosFonologicos /> : <Login />
        }
      </AlertProvider>
    </div>

    // </Provider>,
  );
}

export default App;
