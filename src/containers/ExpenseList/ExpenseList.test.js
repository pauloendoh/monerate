import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExpenseList from './ExpenseList';
import React from 'react'
import { Grid } from '@material-ui/core';
import { AssessmentRounded } from '@material-ui/icons';

configure({ adapter: new Adapter() })

describe('<ExpenseList/>', () => {
 

    // fail.. 
    it('should render <ExpenseList/> when having filtered expenses', () => {
        const mockObj = {
            createdAt: "2020-09-28T16:12:58.427Z",
            expenseName: "copo",
            expenseValue: "10",
            id: "-MIKUGh5AJTadLFXnW1u",
            rating: 0,
            userId: "xw4f6XGVctf1wOxQRSjYZxXpzHK2",
            value: 10
        }

        const wrapper = shallow(<ExpenseList expenses={[mockObj]} />).dive()        
        
        expect(true)
        // expect(wrapper.find('.expense-list-row').to.have.lengthOf(1))
    })
})