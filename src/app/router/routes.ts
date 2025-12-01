import { useHistory } from "react-router";

// ✅ routes.ts mejorado
export const ROUTES = {
  PUBLIC: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  PRIVATE: {
    HOME: "/",
    PROFILE: "/profile",
  },
  ADMIN: {
    DASHBOARD: "/admin",
    USERS: "/admin/users",
    SETTINGS: "/admin/settings",
  },
} as const;

// ✅ Tipo para rutas válidas
export type RoutePath =
  | typeof ROUTES.PUBLIC.LOGIN
  | typeof ROUTES.PUBLIC.REGISTER
  | typeof ROUTES.PRIVATE.HOME
  | typeof ROUTES.PRIVATE.PROFILE
  | typeof ROUTES.ADMIN.DASHBOARD;

// ✅ Hook personalizado para navegación tipada
export const useTypedNavigate = () => {
  const history = useHistory();

  const navigate = (path: RoutePath) => {
    history.push(path);
  };

  return navigate;
};
