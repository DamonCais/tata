export function debounce(func, delay) {
    let timer

    return function(...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
//adj形容词 adv副词 conn done过去分词 er比较级 est最高级
// ing现在分词 noun名词 past过去式 pl复数 prep短语 third第三人称单数 verb动词
export function getWordType(type) {
    let wordType = '';
    switch (type.substring(5)) {
        case 'adj':
            wordType = "形容词";
            break;
        case 'adv':
            wordType = "副词";
            break;
        case 'done':
            wordType = "过去分词";
            break;
        case 'er':
            wordType = "比较级";
            break;
        case 'est':
            wordType = "最高级";
            break;
        case 'ing':
            wordType = "现在分词";
            break;
        case 'noun':
            wordType = "名词";
            break;
        case 'past':
            wordType = "过去式";
            break;
        case 'pl':
            wordType = "复数";
            break;
        case 'prep':
            wordType = "短语";
            break;
        case 'third':
            wordType = "第三人称单数";
            break;
        case 'verb':
            wordType = "动词";
            break;
    }
    return wordType;

}

//时间戳与日期格式转换
export function timestampToTime(timestamp) {
    let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    // let s = date.getSeconds();
    let m = date.getMinutes();
    h = ('0' + h).slice(-3);
    m = ('0' + m).slice(-2);
    return Y + M + D + h + m;
}