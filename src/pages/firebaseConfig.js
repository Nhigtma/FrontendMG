import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAM6pzvQSVsc5j2Vi0cJZen0O9vMBYI4rc",
    authDomain: "modoguerra-416d1.firebaseapp.com",
    projectId: "modoguerra-416d1",
    storageBucket: "modoguerra-416d1.appspot.com",
    messagingSenderId: "154663220380",
    appId: "1:154663220380:web:035456aabf654171b86959",
    measurementId: "G-FNYEE4VP1H"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
