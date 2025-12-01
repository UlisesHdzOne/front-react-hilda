import { Redirect } from "react-router-dom";
import { IonContent, IonSpinner } from "@ionic/react";
import { ROUTES } from "../routes";
import { useAuthContext } from "../../providers/authContext.types";

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute = ({ component: Component }: ProtectedRouteProps) => {
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

  return <Component />;
};

export default ProtectedRoute;
