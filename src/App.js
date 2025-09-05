import { Routes, Route, Outlet} from 'react-router-dom';
import Home from '../src/routes/home/home.component.jsx'

function Navigation() {
  return (
    <>
      <h1>I am at Navigation</h1>
      <Outlet />
    </>
  )
}

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
