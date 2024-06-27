import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCMPhiQ8Y5NV9gxdwI1wI1pWwcXxoZG6DQ",
  authDomain: "netflix-clone-426820.firebaseapp.com",
  projectId: "netflix-clone-426820",
  storageBucket: "netflix-clone-426820.appspot.com",
  messagingSenderId: "1068819893250",
  appId: "1:1068819893250:web:8142e57ed53b049a73ab1b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password)=>{
  try {
      await signInWithEmailAndPassword(auth, email, password);  
  } catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}
const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};
