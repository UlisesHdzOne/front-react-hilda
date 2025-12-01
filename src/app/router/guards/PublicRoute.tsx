import { Redirect } from "react-router-dom";
import { ROUTES } from "../routes";
import { useAuthContext } from "../../providers/authContext.types";

interface PublicRouteProps {
  component: React.ComponentType;
}

const PublicRoute = ({ component: Component }: PublicRouteProps) => {
  const { user } = useAuthContext();

  if (user) return <Redirect to={ROUTES.PRIVATE.HOME} />;

  return <Component />;
};

export default PublicRoute;
