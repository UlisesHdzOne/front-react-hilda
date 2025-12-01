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
import { RegisterData } from "../../features/auth/api/auth.types";
import { useAuth } from "../../contexts/AuthContext";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { register: registerUser, isLoading, error, clearError } = useAuth();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterData & { confirmPassword: string }>();

  const password = watch("password");

  useEffect(() => {
    register("name", {
      required: "El nombre es obligatorio",
      minLength: {
        value: 2,
        message: "Mínimo 2 caracteres",
      },
    });

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
        value: 8,
        message: "Mínimo 8 caracteres",
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        message: "Debe contener mayúsculas, minúsculas y números",
      },
    });

    register("confirmPassword", {
      required: "Confirma tu contraseña",
      validate: (value) => value === password || "Las contraseñas no coinciden",
    });
  }, [register, password]);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
  }, [error]);

  const onFormSubmit = async (data: RegisterData) => {
    try {
      await registerUser(data);
      onSuccess?.();
    } catch (err) {
      console.error("Register error:", err);
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
          <IonLabel position="stacked">Nombre completo</IonLabel>
          <IonInput
            type="text"
            placeholder="Ingresa tu nombre"
            onIonInput={(e) => setValue("name", e.detail.value!)}
          />
          {errors.name && (
            <IonNote slot="error" color="danger">
              {errors.name.message}
            </IonNote>
          )}
        </IonItem>

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
            placeholder="Crea una contraseña"
            onIonInput={(e) => setValue("password", e.detail.value!)}
          />
          {errors.password && (
            <IonNote slot="error" color="danger">
              {errors.password.message}
            </IonNote>
          )}
        </IonItem>

        <IonItem className="ion-margin-bottom">
          <IonLabel position="stacked">Confirmar Contraseña</IonLabel>
          <IonInput
            type="password"
            placeholder="Repite tu contraseña"
            onIonInput={(e) => setValue("confirmPassword", e.detail.value!)}
          />
          {errors.confirmPassword && (
            <IonNote slot="error" color="danger">
              {errors.confirmPassword.message}
            </IonNote>
          )}
        </IonItem>

        <IonButton
          type="submit"
          expand="block"
          className="ion-margin-top"
          disabled={isLoading}
        >
          {isLoading ? <IonSpinner name="crescent" /> : "Crear Cuenta"}
        </IonButton>
      </form>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={handleAlertDismiss}
        header="Error de registro"
        //message={error}
        buttons={["OK"]}
      />
    </>
  );
};
