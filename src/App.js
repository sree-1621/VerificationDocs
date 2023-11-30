// We add the routing part here

import './App.css';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './components/router';
import Pagenotfound from './components/pagenotfound';
import Tokenpage from './components/login/tokenpage';
import Settings from '../src/components/setting';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Tokenpage/>} />
          <Route path='/' element={<Navigate to='/login'/>} />
          <Route path='/documentverify/*' element={<Router/>} />
          <Route path='*' element={<Pagenotfound/>} />
          <Route path='/Settings' element={<Settings/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
