import { shallow, mount } from 'enzyme';
import HomePage from 'pages/home';

describe('HomePage', () => {
    it('should render correctly with no props', () => {
        const component = shallow(< HomePage />);
        expect(component).toMatchSnapshot();
    });
    
    it('should update state from localStorage on mount', ()=>{
        const component = mount(< HomePage />)
    })

    it('should add an entry to todo and update localStorage', ()=>{

    })

    it("should remove the entry from items and update localStorage", ()=>{
    
    });
    
    it("should update the entry from items and update localStorage", ()=>{
    
    });

    it("should move the entry from todo to completed and update localStorage", ()=>{
    
    });

    it("should move the entry from completed to todo and update localStorage", ()=>{
    
    });

    it("should send filtered items if input entered in search", ()=>{

    })

    it("should send all items if no input is entered in search", ()=>{

    })
})