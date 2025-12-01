import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../app/providers/authContext.types";

const DashboardPage = () => {
  const { user } = useAuthContext();
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Panel de Administración</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    Bienvenido, Administrador {user?.name}!
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>Desde aquí puedes gestionar toda la aplicación.</p>

                  <div className="ion-margin-top">
                    <IonButton
                      expand="block"
                      onClick={() => history.push("/admin/users")}
                    >
                      Gestionar Usuarios
                    </IonButton>

                    <IonButton
                      expand="block"
                      fill="outline"
                      onClick={() => history.push("/admin/stats")}
                    >
                      Ver Estadísticas
                    </IonButton>

                    <IonButton
                      expand="block"
                      fill="outline"
                      onClick={() => history.push("/admin/settings")}
                    >
                      Configuración
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
