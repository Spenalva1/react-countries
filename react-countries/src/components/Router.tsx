import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ContainerStyles } from '../globalStyles';
import Countries from './Countries';
import CountryDetail from './CountryDetail';
import Header from './Header';

const Router = () => (
  <BrowserRouter>
    <Header />
    <ContainerStyles>
      <Switch>
        <Route exact path="/" component={Countries} />
        <Route path="/country/:code" component={CountryDetail} />
        <Route component={Countries} />
      </Switch>
    </ContainerStyles>
  </BrowserRouter>
);

export default Router;
