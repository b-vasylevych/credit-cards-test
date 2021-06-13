import React from 'react';
import { makeStyles } from '@material-ui/core';
import Theme from '../common/Theme';

const useStyles = makeStyles(() => ({
    root: {
    },
    title: {
        color: Theme.colors.primary,
        fontSize: Theme.fontSize.pageName,
        fontWeight: Theme.fontWeight.pageName,
        lineHeight: '42px'
    },
    subTitle: {
        color: Theme.colors.subTitle,
        fontWeight: Theme.fontWeight.subTitle,
        fontSize: Theme.fontSize.subTitle
    }
}));

const PageTitle = ({ title, subTitle }) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h2 className={classes.title}>{title}</h2>
            <p className={classes.subTitle}>{subTitle}</p>
        </div>
    );
};

export default PageTitle;