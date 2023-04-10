import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/sidebar';

export default function Root() {
  return (
    <div className="h-screen flex flex-col sm:flex-row">
      <Sidebar />
      <div id="detail" className="bg-sky-900 flex-auto">
        <Outlet />
      </div>
    </div>
  );
}
