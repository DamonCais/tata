import * as types from './mutation-types'

export const selectMusic = function(music) {
    commit(types.SET_MUSIC, music);
}
export const setWord = function(word) {
    commit(types.SET_WORD, word);
}
export const showDict = function(flag) {
    commit(types.SHOW_DICT, flag);
}