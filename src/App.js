import React from 'react';
import Header from './components/Header';

import Footer from './components/Footer'
import './App.css';
import ChatApp from './components/ChatApp';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content-area">
        <div class="text-box">
          <ChatApp />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
