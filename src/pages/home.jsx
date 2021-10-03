import React from "react";
import AddTodo from "components/addTodo";
import TodoSection from "components/todoSection";
import Search from "components/search";

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      completed: [],
      searching: false,
      filteredTodo: [],
      filteredCompleted: []
    };
  }

  componentDidMount() {
    const todo = JSON.parse(localStorage.getItem("todo") || "[]");
    const completed = JSON.parse(localStorage.getItem("completed") || "[]");
    this.setState({ todo, completed });
  }

  handleAdd = ({ title, description, timestamp }) => {
    let todo = this.state.todo;
    todo.push({ title, description, timestamp });
    this.setState({ todo });
    localStorage.setItem("todo", JSON.stringify(todo));
  }

  handleDelete = (index, type) => {
    let items = this.state[type]
    items.splice(index, 1);
    this.setState({ [type]: items })
    localStorage.setItem(type, JSON.stringify(items));
  }

  handleItemEdit = (index, type, title, description) => {
    let items = this.state[type];
    if(title) { items[index].title = title };
    if(description) { items[index].description = description };
    this.setState({ [type]: items });
  }

  toggleType = (type) => {
    return type === "todo" ? "completed" : "todo";
  }

  moveItem = (index, from) => {
    const to = this.toggleType(from);
    let fromItems = this.state[from]; 
    let toItems = this.state[to];
    let item = fromItems[index];

    fromItems.splice(index, 1);
    toItems.push(item);

    this.setState({ [from]: fromItems, [to]: toItems })
    localStorage.setItem(from, JSON.stringify(fromItems));
    localStorage.setItem(to, JSON.stringify(toItems));
  }

  searchLogic = (data, text) => {
    let res = [];
    text = text.toLowerCase();
    for(let i in data) {
      let title = data[i].title.toLowerCase();
      if(title.search(text) !== -1) {
        res.push(data[i]);
      }
    }
    return res;
  }

  handleSearch = (text) => {
    if(text === null || text === "") {
      this.setState({searching: false});
      return;
    }
    const { todo, completed } = {...this.state};
    const filteredTodo = this.searchLogic(todo, text);
    let filteredCompleted = this.searchLogic(completed, text);
    const newState = (filteredTodo.length === 0 && filteredCompleted.length === 0 && !text) ? {searching: false} : {searching: true, filteredTodo: filteredTodo, filteredCompleted: filteredCompleted};
    this.setState({...newState});
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row w-100 justify-content-center mt-5">
          <div className="col-10">
            <AddTodo onAdd={this.handleAdd}></AddTodo>
          </div>
        </div>
        <div className="row w-100 justify-content-center mt-5">
          <div className="col-10">
          <Search className="w-100" onSearch={this.handleSearch}></Search>
          </div>
        </div>
        <div className="row w-100 justify-content-center mt-3">
          <div className="col-md-6">
            <TodoSection name="Todo" type="todo" items={this.state.searching ? this.state.filteredTodo : this.state.todo} onDelete={this.handleDelete} onEdit={this.handleItemEdit} moveItem={this.moveItem} />
          </div>
          <div className="col-md-6">
            <TodoSection name="Completed" type="completed" items={this.state.searching ? this.state.filteredCompleted : this.state.completed} onDelete={this.handleDelete} onEdit={this.handleItemEdit} moveItem={this.moveItem}/>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
