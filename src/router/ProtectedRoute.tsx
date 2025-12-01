import { Redirect } from "react-router-dom";
import { ROUTES } from "./routes";
import { useAuth } from "../contexts/AuthContext";
import { IonContent, IonSpinner } from "@ionic/react";

interface Props {
  component: React.ComponentType;
}

const ProtectedRoute = ({ component: Component }: Props) => {
  const { user, isLoading } = useAuth();

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
