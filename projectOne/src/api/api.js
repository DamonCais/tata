import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

// 单词搜索 推荐
let Suggest = {
    c: 'word',
    m: 'getsuggest',
    nums: 10,
    ck: '709a0db45332167b0e2ce1868b84773e',
    // timestamp: Math.round(new Date().getTime()),
    client: 6,
    uid: 0,
    is_need_mean: 1
        // _: Math.round(new Date().getTime())
}
export function getSuggest(word) {
    Suggest['word'] = word;
    Suggest['_'] = Math.round(new Date().getTime());
    Suggest['timestamp'] = Math.round(new Date().getTime());
    let url = "http://dict-mobile.iciba.com/interface/index.php?";
    let query = '';
    for (let o in Suggest) {
        query += `&${o}=${Suggest[o]}`
    }
    url += query.substring(1);
    return new Promise((resolve, reject) => {
        Vue.http.jsonp(url).then(function(p) {
            resolve(p.body);
        })
    })
}

// 获得单词解析
let WordMean = {
    a: 'getWordMean',
    c: 'search',
    list: '1,2,3,4,5,8,9,10,12,13,14,15,18,21,22,24,3003,3004,3005'
}
export function getWordMean(word) {
    WordMean['word'] = word;
    WordMean['_'] = Math.round(new Date().getTime());
    let url = "http://www.iciba.com/index.php?";
    let query = '';
    for (let o in WordMean) {
        query += `&${o}=${WordMean[o]}`
    }
    url += query.substring(1);
    return new Promise((resolve, reject) => {
        Vue.http.jsonp(url).then(function(p) {
            resolve(p.body);
        })
    })
}

// 每日一句
// http://sentence.iciba.com/index.php?
// c:dailysentence
// m:getRecentSentence
// _:1519625478145
// callback:jsonp1
let dailysentence = {
    c: 'dailysentence',
    m: 'getRecentSentence',
    // _:1519625478145,
}
export function dailySentence() {
    dailysentence['_'] = Math.round(new Date().getTime());
    let url = "http://sentence.iciba.com/index.php?";
    let query = '';
    for (let o in dailysentence) {
        query += `&${o}=${dailysentence[o]}`
    }
    url += query.substring(1);
    return new Promise((resolve, reject) => {
        Vue.http.jsonp(url).then(function(p) {
            resolve(p.body);
        })
    })
}
// 推荐列表
// http://dict-mobile.iciba.com/interface/index.php
// client:6
// type:1
// timestamp:1519625478129
// c:bilingual
// m:getrecommendlist
// field:1,2,3,4,12,16
// from:1
// kind:1
// page:1
// size:10
// uid:0
// _:1519625478151
// callback:jsonp2

let recommendlist = {
    client: 6,
    type: 1,
    c: 'bilingual',
    m: 'getrecommendlist',
    field: '1,2,3,4,12,16',
    from: 1,
    kind: 1,
    page: 1,
    size: 10,
    uid: 0,
}

export function getRecommendList(page) {
    recommendlist['_'] = Math.round(new Date().getTime());
    recommendlist['timestamp'] = Math.round(new Date().getTime());
    recommendlist['page'] = page || 1;
    let url = "http://dict-mobile.iciba.com/interface/index.php?";
    let query = '';
    for (let o in recommendlist) {
        query += `&${o}=${recommendlist[o]}`
    }
    url += query.substring(1);
    return new Promise((resolve, reject) => {
        Vue.http.jsonp(url).then(function(p) {
            resolve(p.body);
        })
    })
}

// 2||1 =>2
// 2| 1 =>3

//获取文章
// http://www.iciba.com/index.php?
// c:index
// a:getArticleContent
// id:1577280
// _:1519650859320
// callback:jsonp5
let article = {
    c: 'index',
    a: 'getArticleContent',
    id: 1577280,
}
export function getArticleContent(id) {
    article['_'] = Math.round(new Date().getTime());
    article['id'] = id;
    let href = "http://www.iciba.com/index.php?";
    let url = getFullUrl(href, article);
    return new Promise((resolve, reject) => {
        Vue.http.jsonp(url).then(function(p) {
            resolve(p.body);
        })
    })
}

function getFullUrl(href, params) {
    let query = '';
    for (let p in params) {
        query += `&${p}=${params[p]}`
    }
    href += query.substring(1);
    return href;
}

//试听列表
// http://m.iciba.com/index.php?
// c:listen
// m:getVideo
// uid:0
// onlineTime:0
// endId:0
// page:0
// catName:
// _:1519742568121
// callback:jsonp1
let video = {
    c: 'listen',
    m: 'getVideo',
    uid: 0,
    onlineTime: 0,
    endId: 0,
    catName: '',
}
export function getVideo(page, catName, onlineTime, endId) {
    video['_'] = Math.round(new Date().getTime());
    video['page'] = page || 0;
    video['catName'] = catName || '';
    video['onlineTime'] = onlineTime || 0;
    video['endId'] = endId || 0;
    let href = "http://m.iciba.com/index.php?";
    let url = getFullUrl(href, video);
    return new Promise((resolve, reject) => {
        Vue.http.jsonp(url).then(function(p) {
            resolve(p.body);
        })
    })
}

// http://m.iciba.com/index.php?
// c:listen
// m:getVideoDetail
// id:8283
// catid:28
// _:1519742784379
// callback:jsonp2

let videoDetail = {
    c: 'listen',
    m: 'getVideoDetail',
}
export function getVideoDetail(id, catid) {
    videoDetail['id'] = id || 8283;
    videoDetail['catid'] = catid || 28;
    videoDetail['_'] = Math.round(new Date().getTime());
    let href = "http://m.iciba.com/index.php?";
    let url = getFullUrl(href, videoDetail);
    return new Promise((resolve, reject) => {
        Vue.http.jsonp(url).then(function(p) {
            resolve(p.body);
        })
    })
}


// 每日一句
// http://sentence.iciba.com/index.php?
// m:getdetail
// c:dailysentence
// sid:2891
// _:1519800232305
// callback:jsonp1

let sentence = {
    m: 'getdetail',
    c: 'dailysentence',
}
export function getDailySentence(sid) {
    sentence['sid'] = sid || 2891;
    sentence['_'] = Math.round(new Date().getTime());
    let href = "http://sentence.iciba.com/index.php?";
    let url = getFullUrl(href, sentence);
    return new Promise((resolve, reject) => {
        Vue.http.jsonp(url).then(function(p) {
            resolve(p.body);
        })
    })
}