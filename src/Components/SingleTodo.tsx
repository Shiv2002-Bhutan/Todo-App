import { MdEdit } from "react-icons/md";
import { Task } from "../Tasks";
import { AiFillDelete } from "react-icons/ai";
import { MdDownloadDone } from "react-icons/md";
import "./Styles.css";
import { useState, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Task;
  todos: Task[];
  setTodos: React.Dispatch<React.SetStateAction<Task[]>>;
}

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo); // Initialize with task text

  // Toggles the completion status of the task
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // Deletes the task from the list
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Handles the editing of task text
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  // Focuses on the input when `edit` mode is activated
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (edit) {
      inputRef.current?.focus();
    }
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos-single"
          onSubmit={(e) => handleEdit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todo-input"
              placeholder="Edit task..."
              aria-label="Edit task"
            />
          ) : todo.isDone ? (
            <s className="todos-single-text">{todo.todo}</s> // Strikethrough for completed tasks
          ) : (
            <span className="todos-single-text">{todo.todo}</span> // Normal text for active tasks
          )}

          <div className="icons">
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(true); // Only enable edit if not in edit mode and task is active
                }
              }}
              title="Edit Task"
            >
              <MdEdit />
            </span>
            <span
              className="icon"
              onClick={() => handleDelete(todo.id)}
              title="Delete Task"
            >
              <AiFillDelete />
            </span>
            <span
              className="icon"
              onClick={() => handleDone(todo.id)}
              title="Mark as Done"
            >
              <MdDownloadDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
