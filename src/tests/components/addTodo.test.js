import { shallow, mount } from "enzyme";
import AddTodo from "components/addTodo";

const clickFn = jest.fn();

describe('AddTodo', () => {
  it('should render correctly with no props', () => {
    const component = shallow(< AddTodo />);
    expect(component).toMatchSnapshot();
  });

  it('should call onAdd prop when add button is clicked', () => {
    const component = mount(< AddTodo onAdd={clickFn} />);
    const titleInput = component.find('input#title-input');
    const descriptionInput = component.find('textarea#description-input');
    titleInput.simulate('change', { target: { value: 'Hello' } });
    descriptionInput.simulate('change', { target: { value: 'World' } })
    
    component.find('button#add').simulate('click');
    
    expect(clickFn).toHaveBeenCalled();
    expect(titleInput.get(0).props.value).toEqual("");
    expect(descriptionInput.get(0).props.value).toEqual("");
    expect(descriptionInput.get(0).props.style).toHaveProperty('display', 'none');
    component.unmount();
  });

  it('should not call onAdd when title is missing', () => {
    const component = mount(< AddTodo onAdd={clickFn} />);
    component.find('button#add').simulate('click');
    expect(clickFn).not.toHaveBeenCalled();
    component.unmount();
  })

  it('should display description box when title is not empty', () => {
    const component = mount(< AddTodo onAdd={clickFn} />);
    const titleInput = component.find('input#title-input');
    const descriptionInput = component.find('textarea#description-input');
    
    titleInput.instance().value = "Hello"
    titleInput.simulate('change');
    
    expect(descriptionInput.instance().style).toHaveProperty('display', 'block');
    component.unmount();
  });

  it('should not display description box when title is empty', ()=>{
    const component = mount(< AddTodo onAdd={clickFn} />);
    const titleInput = component.find('input#title-input');
    const descriptionInput = component.find('textarea#description-input');
    expect(descriptionInput.instance().style).toHaveProperty('display', 'none');

    titleInput.instance().value = ""
    titleInput.simulate('change');
    
    expect(descriptionInput.instance().style).toHaveProperty('display', 'none');
    component.unmount();
  });
})
