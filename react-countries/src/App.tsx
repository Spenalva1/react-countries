import { ThemeProvider } from './theme-context';
import Router from './components/Router';
import { Global } from './globalStyles';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Global />
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
