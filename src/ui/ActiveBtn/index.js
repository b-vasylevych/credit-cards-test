import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Theme from '../../common/Theme';

const ActiveBtn = withStyles(() => ({
    root: {
        color: 'white',
        backgroundColor: Theme.colors.primary,
        borderRadius: 100,
        textTransform: 'none',
        width: '100%',
        padding: '12px 24px',
        fontWeight: 600,
        fontSize: 16,
        fontFamily: 'lineto',

        '&:hover': {
            backgroundColor: Theme.colors.primary
        },

        '&:disabled': {
            color: 'white',
            backgroundColor: `rgba(85,14,197, 0.1)`
        }
    },
}))(Button);

export default ActiveBtn