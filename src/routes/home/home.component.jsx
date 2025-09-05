import { Outlet } from 'react-router-dom';
import Categories from '../../components/categories/categories.component.jsx'

export default function Home() {
  return (
    <div>
      <Categories />
      <Outlet />
    </div>
  );
}
