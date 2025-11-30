import { IonReactRouter } from "@ionic/react-router";
import { Route, Switch } from "react-router-dom";
import { ROUTES } from "./routes";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// Pages
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import DashboardPage from "../pages/admin/DashboardPage";

const AppRouter = () => {
  return (
    <IonReactRouter>
      <Switch>
        {/* PUBLIC */}
        <Route
          exact
          path={ROUTES.PUBLIC.LOGIN}
          render={() => <PublicRoute component={LoginPage} />}
        />
        <Route
          exact
          path={ROUTES.PUBLIC.REGISTER}
          render={() => <PublicRoute component={RegisterPage} />}
        />

        {/* PRIVATE */}
        <Route
          exact
          path={ROUTES.PRIVATE.HOME}
          render={() => <ProtectedRoute component={HomePage} />}
        />
        <Route
          exact
          path={ROUTES.PRIVATE.PROFILE}
          render={() => <ProtectedRoute component={ProfilePage} />}
        />

        {/* ADMIN */}
        <Route
          exact
          path={ROUTES.ADMIN.DASHBOARD}
          render={() => <AdminRoute component={DashboardPage} />}
        />
      </Switch>
    </IonReactRouter>
  );
};

export default AppRouter;
