import * as React from "react";
const Start: React.FunctionComponent = () => {
  return (
    <div className={"start"}>
      <section>
        <h1>开始使用</h1>
        <p className="text">
          Ireact-UI 已经发布至 NPM，你可以使用 npm / yarn 来安装。 <br/>
        </p>
        <div className={"bg-code"}>
          <p>
            $ yarn add ireact-ui <br/>
            $ npm install ireact-ui
          </p>
        </div>
      </section>
    </div>
  )
}
export default Start;