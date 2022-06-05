import React, { useState } from "react";

function App() {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState("");
	const [todoEditing, setTodoEditing] = useState(null);
	const [editingText, setEditingText] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		const newTodo = {
			id: new Date().getTime(),
			text: todo,
			completed: false,
		};
		setTodos([...todos].concat(newTodo));
		setTodo("");
	}

	function deleteTodo(id) {
		const updateTodos = [...todos].filter((todo) => todo.id !== id);
		setTodos(updateTodos);
	}

	function editTodo(id) {
		const updateTodos = [...todos].map((todo) => {
			if (todo.id === id) {
				todo.id = editingText;
			}
			return todo;
		});
		setTodos(updateTodos);
		setTodoEditing(null);
		setEditingText("");
	}

	return (
		<div
			className="App d-flex container-fluid row justify-content-center mt-5"
			style={{
				borderRadius: "7%",
				border: "5px solid black",
				backgroundColor: "grey",
				width: "380px",
				margin: "auto",
			}}>
			<p>{"Todo List"}</p>
			<form onSubmit={handleSubmit}>
				<input
					type={"text"}
					onChange={(e) => setTodo(e.target.value)}
					value={todo}
				/>
				<button className="btn btn-primary m-1" type="submit">
					Submit
				</button>
			</form>
			{todos.map((todo) => (
				<div className="todoKey" key={todo.id}>
					{todoEditing === todo.id ? (
						<input
							className="d-flex row"
							type={"text"}
							onChange={(e) => setEditingText(e.target.value)}
							value={editingText}
						/>
					) : (
						<div className="d-flex row input1 ">
							<div
								style={{ fontSize: "20px" }}
								className="todoText">
								{"- " + todo.text}
							</div>
						</div>
					)}
					<button
						className="m-1 btn btn-danger"
						onClick={() => deleteTodo(todo.id)}>
						Delete
					</button>
					<button
						className="m-1 btn btn-success"
						onClick={() => setTodoEditing(todo.id)}>
						Edit Todo
					</button>
					<button
						className="m-1 btn btn-warning"
						onClick={() => editTodo(todo.id)}>
						Submit Edit
					</button>
				</div>
			))}
		</div>
	);
}

export default App;
