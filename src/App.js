import './App.css';
import Login from './pages/Login'
import { Routes, Route } from "react-router-dom";
import Teams from './pages/Teams';
import Projects from './pages/Projects';
import useAuthCheck from "./hooks/useAuthCheck";
function App() {

  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </div>
  );
  
}

export default App;
