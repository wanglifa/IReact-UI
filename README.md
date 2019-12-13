# IReact-UI
[![CircleCI](https://circleci.com/gh/wanglifa/IReact-UI.svg?style=svg)](https://circleci.com/gh/wanglifa/IReact-UI)

## 一套好用的 PC 端 React 组件库

> 本组件库仅供学习交流，请勿在生产环境中使用

## 安装

```
$ npm install ireact-ui
$ yarn add ireact-ui
```

## 使用

```javascript
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Button } from 'ireact-ui'

ReactDOM.render(
  <div>
    <Button>Default</Button>
  </div>
)
```

需要注意的是，样式文件需要单独引入。

## 特别提醒

使用 IReact-UI 时，需要使用 border-box 盒模型，否则会影响样式。代码示例：

```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

如果您觉得还不错，请 star