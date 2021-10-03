import { shallow, mount } from 'enzyme';
import HomePage from 'pages/home';
import AddTodo from "components/addTodo";
import TodoSection from "components/todoSection";
import Search from "components/search";

describe('HomePage', () => {

    const todoData = [
        {
            title: "Hello1",
            description: "World1"
        },
        {
            title: "Hello2",
            description: "World2"
        }
    ];

    const completedData = [
        {
            title: "Hello3",
            description: "World3"
        },
        {
            title: "Hello4",
            description: "World4"
        }
    ];

    beforeEach(()=>{
        localStorage.clear();
        localStorage.setItem("todo", JSON.stringify(todoData));
        localStorage.setItem("completed", JSON.stringify(completedData));
    })

    it('should render correctly with no props', () => {
        const component = shallow(< HomePage />);
        expect(component).toMatchSnapshot();
        expect(component.state("searching")).toBe(false);
        expect(component.state("filteredTodo")).toEqual([]);
        expect(component.state("filteredCompleted")).toEqual([]);
    });

    it('should update state from localStorage on mount', () => {
        const component = mount(< HomePage />);
        expect(component.state("todo")).toEqual(todoData);
        expect(component.state("completed")).toEqual(completedData);
    })

    it('should return set todo and completed to [] if localStorage is empty', ()=>{
        localStorage.clear()
        const component = mount(< HomePage />);
        expect(component.state("todo")).toEqual([]);
        expect(component.state("completed")).toEqual([]);
    })

    it('should add an entry to todo', () => {
        const newData = {
            title: "Hello 5",
            description: "World 5",
            timestamp: Date.now()
        };
        const component = shallow(< HomePage />);
        expect(component.state("todo")).toEqual(todoData);
        component.find('AddTodo').props().onAdd(newData);
        expect(component.state("todo")).toEqual(todoData.concat(newData));
    })

    it("should delete the entry from todo", () => {
        const component = shallow(< HomePage />);
        expect(component.state("todo")).toEqual(todoData);
        component.find('TodoSection').at(0).props().onDelete(1, "todo");
        expect(component.state("todo")).toEqual([todoData[0]]);
    });

    it("should delete the entry from completed", () => {
        const component = shallow(< HomePage />);
        expect(component.state("completed")).toEqual(completedData);
        component.find('TodoSection').at(1).props().onDelete(1, "completed");
        expect(component.state("completed")).toEqual([completedData[0]]);
    });

    it("should move the entry from todo to completed", () => {
        const component = shallow(< HomePage />);
        component.find('TodoSection').at(0).props().moveItem(0, "todo");
        expect(component.state("todo")).toEqual([todoData[1]]);
        expect(component.state("completed")).toEqual(completedData.concat([todoData[0]]));
    });

    it("should move the entry from completed to todo", () => {
        const component = shallow(< HomePage />);
        component.find('TodoSection').at(0).props().moveItem(0, "completed");
        expect(component.state("completed")).toEqual([completedData[1]]);
        expect(component.state("todo")).toEqual(todoData.concat([completedData[0]]))
    });

    it("should send filtered items if input entered in search", () => {
        const component = shallow(< HomePage />);
        component.find('Search').props().onSearch("Hello1");
        expect(component.find('TodoSection').at(0).props().items).toEqual([todoData[0]]);
        expect(component.find('TodoSection').at(1).props().items).toEqual([]);
        component.find('Search').props().onSearch("Hello3");
        expect(component.find('TodoSection').at(0).props().items).toEqual([]);
        expect(component.find('TodoSection').at(1).props().items).toEqual([completedData[0]]);
        component.find('Search').props().onSearch("");
        expect(component.find('TodoSection').at(0).props().items).toEqual(todoData);
        expect(component.find('TodoSection').at(1).props().items).toEqual(completedData);
    });

    it("should update the entry from todo items", () => {
        const component = shallow(< HomePage />);
        expect(component.state("todo")).toEqual(todoData);
        component.find('TodoSection').at(0).props().onEdit(0, "todo", "Hello", "World");
        let newData = [...todoData];
        newData[0].title = "Hello";
        newData[0].description = "World"
        expect(component.state("todo")).toEqual(newData);
    });

    it("should update the entry from completed items", () => {
        const component = shallow(< HomePage />);
        expect(component.state("completed")).toEqual(completedData);
        component.find('TodoSection').at(0).props().onEdit(0, "completed", "Hello", "World");
        let newData = [...completedData];
        newData[0].title = "Hello";
        newData[0].description = "World"
        expect(component.state("completed")).toEqual(newData);
    });

    it("should not update title when empty string", ()=>{
        const component = shallow(< HomePage />);
        expect(component.state("todo")).toEqual(todoData);
        component.find('TodoSection').at(0).props().onEdit(0, "todo", "", "World");
        let newData = [...todoData];
        newData[0].description = "World"
        expect(component.state("todo")).toEqual(newData);
    });

    it("should not update description when empty string", ()=>{
        const component = shallow(< HomePage />);
        expect(component.state("todo")).toEqual(todoData);
        component.find('TodoSection').at(0).props().onEdit(0, "todo", "Hello", "");
        let newData = [...todoData];
        newData[0].title = "Hello"
        expect(component.state("todo")).toEqual(newData);
    });
})