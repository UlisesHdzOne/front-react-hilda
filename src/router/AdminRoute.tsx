import { Redirect } from "react-router-dom";
import { ROUTES } from "./routes";
import { useAuth } from "../contexts/AuthContext";
import { IonContent, IonSpinner } from "@ionic/react";

interface Props {
  component: React.ComponentType;
}

const AdminRoute = ({ component: Component }: Props) => {
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

  if (user.role !== "ADMIN") {
    return <Redirect to={ROUTES.PRIVATE.HOME} />;
  }

  return <Component />;
};

export default AdminRoute;
