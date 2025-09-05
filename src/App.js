import { Routes, Route} from 'react-router-dom';
import Home from '../src/routes/home/home.component.jsx'
import Navigation from './routes/navigation/navigation.component.jsx';

function Shop() {
  return (
    <h1>I am at shop</h1>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
}

export default App;
