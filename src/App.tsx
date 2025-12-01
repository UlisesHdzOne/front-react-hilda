import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import AppRouter from "./app/router/AppRouter";

/* Core CSS */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Dark mode */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme */
import "./theme/variables.css";
import AuthProvider from "./app/providers/AuthProvider";

setupIonicReact();

const App = () => {
  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <AppRouter />
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
