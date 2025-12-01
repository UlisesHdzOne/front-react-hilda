import { Redirect } from "react-router-dom";
import { IonContent, IonSpinner } from "@ionic/react";
import { ROUTES } from "../routes";
import { useAuthContext } from "../../providers/authContext.types";

interface AdminRouteProps {
  component: React.ComponentType;
}

const AdminRoute = ({ component: Component }: AdminRouteProps) => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <IonContent>
        <div className="ion-text-center ion-padding">
          <IonSpinner />
        </div>
      </IonContent>
    );
  }

  if (!user) {
    return <Redirect to={ROUTES.PUBLIC.LOGIN} />;
  }

  if (user.role !== "ADMIN") {
    return <Redirect to={ROUTES.PRIVATE.HOME} />;
  }

  return <Component />;
};

export default AdminRoute;
