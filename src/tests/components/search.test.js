import { shallow, mount } from "enzyme";
import Search from "components/search";

const clickFn = jest.fn();

describe('Search', () => {
  it('should render correctly with no props', () => {
    const component = shallow(< Search />);
    expect(component).toMatchSnapshot();
  });

  it('should call onSearch prop when text input changes', () => {
    const component = mount(< Search onSearch={clickFn} />);
    const searchInput = component.find("input#search-input");
    searchInput.instance().value = "Hello"
    searchInput.simulate('change');
    
    expect(clickFn).toHaveBeenCalledWith("Hello")
    component.unmount();
  });
})