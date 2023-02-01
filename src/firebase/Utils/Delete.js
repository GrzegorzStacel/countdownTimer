import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

export function deleteDateNote(id, title) {
  const docRef = doc(db, "deadEnds", id);
  deleteDoc(docRef)
    .then(() => console.log(`Document "${title}" is deleted`))
    .catch((err) => console.log(err.message));
}
