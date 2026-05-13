import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import ProductTable from './components/ProductTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rutas con Layout (Header/Footer) */}
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/productos" element={<ProductTable />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
