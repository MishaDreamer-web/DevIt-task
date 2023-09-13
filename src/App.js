import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import Container from './components/Container/Container';
import Navigation from './components/Navigation/Navigation';
import LayoutFlex from './pages/LayoutFlex/LayoutFlex';
import LayoutGrid from './pages/LayoutGrid/LayoutGrid';
import AnimationPage from './pages/AnimationPage/AnimationPage';
import TasksPage from './pages/TasksPage/TasksPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

export default function App() {
  return (
    <Container>
      <Navigation />

      <Routes>
        <Route path="/" exact element={<HomePage />} />

        <Route path="/layout-flex" element={<LayoutFlex />} />

        <Route path="/layout-grid" element={<LayoutGrid />} />

        <Route path="/animation" element={<AnimationPage />} />

        <Route path="/javascript" element={<TasksPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Container>
  );
}
