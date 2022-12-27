import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// components
import FileExplorer from "src/modules/explorer/components/FileExplorer";
// contexts
import { ExplorerContextProvider } from "src/modules/explorer/explorer.context";
// styles
import "./App.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ExplorerContextProvider>
        <div className="App">
          <div>
            <FileExplorer />
          </div>
        </div>
      </ExplorerContextProvider>
    </DndProvider>
  );
}

export default App;
