import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Container } from '@material-ui/core'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import mapDispatchToProps from '../../redux/mapDispatchToProps'
import mapStateToProps from '../../redux/mapStateToProps'
import AddExpenseModal from '../AddExpenseModal/AddExpenseModal'
import ExpenseFilter from '../ExpenseFilter/ExpenseFilter'
import ExpenseList from '../ExpenseList/ExpenseList'
import Navbar from '../Navbar/Navbar'

function Home(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function openModalHandler() {
        setModalIsOpen(true)
        setTimeout(() => {
          document.querySelector('#expenseName').focus()
        }, 50)
    }

    return (
        <div>
            <Navbar />
            <Container maxWidth="md" style={{ marginTop: '8rem' }}>

                <Box display="flex">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={openModalHandler}
                        style={{ outline: 'none' }}
                    >
                        <FontAwesomeIcon icon={faPlusCircle} size="lg" style={{ marginRight: 5 }} />
                  Add Expense
                </Button>
                </Box>

                <AddExpenseModal open={modalIsOpen} onClose={() => setModalIsOpen(false)} />

                <ExpenseFilter />

                {props.filteredExpenses.length ?
                    (<ExpenseList className="mt-3" expenses={props.filteredExpenses} />)
                    :
                    null}

            </Container>

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
