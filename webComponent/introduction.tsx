import * as React from "react";
const Introduction: React.FunctionComponent = () => {
  return (
    <div className={"introduction"}>
      <section>
        <h1>Ireact-UI</h1>
        <p className={"text"}>Ireact-UI是一套基于 <a href="http://wanglifa1995.com/LiFa-UI/" target={"_blank"} className={"link"}>LiFa UI</a> 的 PC 端 React 组件库，色彩、样式的设计参考了其他成熟组件库。</p>
      </section>
      <section>
        <h2>使用 TypeScript</h2>
        <p className={"text"}>
          <a href="https://www.tslang.cn/docs/home.html" target={"_blank"} className={"link"}>TypeScript</a> 提供了静态类型检查，让开发人员可以在代码运行之前识别某些类型问题。Ireact-UI 完全使用 TypeScript 编写，有效增强了代码的健壮性。
        </p>
      </section>
      <section>
        <h2>没有额外依赖</h2>
        <p className={"text"}>
          Ireact-UI 只依赖 React、ReactDOM 两个核心库以及 PropTypes 进行类型检查，没有其他外部依赖。
        </p>
      </section>
    </div>
  )
}
export default Introduction;