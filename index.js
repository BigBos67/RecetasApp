import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent llama a AppRegistry.registerComponent('main', () => App);
// También garantiza que, independientemente de si carga la aplicación en Expo Go o en una compilación nativa,
// El entorno está configurado adecuadamente
registerRootComponent(App);
