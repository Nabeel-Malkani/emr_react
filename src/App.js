import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "./Views/Login";
import { UserProvider } from "./userContext";
import Dashboard from './Views/Dashboard';
import AppRoutes from './routes';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <AppRoutes/>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
