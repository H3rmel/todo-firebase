import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Layout from "@/components/Layout/Index";

import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { toast } from "react-toastify";

import * as formCss from "@modules/form.module.css";
import * as layoutCss from "@modules/layout.module.css";

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
      <hgroup className={layoutCss.headings}>
        <h1>Todo Firebase</h1>
        <h3>Gerencia suas tarefas de forma fácil!</h3>
      </hgroup>
      <form className={formCss.form} onSubmit={handleSignIn}>
        <input
          type="email"
          className={formCss.input}
          placeholder="Digite seu e-mail..."
          value={user.email}
          onChange={(e) =>
            setUser({ email: e.target.value, password: user.password })
          }
        />
        <input
          autoComplete="false"
          type="password"
          className={formCss.input}
          placeholder="Digite sua senha..."
          value={user.password}
          onChange={(e) =>
            setUser({ email: user.email, password: e.target.value })
          }
        />
        <div className={layoutCss.btns}>
          <button className={formCss.btn} type="submit">Acessar</button>
          <Link to="/register" className={layoutCss.link}>Não possui uma conta? Registre-se!</Link>
        </div>
      </form>
    </Layout>
  );
};

export default Home;
