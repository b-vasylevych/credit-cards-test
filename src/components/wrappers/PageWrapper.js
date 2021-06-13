import React from 'react';
import { makeStyles } from '@material-ui/core';
import Theme from '../../common/Theme';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: Theme.colors.background,
        minHeight: 'calc(100vh - 4.5em)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '2em 2em 2.5em 2em'
    },
}));

const PageWrapper = ({ children }) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {children}
        </div>
    );
};

export default PageWrapper;