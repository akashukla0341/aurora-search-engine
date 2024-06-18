import React,{useState,createContext} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import RegistrationPage from './Components/RegistrationPage';
import Login from './Components/Login';
import HomeComponent from './Components/HomeComponent';
import SearchPage from './Components/SearchPage';
import Notfound from './Components/Notfound';

const Mycontext = createContext()
const Logincontext = createContext()

function App() {

  const [register, setRegister] = useState();
  const [login, setLogin] = useState();
  const [query, setQuery] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const parentLogin = (data) => {
    setLogin(data);
  };

  const parentQuery = (data) => {
    setQuery(data);
  };
  const parentRegistration = (data) => {
    setRegister(data);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationPage registration={parentRegistration} />} />
          <Route
            path="/login"
            element={
              <Mycontext.Provider value={register}>
                <Login login={parentLogin} setIsAuthenticated={setIsAuthenticated} />
              </Mycontext.Provider>
            }
          />
          <Route path="/home" element={
              isAuthenticated ? <HomeComponent registerData={register} loginData={login} parentQuery={parentQuery} setIsAuthenticated={setIsAuthenticated}/> : <Navigate to="/login" />
          } />
          <Route
            path="/search"
            element={isAuthenticated ? 
              <Logincontext.Provider value={login}>
            <SearchPage query={query} setIsAuthenticated={setIsAuthenticated}
            /> 
            </Logincontext.Provider>: <Navigate to="/login" />}
          />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
export {Mycontext,Logincontext};
