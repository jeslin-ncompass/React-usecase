import "./App.css";
import { Route, Switch } from "react-router-dom";
import CsvToTable from "./components/CsvTable";
import EditCustomers from "./components/EditCustomers";

function App() {
  return (
    <Switch>
      <Route path="/Home" exact={true}>
        <CsvToTable />
      </Route>
      <Route path="/EditCustomers" exact={true}>
        <EditCustomers />
      </Route>
    </Switch>
  );
}

export default App;
