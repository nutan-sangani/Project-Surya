import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
function App() {
  return (
    <div className='App'>
        <Router>
          <Routes>
            <Route path='/'
              element={<Home/>}
              />
            <Route path='/login' 
              element={<Login button_text="LOGIN" signup=""/>}
              />
            <Route path='/register'
              element={<Login button_text="CREATE MY ACCOUNT" signup="1"/>}
              />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
//<Login button_text="SIGNUP" signup="1"/>