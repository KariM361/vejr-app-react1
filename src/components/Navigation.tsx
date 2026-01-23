 import { useState } from 'react';
 import Hovedside from './Hovedside';
 import Prognose from './Prognose';
 import './App.css';


 export function Navigation(){
        const [selectedPage, setSelectedPage] = useState<'hoved' | 'prognose'>('hoved');
 
    return (
    <div>
      {/* Navigation */}
      <nav >
        <button className="nav-button" onClick={() => setSelectedPage('hoved')}>
          Hovedside
        </button>
        <button className="nav-button" onClick={() => setSelectedPage('prognose')}>
          Prognose
        </button>
      </nav>

      {/* Viser den valgte side, tjekker om variablen selectedPage er lig med strengen 'hoved' */}
      <main className="mainStyle">
        {selectedPage === 'hoved' && <Hovedside />}
        {selectedPage === 'prognose' && <Prognose />}
      </main>
    </div>
  );
}
