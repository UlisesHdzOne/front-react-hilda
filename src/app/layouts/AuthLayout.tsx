import { IonContent, IonPage } from "@ionic/react";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <IonPage>
      <IonContent>{children}</IonContent>
    </IonPage>
  );
};

export default AuthLayout;
