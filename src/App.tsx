import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { SingleBlockDemo } from './pages/SingleBlockDemo';
import { BlockchainDemo } from './pages/BlockchainDemo';
import { NetworkDemo } from './pages/NetworkDemo';
import { ToolkitDemo } from './pages/ToolkitDemo';
import { generateFavicon } from './utils/favicon';

function App() {
  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (favicon) {
      favicon.href = generateFavicon();
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<SingleBlockDemo />} />
            <Route path="/chain" element={<BlockchainDemo />} />
            <Route path="/network" element={<NetworkDemo />} />
            <Route path="/toolkit" element={<ToolkitDemo />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;