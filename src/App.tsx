import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Dashboard from './pages/Dashboard/Dashboard';
import CreativeDashboard from './pages/Creative/CreativeDashboard';
import LearningDashboard from './pages/Learning/LearningDashboard';
import OrganizationDashboard from './pages/Organization/OrganizationDashboard';
import ArtStudio from './pages/ArtStudio/ArtStudio';
import CodingPlayground from './pages/CodingPlayground/CodingPlayground';
import LanguageLab from './pages/LanguageLab/LanguageLab';
import DigitalDesign from './pages/DigitalDesign/DigitalDesign';
import BeatLab from './pages/BeatLab/BeatLab';
import FinanceFun from './pages/FinanceFun/FinanceFun';
import TypingQuest from './pages/TypingQuest/TypingQuest';
import Library from './pages/Library/Library';
import EmailExplorer from './pages/EmailExplorer/EmailExplorer';
import TaskMaster from './pages/TaskMaster/TaskMaster';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
        <Navbar />
        <main className="flex-1 container mx-auto px-4 pt-20 pb-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/creative" element={<CreativeDashboard />} />
            <Route path="/learning" element={<LearningDashboard />} />
            <Route path="/organization" element={<OrganizationDashboard />} />
            <Route path="/art-studio" element={<ArtStudio />} />
            <Route path="/coding" element={<CodingPlayground />} />
            <Route path="/language" element={<LanguageLab />} />
            <Route path="/design" element={<DigitalDesign />} />
            <Route path="/music" element={<BeatLab />} />
            <Route path="/finance-fun" element={<FinanceFun />} />
            <Route path="/typing" element={<TypingQuest />} />
            <Route path="/library" element={<Library />} />
            <Route path="/email" element={<EmailExplorer />} />
            <Route path="/tasks" element={<TaskMaster />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;