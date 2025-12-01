import React, { useState, useEffect } from "react";
import {
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
  IonNote,
  IonSpinner,
  IonAlert,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../../features/auth/api/auth.types";
import { useAuth } from "../../contexts/AuthContext";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, isLoading, error, clearError } = useAuth();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginCredentials>();

  // Configurar register para Ionic inputs
  useEffect(() => {
    register("phone", {
      required: "El teléfono es obligatorio",
      pattern: {
        value: /^[0-9+\-\s()]{10,15}$/,
        message: "Formato de teléfono inválido",
      },
    });

    register("password", {
      required: "La contraseña es obligatoria",
      minLength: {
        value: 6,
        message: "Mínimo 6 caracteres",
      },
    });
  }, [register]);

  // Mostrar alerta cuando hay error
  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
  }, [error]);

  const onFormSubmit = async (data: LoginCredentials) => {
    try {
      await login(data);
      onSuccess?.();
    } catch (err) {
      // Error ya manejado en el contexto
      console.error("Login error:", err);
    }
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
    clearError();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <IonItem className="ion-margin-bottom">
          <IonLabel position="stacked">Teléfono</IonLabel>
          <IonInput
            type="tel"
            placeholder="Ingresa tu teléfono"
            onIonInput={(e) => setValue("phone", e.detail.value!)}
          />
          {errors.phone && (
            <IonNote slot="error" color="danger">
              {errors.phone.message}
            </IonNote>
          )}
        </IonItem>

        <IonItem className="ion-margin-bottom">
          <IonLabel position="stacked">Contraseña</IonLabel>
          <IonInput
            type="password"
            placeholder="Ingresa tu contraseña"
            onIonInput={(e) => setValue("password", e.detail.value!)}
          />
          {errors.password && (
            <IonNote slot="error" color="danger">
              {errors.password.message}
            </IonNote>
          )}
        </IonItem>

        <IonButton
          type="submit"
          expand="block"
          className="ion-margin-top"
          disabled={isLoading}
        >
          {isLoading ? <IonSpinner name="crescent" /> : "Iniciar Sesión"}
        </IonButton>
      </form>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={handleAlertDismiss}
        header="Error de autenticación"
        //message={error}
        buttons={["OK"]}
      />
    </>
  );
};
