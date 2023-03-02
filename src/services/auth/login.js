import { signInWithEmailAndPassword } from "firebase/auth";

const signInUser = async (auth, user) => {
  if (user.email === "" || user.password === "") throw "Preencha os campos!";

  try {
    await signInWithEmailAndPassword(auth, user.email, user.password);
  } catch (error) {
    throw error.code;
  }
};

export { signInUser };

