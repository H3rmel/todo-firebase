import { createUserWithEmailAndPassword } from "firebase/auth";

const signUpUser = async (auth, user) => {
  if (user.email === "" || user.password === "") throw "Preencha os campos!";

  try {
    await createUserWithEmailAndPassword(auth, user.email, user.password);
  } catch (error) {
    throw error.code;
  }
};

export { signUpUser };

