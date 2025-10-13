import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, TrendingUp } from 'lucide-react';

export const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Crypto AI Agent</span>
              </Link>

              <div className="flex gap-4">
                <Link
                  to="/"
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/')
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/articles"
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/articles')
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Articles
                </Link>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              AI-Powered Sentiment Analysis
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Crypto AI Agent - Real-time cryptocurrency news sentiment analysis
          </p>
        </div>
      </footer>
    </div>
  );
};
