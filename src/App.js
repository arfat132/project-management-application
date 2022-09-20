import './App.css';
import Login from './pages/Login'
import { Routes, Route } from "react-router-dom";
import Teams from './pages/Teams';
import Projects from './pages/Projects';
import useAuthCheck from "./hooks/useAuthCheck";
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
function App() {

  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/teams"
          element={
            <PrivateRoute>
              <Teams />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );

}

export default App;
