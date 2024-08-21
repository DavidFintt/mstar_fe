import logo from './logo.svg';
import InnerLayout from './layouts/innerLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './views/authenticatedViews/dashboard';
import Mercadorias from './views/authenticatedViews/mercadorias';
import Login from './views/otherViews/login';
import Register from './views/otherViews/register';
import Movimentacoes from './views/authenticatedViews/movimentacoes';
import CadastroMovimentos from './views/authenticatedViews/cadastroMovimento';
import Unidades from './views/authenticatedViews/unidades';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<InnerLayout><Dashboard /></InnerLayout>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/mercadorias' element={<InnerLayout><Mercadorias /></InnerLayout>}></Route>
          <Route path='/movimentacoes' element={<InnerLayout><Movimentacoes /></InnerLayout>}></Route>
          <Route path='/movimentacoes/cadastro' element={<InnerLayout><CadastroMovimentos /></InnerLayout>}></Route>
          <Route path='/unidades' element={<InnerLayout><Unidades /></InnerLayout>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
