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
        const dataSubmited = action.filmdata
        for (const entry in dataSubmited){
            if(entry === 'yearFilm'){
                state.yearFilm.value = dataSubmited[entry]
                state.yearFilm.isValid = dataSubmited[entry] > 1800 && dataSubmited[entry] <= new Date().getFullYear() ? true : false
            } else if ((entry === 'rating')) {
                state.rating.value = dataSubmited[entry]
            } else {
                if(state[`${entry}`] !== undefined){
                    state[`${entry}`].value = dataSubmited[entry]
                    state[`${entry}`].isValid = dataSubmited[entry] ? true : false
                }
          }
        }
        console.log(state)
        return state;
   
    }
  
    let emptyPayload = {
        title: {value:'',isValid:false},
        yearFilm: {value:'',isValid:false},
        country: {value:'',isValid:false},
        directorid: {value:'',isValid:false},
        rating: {value:'',isValid:true},
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