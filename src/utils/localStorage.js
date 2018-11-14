export const getCurrentUser = () => {
    try {
        const serializedState = localStorage.getItem('currentUser');
        if (serializedState == null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const setCurrentUser = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('currentUser', serializedState);
    } catch (err) {
        // Ignore write errors
    }
};

export const getLogin = () => {
    try {
        const serializedState = localStorage.getItem('login');
        if (serializedState == null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const setLogin = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('login', serializedState);
    } catch (err) {
        // Ignore write errors
    }
};
