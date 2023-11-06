import { Canvas } from "react-three-fiber";
import { Suspense } from "react";
import "./App.css";
import Scene from "./scenes/scene";
function App() {
  return (
    <div className="App">
    <Canvas shadows>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
     </div>
  );
}

export default App;
