export const initialState = null;

export const reduce = (state,action)=>{
    if(action.type==="USER"){
        return action.payload;
    }
    return state;
}