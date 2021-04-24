import { BrowserRouter, Switch, Route } from "react-router-dom";
import Countries from "./Countries";
import CountryDetail from "./CountryDetail";

const Router = () => (
  <BrowserRouter>
      <Switch>
          <Route exact path="/" component={Countries}></Route>
          <Route path="/:country" component={CountryDetail}></Route>
          <Route component={Countries}></Route>
      </Switch>
  </BrowserRouter>
)

export default Router;