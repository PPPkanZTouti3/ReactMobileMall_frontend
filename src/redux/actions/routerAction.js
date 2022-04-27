import {CHANGEPATH} from '../action-types'
export const changePath = (path) => {
    return {path,type:CHANGEPATH}
}