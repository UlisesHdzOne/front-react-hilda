import { Redirect } from "react-router-dom";
import { ROUTES } from "./routes";
import { useAuth } from "../features/auth/hooks/useAuth";

interface Props {
  component: React.ComponentType;
}



const AdminRoute = ({ component: Component }: Props) => {
  const { user } = useAuth();

  if (!user) return <Redirect to={ROUTES.PUBLIC.LOGIN} />;
  if (user.role !== "ADMIN") return <Redirect to={ROUTES.PRIVATE.HOME} />;

  return <Component />;
};

export default AdminRoute;
