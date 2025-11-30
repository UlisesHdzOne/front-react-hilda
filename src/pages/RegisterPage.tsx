import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import { IonCard, IonCardContent, IonText } from '@ionic/react'

const RegisterPage = () => {
  return (
    <AuthLayout>
        <IonCard>
            <IonCardContent>
                <IonText>
                    <h2 className='ion-text-center'>Crear Cuenta</h2>
                </IonText>
            </IonCardContent>
        </IonCard>
    </AuthLayout>
  )
}

export default RegisterPage