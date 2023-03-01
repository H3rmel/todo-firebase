import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Layout from "@/components/Layout/Index";

import { auth } from "@/services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (user.email === "" && user.password === "")
      toast.error("Preencha os campos!");
    else
      try {
        await createUserWithEmailAndPassword(auth, user.email, user.password);
        toast.success("Registrado com sucesso!");
        navigate("/admin", { replace: true });
      } catch (error) {
        toast.error(error);
      }
  };

  return (
    <Layout pageTitle="Registrar-se">
      <h1 className="text-center heading">Registre-se</h1>
      <h4 className="text-center">Vamos criar sua conta!</h4>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Digite seu e-mail..."
          value={user.email}
          onChange={(e) =>
            setUser({ email: e.target.value, password: user.password })
          }
        />
        <input
          autoComplete="false"
          type="password"
          placeholder="Digite sua senha..."
          value={user.password}
          onChange={(e) =>
            setUser({ email: user.email, password: e.target.value })
          }
        />
        <button type="submit">Criar conta</button>
      </form>
      <Link to="/">Já possui conta? É só logar</Link>
    </Layout>
  );
};

export default Register;
