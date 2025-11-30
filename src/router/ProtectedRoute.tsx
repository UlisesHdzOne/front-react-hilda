import { Redirect } from "react-router-dom";
import { ROUTES } from "./routes";
import { useAuth } from "../features/auth/hooks/useAuth";

interface Props {
  component: React.ComponentType;
}

const ProtectedRoute = ({ component: Component }: Props) => {
  const { user } = useAuth();

  if (!user) return <Redirect to={ROUTES.PUBLIC.LOGIN} />;

  return <Component />;
};

export default ProtectedRoute;
