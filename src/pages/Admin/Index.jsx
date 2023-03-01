import { useEffect, useState } from "react";

import Layout from "@/components/Layout/Index";

import { auth, database } from "@/services/firebase";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where
} from "firebase/firestore";

const Admin = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const userDetail = localStorage.getItem("@detailUser");
    setUser(JSON.parse(userDetail));

    if (!userDetail) return;

    const data = JSON.parse(userDetail);

    const taskRef = collection(database, "tasks");
    const taskQuery = query(
      taskRef,
      orderBy("created", "desc"),
      where("userUid", "==", data?.uId)
    );

    const unsub = onSnapshot(taskQuery, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        task: doc.data().task,
        userUid: doc.data().userUid,
      }));
      console.log(list);
      setTasks(list);
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (newTask === "") {
      alert("Digite sua tarefa!");
      return;
    }

    try {
      await addDoc(collection(database, "tasks"), {
        task: newTask,
        created: new Date(),
        userUid: user?.uId,
      });
      setNewTask("");
      console.log("Tarefa registrada!");
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  };

  const handleDeleteTask = async (id) => {
    const docRef = doc(database, "tasks", id);

    try {
      await deleteDoc(docRef);
      console.log("Deletado com sucesso!");
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout pageTitle="Admin">
      <hgroup>
        <h1 className="text-center heading">Meu TODO</h1>
        <h4 className="text-center">
          Aqui estão todas as suas tarefas, organize-as como achar melhor! 😉
        </h4>
      </hgroup>
      <article>
        <form onSubmit={handleCreateTask}>
          <textarea
            placeholder="Adicione uma tarefa..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">Adicionar tarefa</button>
        </form>
      </article>
      <article>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <p>{task.task}</p>
              <div>
                <button>Editar</button>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </article>
      <button className="logout" onClick={handleLogOut}>
        Sair
      </button>
    </Layout>
  );
};

export default Admin;
