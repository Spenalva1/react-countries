import { BrowserRouter, Switch, Route } from "react-router-dom";
import Countries from "./Countries";
import Country from "./Country";

const Router = () => (
  <BrowserRouter>
      <Switch>
          <Route exact path="/" component={Countries}></Route>
          <Route path="/:country" component={Country}></Route>
          <Route component={Countries}></Route>
      </Switch>
  </BrowserRouter>
)

export default Router;