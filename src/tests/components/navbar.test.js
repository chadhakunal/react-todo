import { shallow } from "enzyme";
import Navbar from "components/navbar";

describe('Navbar', () => {
  it('should render correctly with no props', () => {
    const component = shallow(< Navbar />);
    expect(component).toMatchSnapshot();
  });
})