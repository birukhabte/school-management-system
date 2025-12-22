import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

console.log('Main.jsx execution started');
const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement);

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
