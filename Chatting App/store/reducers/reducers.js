const INITIAL_STATES = {
    name: '',
    email: '',
    uid: '',
    loader: false,
    allDonor: [],
    allreqs: [],
    search: [],
}

export default function (state = INITIAL_STATES, action) {
    switch (action.type) {

        case 'START_LOADER':
            return ({
                ...state,
                loader: true,
            })

        case 'STOP_LOADER':
            return ({
                ...state,
                loader: false,
            })

        case 'SAVE_USER':
            return ({
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                uid: action.payload.uid,
            })

        case 'GET_DONORS':
            return ({
                ...state,
                allDonor: INITIAL_STATES.allDonor.push(action.payload),
            })


        case 'GET_REQS':
            return ({
                ...state,
                allreqs: INITIAL_STATES.allreqs.push(action.payload),
            })


        case 'GET_SEARCHED':
            return ({
                ...state,
                search: INITIAL_STATES.search.push(action.payload),
            })

        default:
            return state;
    }
}