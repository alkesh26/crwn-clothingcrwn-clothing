import { Routes, Route } from 'react-router-dom';
import Home from '../src/routes/home/home.component.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
