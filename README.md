# large-visual-screen
## 使用技术：
```
Vue3+echarts+three+element-ui
```
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 问题记录
```
vue3中使用proxy的方式监听响应式，this.chart会被在vue内部转换成响应式对象，从而在resize 的时候获取不到
```

