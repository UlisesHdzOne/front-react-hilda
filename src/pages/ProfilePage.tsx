import React from "react";
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
  IonItem,
  IonLabel,
  //IonText,
  IonAvatar,
} from "@ionic/react";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardContent>
            <div className="ion-text-center ion-margin-bottom">
              <IonAvatar
                style={{ width: "80px", height: "80px", margin: "0 auto" }}
              >
                <img
                  src={user?.profile?.avatarUrl || "/assets/avatar-default.png"}
                  alt="Avatar"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/avatar-default.png";
                  }}
                />
              </IonAvatar>
            </div>

            <IonItem>
              <IonLabel>
                <h2>Nombre</h2>
                <p>{user?.name}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2>Teléfono</h2>
                <p>{user?.phone}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2>Rol</h2>
                <p>{user?.role}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2>Estado</h2>
                <p>{user?.isActive ? "Activo" : "Inactivo"}</p>
              </IonLabel>
            </IonItem>

            {user?.profile?.bio && (
              <IonItem>
                <IonLabel>
                  <h2>Biografía</h2>
                  <p>{user.profile.bio}</p>
                </IonLabel>
              </IonItem>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
