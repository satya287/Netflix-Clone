import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBwjDULBSJJDF0hY12dPPyoB-1UoME8x7k",
  authDomain: "netflix-clone-927a6.firebaseapp.com",
  projectId: "netflix-clone-927a6",
  storageBucket: "netflix-clone-927a6.appspot.com",
  messagingSenderId: "262724417803",
  appId: "1:262724417803:web:25f6f514cf0fc041224a0e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth (app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid, name,
            authProvider: "local",
            email,
        });
    }catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};