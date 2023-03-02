import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Layout from "@/components/Layout/Index";

import { auth } from "@/services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { toast } from "react-toastify";

import * as formCss from "@modules/form.module.css";
import * as layoutCss from "@modules/layout.module.css";

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
      <hgroup className={layoutCss.headings}>
        <h1>Registre-se</h1>
        <h3>Vamos criar sua conta!</h3>
      </hgroup>
      <form className={formCss.form} onSubmit={handleSignUp}>
        <input
          type="text"
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
          <button className={formCss.btn} type="submit">
            Criar conta
          </button>
          <Link to="/" className={layoutCss.link}>
            Já possui conta? É só logar
          </Link>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
