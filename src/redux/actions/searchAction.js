import {CHANGEVAL} from '../action-types'

export const changeVal = (val) => {
    return {type:CHANGEVAL,val}
}