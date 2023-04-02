import { collection } from "firebase/firestore";
import { db } from "./firebase-config";

export const dateCollectionRefDeadEnds = collection(db, "deadEnds");
export const dateCollectionRefTags = collection(db, "tags");
