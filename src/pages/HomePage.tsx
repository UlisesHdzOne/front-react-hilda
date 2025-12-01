import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../app/router/routes";
import { useAuthContext } from "../app/providers/authContext.types";

const HomePage = () => {
  const { user, logout } = useAuthContext();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.replace(ROUTES.PUBLIC.LOGIN);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pollería Hilda</IonTitle>
          <IonButton slot="end" fill="clear" onClick={handleLogout}>
            Cerrar Sesión
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Bienvenido, {user?.name}!</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>
                    <strong>Rol:</strong> {user?.role}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {user?.phone}
                  </p>

                  {user?.role === "ADMIN" && (
                    <div className="ion-margin-top">
                      <IonButton
                        expand="block"
                        onClick={() => history.push(ROUTES.ADMIN.DASHBOARD)}
                      >
                        Panel de Administración
                      </IonButton>
                      <IonButton
                        expand="block"
                        fill="outline"
                        onClick={() => history.push("/admin/users")}
                      >
                        Gestionar Usuarios
                      </IonButton>
                    </div>
                  )}

                  {user?.role === "CONSUMER" && (
                    <div className="ion-margin-top">
                      <IonButton
                        expand="block"
                        onClick={() => history.push(ROUTES.PRIVATE.PROFILE)}
                      >
                        Mi Perfil
                      </IonButton>
                      <IonButton
                        expand="block"
                        fill="outline"
                        onClick={() => history.push("/orders")}
                      >
                        Ver Menú
                      </IonButton>
                    </div>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
