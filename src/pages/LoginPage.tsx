import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import AuthLayout from "../app/layouts/AuthLayout";
//import { LoginForm } from "../components/forms/LoginForm";
import { ROUTES } from "../app/router/routes";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  const history = useHistory();

  const handleLoginSuccess = () => {
    history.replace(ROUTES.PRIVATE.HOME);
  };

  return (
    <AuthLayout>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonText>
              <h2 className="ion-text-center">Bienvenido</h2>
              <p className="ion-text-center">Ingresa a tu cuenta</p>
            </IonText>

            <LoginForm onSuccess={handleLoginSuccess} />

            <div className="ion-text-center ion-margin-top">
              <IonText color="medium">
                ¿No tienes cuenta?{" "}
                <IonText
                  color="primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push(ROUTES.PUBLIC.REGISTER)}
                >
                  Regístrate
                </IonText>
              </IonText>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </AuthLayout>
  );
};

export default LoginPage;
