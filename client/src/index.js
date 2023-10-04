import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import UserProvider from './components/UserProvider';  // Assuming UserProvider is in the components directory

const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);

