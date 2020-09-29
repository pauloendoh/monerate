import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import actionTypes from '../../redux/actions/actionTypes';
import NavbarUseStyles from './NavbarUseStyles'

const mapStateToProps = state => {
    return {
        authUser: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        LOGOUT: () => dispatch({ type: actionTypes.LOGOUT }),
    }
}


const Navbar = (props) => {
    const classes = NavbarUseStyles();

    const [ dropdownButtonEl, setDropdownButtonEl] = useState(null);
    const [mobileDropdownButtonEl, mobileSetDropdownButtonEl] = useState(null);

    const isMenuOpen = Boolean(dropdownButtonEl);
    const isMobileMenuOpen = Boolean(mobileDropdownButtonEl);

    const openProfileMenuHandler = (event) => {
        setDropdownButtonEl(event.currentTarget);
    };

    const closeProfileMenuHandler = () => {
        setDropdownButtonEl(null);
        mobileCloseProfileMenuHandler();
    };

    const mobileOpenProfileMenuHandler = (event) => {
        mobileSetDropdownButtonEl(event.currentTarget);
    };

    const mobileCloseProfileMenuHandler = () => {
        mobileSetDropdownButtonEl(null);
    };

    // PE 2/3 - transformar em subcomponent?
    const menuId = 'primary-search-account-menu';
    const dropdownMenuJSX = (
        <Menu anchorEl={dropdownButtonEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            open={isMenuOpen} onClose={closeProfileMenuHandler}
            keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            disableScrollLock={true}
        >
            <MenuItem onClick={props.LOGOUT}>Sign out</MenuItem>
        </Menu>
    );

    // PE 2/3 - transformar em subcomponent?
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const mobileDropdownMenuJSX = (
        <Menu id={mobileMenuId}
            open={isMobileMenuOpen} onClose={mobileCloseProfileMenuHandler}
            anchorEl={mobileDropdownButtonEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <MenuItem onClick={openProfileMenuHandler}>
                <IconButton aria-label="account of current user" aria-controls="primary-search-account-menu"
                    aria-haspopup="true" color="inherit">
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    // ==================== TEMPLATE ====================
    return (
        <div className={classes.grow}>
            <AppBar position="fixed" className='shadow-sm'>
                <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" aria-label="open drawer"
                        className={classes.menuButton}
                    />

                    <Typography className={classes.title} variant="h6"
                        noWrap style={{ "color": "#151515" }}>
                        Monerate
                    </Typography>

                    <div className={classes.grow}></div>

                    <div className={classes.sectionDesktop}>
                        <IconButton onClick={openProfileMenuHandler}
                            className={classes.dropdownIconButton}
                            edge="end" aria-label="account of current user" aria-controls={menuId}
                            aria-haspopup="true"  disableRipple={true}>
                            <AccountCircle />
                            <div className={classes.emailDiv}>
                                {props.authUser.email}
                            </div>
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={mobileOpenProfileMenuHandler}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {mobileDropdownMenuJSX}
            {dropdownMenuJSX}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar) 