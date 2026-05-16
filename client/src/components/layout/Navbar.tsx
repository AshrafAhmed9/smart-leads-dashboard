import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-600">Smart Leads</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user?.name}</span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            user?.role === 'admin'
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {user?.role}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >Logout</button>
        </div>
      </div>
    </nav>
  );
};
