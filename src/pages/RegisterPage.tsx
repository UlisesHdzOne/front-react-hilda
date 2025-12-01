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
import { ROUTES } from "../app/router/routes";
import RegisterForm from "../components/forms/RegisterForm";

const RegisterPage = () => {
  const history = useHistory();

  const handleRegisterSuccess = () => {
    history.replace(ROUTES.PRIVATE.HOME);
  };

  return (
    <AuthLayout>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Crear Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonText>
              <h2 className="ion-text-center">Crear Cuenta</h2>
              <p className="ion-text-center">Regístrate para comenzar</p>
            </IonText>

            <RegisterForm onSuccess={handleRegisterSuccess} />

            <div className="ion-text-center ion-margin-top">
              <IonText color="medium">
                ¿Ya tienes cuenta?{" "}
                <IonText
                  color="primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push(ROUTES.PUBLIC.LOGIN)}
                >
                  Inicia Sesión
                </IonText>
              </IonText>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </AuthLayout>
  );
};

export default RegisterPage;
