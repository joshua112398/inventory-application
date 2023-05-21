import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/sidebar';

export default function Root() {
  return (
    <div className="min-h-full flex flex-col sm:flex-row items-stretch justify-stretch relative">
      <Sidebar />
      <div
        id="detail"
        className="bg-sky-950 flex-auto flex flex-col relative sm:ml-64 p-4"
      >
        <Outlet />
      </div>
    </div>
  );
}
