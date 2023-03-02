import Task from "@/components/Task/Index";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";

import { database } from "@/services/firebase";

import { toast } from "react-toastify";

import * as tasksCss from "@modules/tasks.module.css";

const TaskList = ({ tasks, callback }) => {
  const handleEditTaskCallback = async (task) => {
    const docRef = doc(database, "tasks", task.id);

    try {
      await updateDoc(docRef, {
        completed: task.completed,
        name: task.name,
      });
      toast.success("Tarefa editada com sucesso!");
      callback();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDeleteTaskCallback = async (id) => {
    const docRef = doc(database, "tasks", id);

    try {
      await deleteDoc(docRef);
      toast.success("Removido com sucesso!");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className={tasksCss.taskList}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          data={task}
          editCallback={handleEditTaskCallback}
          deleteCallback={handleDeleteTaskCallback}
        />
      ))}
    </div>
  );
};

export default TaskList;
