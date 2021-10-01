import { shallow, mount } from "enzyme";
import TodoItem from "components/todoItem";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ClearIcon from '@mui/icons-material/Clear';

const clickFn = jest.fn();

describe('TodoItem', () => {
  const requiredProps = { index: 0, name: "todo", type: "todo", title: "ToDo", description: "World" };

  it('should render correctly with props', () => {
    const component = shallow(<TodoItem {...requiredProps} />);
    expect(component).toMatchSnapshot();
  });

  // Delete
  it('should call onDelete prop when delete clicked', () => {
    const component = mount(<TodoItem onDelete={clickFn} {...requiredProps} />);

    component.find('button#delete-button').simulate('click');

    expect(clickFn).toHaveBeenCalledWith(0, "todo");
    component.unmount();
  });

  // Move
  it('should call moveItem prop when move clicked', () => {
    const component = mount(<TodoItem moveItem={clickFn} {...requiredProps} />);

    component.find('button#move-button').simulate('click');

    expect(clickFn).toHaveBeenCalledWith(0, "todo");
    component.unmount();
  });

  it('should render tick if type is todo', () => {
    const component = shallow(<TodoItem moveItem={clickFn} {...requiredProps} />);
    expect(component.find(DoneOutlineIcon)).toHaveLength(1);
  });

  it('should render cross if type is completed', () => {
    const component = shallow(<TodoItem moveItem={clickFn} {...requiredProps} type="completed" />);
    expect(component.find(ClearIcon)).toHaveLength(1);
  })

  // Edit
  it("Should toggle edit form on edit button click", () => {
    const component = mount(<TodoItem {...requiredProps} />);
    const editForm = component.find('div#edit-form-div');

    expect(editForm.instance().style).toHaveProperty('display', 'none');
    component.find('button#edit-button').simulate('click');
    expect(editForm.instance().style).toHaveProperty('display', 'block');
    component.find('button#edit-button').simulate('click');
    expect(editForm.instance().style).toHaveProperty('display', 'none');

    component.unmount();
  })

  it("Should call onEdit prop on submitting form and toggle the display", () => {
    const component = mount(<TodoItem {...requiredProps} onEdit={clickFn} />);
    component.find('button#edit-form-submit').simulate('submit', { target: [{ value: "title" }, { value: "description" }] });
    expect(clickFn).toHaveBeenCalled();
    component.unmount();
  })
})