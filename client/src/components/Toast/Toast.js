import toast from 'react-hot-toast';

const toast_success_1 = {
    style: {
        padding: '1rem'
    },
    iconTheme: {
        primary: '#087B44'
    }
}


const toast_success_2 = {
    style: {
        padding: '1rem',
        background: '#47D764',
        color: '#FFFFFF'
    },
    iconTheme: {
        primary: '#FFFFFF',
        secondary: '#47D764'
    }
}

const toast_error_1 = {
    style: {
        padding: '1rem'
    },
    iconTheme: {
        primary: '#dd2222'
    }
}

const toast_error_2 = {
    style: {
        padding: '1rem',
        background: '#FE355B',
        color: '#FFFFFF'
    },
    iconTheme: {
        primary: '#FFFFFF',
        secondary: '#FE355B'
    }
}

export const successToast = (message) => {
    toast.success(message, toast_success_1);
}

export const errorToast = (message) => {
    toast.error(message, toast_error_1);
}

export const successToast2 = (message) => {
    toast.success(message, toast_success_2);
}

export const errorToast2 = (message) => {
    toast.error(message, toast_error_2);
}