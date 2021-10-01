import { shallow, mount } from "enzyme";
import TodoSection from "components/todoSection";
import TodoItem from "components/todoItem";

describe('TodoItem', () => {
  it('should render correctly with name, type and items', () => {
    const component = shallow(< TodoSection name="Hello" type="completed" items={[]} />);
    expect(component).toMatchSnapshot();
  });

  it('should call render all the TodoItems', ()=>{
    const component = shallow(< TodoSection name="Hello" type="completed" items={[
      {
        title: "Hello",
        description: "World"
      },
      {
        title: "Hello2",
        description: "World2"
      }
    ]} />);
    expect(component.find(TodoItem)).toHaveLength(2);
  })
})