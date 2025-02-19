import React from 'react';
import About from './components/About';
import Test from './components/Test';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="content">
        <nav>
          <a href="#about">About</a> |  
          <a href="#test">Test</a>
        </nav>

        <div className="sections">
          <section id="about">
            <About />
          </section>
          
          <section id="test">
            <Test />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
