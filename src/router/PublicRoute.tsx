import { Redirect } from "react-router-dom";
import { ROUTES } from "./routes";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  component: React.ComponentType;
}

const PublicRoute = ({ component: Component }: Props) => {
  const { user } = useAuth();

  if (user) return <Redirect to={ROUTES.PRIVATE.HOME} />;

  return <Component />;
};

export default PublicRoute;
