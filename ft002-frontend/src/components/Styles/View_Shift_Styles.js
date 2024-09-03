import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    // Your styles here
    drawer: {
        width: 'auto',
    },
    drawerContent: {
        padding: '20px',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
    },
    formSection: {
        marginBottom: '20px',
        width: '100%',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        color: 'white',
    },
    saveButton: {
        backgroundColor: '#007bff',
    },
    cancelButton: {
        backgroundColor: '#f44336',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    // ... rest of the styles ...
}));
