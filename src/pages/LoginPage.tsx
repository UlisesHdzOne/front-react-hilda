import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import { IonCard, IonCardContent, IonText } from '@ionic/react'

const LoginPage = () => {
  return (
    <AuthLayout>
        <IonCard>
            <IonCardContent>
                <IonText>
                    <h2 className='ion-text-center'>Iniciar Sesión</h2>
                </IonText>
            </IonCardContent>
        </IonCard>
    </AuthLayout>
  )
}

export default LoginPage