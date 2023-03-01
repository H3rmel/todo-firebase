import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Layout from "@/components/Layout/Index";

import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { toast } from "react-toastify";

const Home = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (user.email === "" && user.password === "")
      toast.error("Preencha os campos!");
    else
      try {
        await signInWithEmailAndPassword(auth, user.email, user.password);
        navigate("/admin", { replace: true });
        toast.success("Logado com sucesso!");
      } catch (error) {
        toast.error(error);
      }
  };

  return (
    <Layout pageTitle="Login">
      <h4>Todo Firebase</h4>
      <h5>Gerencia suas tarefas de forma fácil!</h5>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
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
        <button type="submit">Acessar</button>
      </form>
      <Link to="/register">Não possui uma conta? Registre-se!</Link>
    </Layout>
  );
};

export default Home;
