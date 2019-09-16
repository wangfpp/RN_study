const iplist = (state= [], action) => {
    if (state.includes(action.ip)) {
        return state;
    } else {
        let newstate = [...state];
        newstate.push(action.ip);
        return newstate;
    }
}

export default  iplist;