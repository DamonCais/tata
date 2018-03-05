import * as types from './mutation-types'
const mutations = {
    [types.SET_MUSIC](state, music) {
        state.music = music
    },
    [types.SET_WORD](state, word) {
        state.word = word
    },
    [types.SHOW_DICT](state, flag) {
        state.showDict = flag
    },
}

export default mutations