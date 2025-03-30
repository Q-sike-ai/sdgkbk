import { Routes, Route, HashRouter } from 'react-router-dom';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import MainLayout from '@/components/layout/MainLayout';
import Home from '@pages/Home';
import AdmissionForm from '@pages/AdmissionForm';
import Analysis from '@pages/Analysis';
import Divination from '@pages/Divination';
import Blessing from '@pages/Blessing';
import FAQ from '@pages/FAQ';

const App = () => {
  return (
    <HashRouter>
      <Header />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admission-form" element={<AdmissionForm />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/divination" element={<Divination />} />
          <Route path="/blessing" element={<Blessing />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </MainLayout>
      <Footer />
    </HashRouter>
  );
};

export default App;