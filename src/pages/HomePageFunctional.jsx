import React from "react";
import AddTodo from "components/AddTodo";
import TodoSection from "components/TodoSection";
import Search from "components/Search";

const HomePageFunctional = (props) => {
  const [todo, setTodo] = React.useState([]);
  const [completed, setCompleted] = React.useState([]);
  const [searching, setSearching] = React.useState(false);
  const [filteredTodo, setFilteredTodo] = React.useState([]);
  const [filteredCompleted, setFilteredCompleted] = React.useState([]);

  const localStorageSaveTimeout = 3000;

  React.useEffect(()=>{
    setTodo(JSON.parse(localStorage.getItem("todo") || "[]"));
    setCompleted(JSON.parse(localStorage.getItem("completed") || "[]"));
  }, []);

  const getDataFromType = (type) => {
    return type === "todo" ? [[...todo], setTodo] : ( type === "completed" ? [[...completed], setCompleted] : [] );
  }

  const handleAdd = ({ title, description, timestamp }) => {
    let todoNew = [...todo];
    todoNew.push({ title, description, timestamp });
    setTodo(todoNew);
    requestIdleCallback( () => {
      localStorage.setItem("todo", JSON.stringify(todoNew));
    }, {timeout: localStorageSaveTimeout});
  }

  const handleDelete = (index, type) => {
    let [data, setData]  = getDataFromType(type);
    data.splice(index, 1);
    setData(data);
    requestIdleCallback( () => {
      localStorage.setItem(type, JSON.stringify(data));
    }, {timeout: localStorageSaveTimeout});
  }

  const handleItemEdit = (index, type, title, description) => {
    let [data, setData]  = getDataFromType(type);
    if (title) { data[index].title = title };
    if (description) { data[index].description = description };
    setData(data);
    requestIdleCallback( () => {
      localStorage.setItem(type, JSON.stringify(data));
    }, {timeout: localStorageSaveTimeout});
  }

  const toggleType = (type) => {
    return type === "todo" ? "completed" : "todo";
  }

  const moveItem = (index, from) => {
    const to = toggleType(from);
    let [fromItems, setFromItems] = getDataFromType(from);
    let [toItems, setToItems] = getDataFromType(to);

    let item = fromItems[index];
    fromItems.splice(index, 1);
    toItems.push(item);

    setFromItems(fromItems);
    setToItems(toItems);
    requestIdleCallback( () => {
      localStorage.setItem(from, JSON.stringify(fromItems));
      localStorage.setItem(to, JSON.stringify(toItems));
    }, {timeout: localStorageSaveTimeout})
  }

  const searchLogic = (data, text) => {
    const res = data.filter(d => { return d.title.toLowerCase().search(text.toLowerCase()) !== -1; })
    return res;
  }

  const handleSearch = (text) => {
    if (text === null || text === "") {
      setSearching(false);
      return;
    }
    const filteredTodo = searchLogic(todo, text);
    let filteredCompleted = searchLogic(completed, text);
    if(filteredTodo.length === 0 && filteredCompleted.length === 0 && !text) {
      setSearching(false);
    }
    else{
      setSearching(true);
      setFilteredTodo(filteredTodo);
      setFilteredCompleted(filteredCompleted);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row w-100 justify-content-center mt-5">
        <div className="col-10">
          <AddTodo onAdd={handleAdd}></AddTodo>
        </div>
      </div>
      <div className="row w-100 justify-content-center mt-5">
        <div className="col-10">
          <Search className="w-100" onSearch={handleSearch}></Search>
        </div>
      </div>
      <div className="row w-100 justify-content-center mt-3">
        <div className="col-md-6">
          <TodoSection name="Todo" type="todo" items={searching ? filteredTodo : todo} onDelete={handleDelete} onEdit={handleItemEdit} moveItem={moveItem} />
        </div>
        <div className="col-md-6">
          <TodoSection name="Completed" type="completed" items={searching ? filteredCompleted : completed} onDelete={handleDelete} onEdit={handleItemEdit} moveItem={moveItem} />
        </div>
      </div>
    </div>
  )
}

export default HomePageFunctional;