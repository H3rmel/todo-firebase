import * as tasksCss from "@modules/tasks.module.css";

const Tasks = ({ tasks }) => {
  return (
    <div className={tasksCss.taskList}>
      {tasks.map((task) => (
        <div key={task.id} className={tasksCss.taskCard}>
          <span className={tasksCss.description}>{task.task}</span>
          <div className={tasksCss.taskBtns}>
            <button className={`${tasksCss.btn} ${tasksCss.edit}`}>
              Editar
            </button>
            <button
              className={`${tasksCss.btn} ${tasksCss.remove}`}
              onClick={() => handleDeleteTask(task.id)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
