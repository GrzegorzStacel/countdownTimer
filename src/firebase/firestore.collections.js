import { collection } from "firebase/firestore";
import { db } from "./firebase-config";

export const dateCollectionRef = collection(db, "deadEnds");
