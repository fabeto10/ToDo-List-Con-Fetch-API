import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
function App() {
	const [todos, setTodos] = useState([
		// [
		// 	{ label: "Make coffe", done: false },
		// 	{ label: "Walk the dog", done: false },
		// 	{ label: "Do the replits", done: false },
		// ],
	]);
	const [todo, setTodo] = useState("");
	const [todoEditing, setTodoEditing] = useState(null);
	const [editingText, setEditingText] = useState("");
	const createUser = useCallback(async () => {
		try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/fabeto10",
				{
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify([]),
				}
			);
			if (response.status !== 200) {
				alert("fallo la creacion del usuario");
				return;
			}
			getToDos();
		} catch (error) {
			alert("Esta caido el servidor !");
			return;
		}
	}, [getToDos]);

	const getToDos = useCallback(async () => {
		try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/fabeto10"
			);
			if (response.status !== 200) {
				if (response.status === 404) await createUser();
				return;
			}
			const body = await response.json();
			setTodos(body);
		} catch (error) {
			alert("Esta caido el servidor !");
			return;
		}
	}, [setTodos]);
	useEffect(() => {
		getToDos();
	}, [getToDos]);

	const createTask = async (event) => {
		try {
			let response = {};
			if (event.key == "Enter") {
				console.log("se dio enter");
				response = await fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/fabeto10",
					{
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify([
							...todos,
							{ label: todo, done: false },
						]),
					}
				);
			}
			// if (response.ok) {
			// 	setTodos([...todos, { label: todo, done: false }]);
			// 	console.log(response);
			// }
			console.log(response.ok);
		} catch (error) {
			console.log(error);
		}
	};

	async function handleSubmit(e) {
		e.preventDefault();
		try{
			let response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/fabeto10",
				{
					method: "PUT",
					headers: {"Content-Type" : "application/json"},
					body: JSON.stringify([
						...todos,
						{label:todo , done: false},
					]),
				}
			);
		if(response.ok){
			setTodos([...todos, {label:todo, done: false}])
		} else if (response.status !== 200) {
			if (response.status === 404) await createUser();
			return;
		}
	}
		// const newTodo = {
		// 	id: new Date().getTime(),
		// 	text: todo,
		// 	completed: false,
		// };
		// setTodos([...todos].concat(newTodo));
		// setTodo(""); 
		catch (error){
			console.log(error)
		}
	}

	async function deleteTodo(id) {
		const updateTodos = [...todos].filter((todo, index) => index !== id);
		console.log(updateTodos)
		try{
			let response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/fabeto10",
				{
					method: "PUT",
					headers: {"Content-Type" : "application/json"},
					body: JSON.stringify(updateTodos),
				}
			);
			if (response.ok){
				setTodos(updateTodos);
			}
		}
		catch(error){
			console.log(error)
		}
	}

	async function deleteAllTodos(e) {
		e.preventDefault();
		try{
			let response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/fabeto10",
				{
					method: "DELETE",
					headers: {"Content-Type" : "application/json"},
					body: JSON.stringify([]),
				}
			);
			if (response.ok){
				// setTodos([]);
				await createUser()
			}
		}
		catch(error){
			console.log(error)
		}
	}

	async function editTodo(id) {
		const updateTodos = [...todos].map((todo, index) => {
			if ( index === id) {
				todo.label = prompt()
			}
			return todo;
		});
		// setTodos(updateTodos);
		// setTodoEditing(null);
		// setEditingText("");
		try{
			let response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/fabeto10",
				{
					method: "PUT",
					headers: {"Content-Type" : "application/json"},
					body: JSON.stringify(updateTodos),
				}
			);
			if (response.ok){
				setTodos(updateTodos);
			}
		}
		catch(error){
			console.log(error)
		}
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
					value={todo}
					// onKeyDown={createTask}
					onChange={(e) => setTodo(e.target.value)}
				/>
				<button className="btn btn-primary m-1" type="submit">
					Submit
				</button>
				<button
					className="m-1 btn btn-danger"
					onClick={(e) => {
						deleteAllTodos(e)
					}}>
					Delete All Task
				</button>
			</form>
			{todos.map((todo, index) => (
				<div className="todoKey" key={index}>
					{todoEditing === todo.label ? (
						<input
							// task={task.label}
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
								{"- " + todo.label}
							</div>
						</div>
					)}
					<button
						className="m-1 btn btn-warning"
						onClick={() => deleteTodo(index)}>
						Delete
					</button>
					{/* <button
						className="m-1 btn btn-success"
						onClick={() => setTodoEditing(index)}>
						Edit Todo
					</button> */}
					<button
						className="m-1 btn btn-success"
						onClick={() => editTodo(index)}>
						Edit Text
					</button>
				</div>
			))}
		</div>
	);
}

App.propTypes = {
	setterList: PropTypes.func,
	task: PropTypes.string,
};
export default App;
