import Header from './components/Header';
import Router from './components/Router';
import {ContainerStyles, GlobalStyles} from './globalStyles';

function App() {

  return (
      <div className="App">
        <GlobalStyles />
        <Header />
        <ContainerStyles>
          <Router />
        </ContainerStyles>
      </div>
  );
}

export default App;
