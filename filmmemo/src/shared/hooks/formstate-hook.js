import { useCallback, useReducer } from "react"

export const useFormState = () => {

    const formReducer = (state, action) => {
        console.log(action.filmdata)
        // switch (action.type) {
        //     case 'YEAR': 
        //     state.year.value = action.value;
        //     state.year.isValid = action.value > 1800 && action.value <= new Date().getFullYear() ? true : false
        //     return state;
        //     default : 
        //     state[`${action.type}`].value = action.value;
        //     state[`${action.type}`].isValid = action.value? true : false
        //     return state;
        // };

     
    }

    let emptyPayload = {
        title: {value:'',isValid:false},
        year: {value:'',isValid:false},
        country: {value:'',isValid:false},
        director: {value:'',isValid:false},
        rate: {value:'',isValid:false},
        poster: {value:'',isValid:false},     
    }

    const [payloadObject, dispatch] = useReducer(formReducer, emptyPayload);

    const inputProcesser = useCallback((filmdata) => {
        dispatch({
            filmdata
        });
    }, []);
    
    return [inputProcesser, payloadObject]
}