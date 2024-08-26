import { BrowserRouter as Router } from 'react-router-dom';

import Routings from '@/router/Routings';
import { AuthProvider } from './context/AuthProvider';

const App = () => (
  <Router>
    <AuthProvider>
      <Routings />
    </AuthProvider>
  </Router>
);

export default App;
