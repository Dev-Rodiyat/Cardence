import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import CreateCard from './pages/CreateCard';
import MyCards from './pages/MyCards';
import CardDetails from './pages/CardDetails';
import EditCard from './pages/EditCard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<CreateCard />} />
          <Route path="/my-cards" element={<MyCards />} />
          <Route path="/card/:id" element={<CardDetails />} />
          <Route path="/edit/:id" element={<EditCard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}