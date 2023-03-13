import React from 'react'
import './App.css';
import CharacterSheet from './pages/CharacterSheet'
import Home from './mobile/Home';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  // const [isMobile, setMobile] = React.useState(false)

  // React.useEffect(() => {
  //   if (window.outerHeight > (1.5 * window.outerWidth)){
  //     setMobile(true)
  //   }
  // })

  // if (isMobile){
  //   return (
  //     <Home/>
  //   )
  // }

  return (
    <DndProvider backend={HTML5Backend}>
      <CharacterSheet />
    </DndProvider>
  );
}

export default App;
