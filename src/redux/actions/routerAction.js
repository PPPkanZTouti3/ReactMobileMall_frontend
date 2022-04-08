import {CHANGEPATH} from '@types/routerType'
export const changePath = (path) => {
    return {path,type:CHANGEPATH}
}