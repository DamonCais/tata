# vue重写爱词霸

> [预览地址](http://120.79.205.3:8080/)
## 使用步骤

``` bash
# 安装依赖
npm install

# 运行开发环境
npm run dev

# 构建生产环境
npm run build

```

## 技术栈
 + vue2：基础框架
 + vue-router：路由跳转
 + vuex：全局数据管理
 + es6：采用部分es6特性，大大简化了写法
 + webpack：vue-cli基于webpack
 + vue-resource：vue的一个异步请求库
 + scss：写起css来十分方便，需要安装sass-loader
 + flex：弹性布局，在移动端兼容性较好，写各种布局非常方便
 + better-scroll:移动端滚动效果的实现，（大部分组件基于此库实现）
 + vue-lazyloader:vue 图片懒加载的库


## 项目结构
1. api: api.js存放异步请求的方法，dom.js存放与dom节点相关操作的方法，util.js其他方法。
2. base:基础组件
3. components:业务组件
4. public:主页组件
5. css：css样式，图标样式等
6. store: Vuex全局数据管理

