import { useState } from "react";

import * as formCss from "@modules/form.module.css";
import * as tasksCss from "@modules/tasks.module.css";

const Task = ({ data, editCallback, deleteCallback }) => {
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState({
    completed: data.completed,
    id: data.id,
    name: data.name,
  });

  const handleEditCallback = () => {
    setEditing(false);
    editCallback(task);
  };

  return (
    <div className={tasksCss.taskCard}>
      {editing ? (
        <>
          <input
            type="text"
            className={formCss.input}
            value={task.name}
            onChange={(e) =>
              setTask({
                name: e.target.value,
                completed: task.completed,
                id: task.id,
              })
            }
          />
          <button
            className={`${tasksCss.btn} ${tasksCss.primary} ${tasksCss.save}`}
            onClick={handleEditCallback}
          >
            Salvar
          </button>
        </>
      ) : (
        <span className={tasksCss.description}>{data.name}</span>
      )}
      <div className={tasksCss.taskBtns}>
        {editing ? (
          <button
            className={`${tasksCss.btn} ${tasksCss.danger}`}
            onClick={() => setEditing(false)}
          >
            Cancelar
          </button>
        ) : (
          <button
            className={`${tasksCss.btn} ${tasksCss.primary}`}
            onClick={() => setEditing(true)}
          >
            Editar
          </button>
        )}
        <button
          className={`${tasksCss.btn} ${tasksCss.danger}`}
          onClick={() => deleteCallback(data.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Task;
