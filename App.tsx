
import React from 'react';
import { HashRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import { ThemeProvider } from './hooks/useTheme';
import { ToastProvider } from './contexts/ToastContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ALL_TOOLS, CATEGORIES } from './constants';
import ToolPage from './features/ToolPage';

const ToolPageWrapper = () => {
  const { toolPath } = useParams<{ toolPath: string }>();
  const tool = ALL_TOOLS.find(t => t.path === toolPath);
  return tool ? <ToolPage tool={tool} /> : <Navigate to="/" replace />;
};

const CategoryPageWrapper = () => {
    const { categoryPath } = useParams<{ categoryPath: string }>();
    const category = CATEGORIES.find(c => c.path === categoryPath);
    if (!category) {
        return <Navigate to="/" replace />;
    }
    const toolsForCategory = ALL_TOOLS.filter(t => t.category === category.name);
    return <CategoryPage category={category} tools={toolsForCategory} />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <FavoritesProvider>
          <HashRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:categoryPath" element={<CategoryPageWrapper />} />
                <Route path="/:toolPath" element={<ToolPageWrapper />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </HashRouter>
        </FavoritesProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;