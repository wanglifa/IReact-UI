import * as React from "react";
const Color: React.FunctionComponent = () => {
  return (
    <div className={"color"}>
      <section>
        <h1>Color 色彩搭配</h1>
        <p className="text">
          推荐使用以下颜色作为设计和开发规范，以保证页面和组件之间的视觉一致。
        </p>
      </section>
      <section>
        <h2>主色</h2>
        <p className="text">Ireact-UI 使用友好的蓝色作为主色。</p>
        <div className="color-example">
          <div className="color-cube" style={{backgroundColor: '#34c3ff'}}>
            <span className="title">Light</span>
            <span className="detail">#34c3ff</span>
          </div>
          <div className="color-cube" style={{backgroundColor: 'rgb(52, 165, 255)'}}>
            <span className="title">Primary</span>
            <span className="detail">#51a5f8</span>
          </div>
          <div className="color-cube" style={{backgroundColor: 'rgb(6, 134, 187)'}}>
            <span className="title">Dark</span>
            <span className="detail">#3586b7</span>
          </div>
        </div>
      </section>
      <section>
        <h2>功能色</h2>
        <p className="text">功能色常用于信息提示，比如成功、警告和失败。</p>
        <div className="color-example">
          <div className="color-cube" style={{backgroundColor: '#4caf50'}}>
            <span className="title">Success</span>
            <span className="detail">#4caf50</span>
          </div>
          <div className="color-cube" style={{backgroundColor: '#ff9800'}}>
            <span className="title">Warning</span>
            <span className="detail">#ff9800</span>
          </div>
          <div className="color-cube" style={{backgroundColor: '#f44336'}}>
            <span className="title">Error</span>
            <span className="detail">#f44336</span>
          </div>
        </div>
      </section>
      <section>
        <h2>中性色</h2>
        <p className="text">中性色常用于文本、背景、边框、阴影等。</p>
        <div className="color-example">
          <div className="color-cube" style={{backgroundColor: 'rgba(0, 0, 0, .85)'}}>
            <span className="title">Title</span>
            <span className="detail">#262626</span>
          </div>
          <div className="color-cube" style={{backgroundColor: 'rgba(0, 0, 0, .65)'}}>
            <span className="title">Content</span>
            <span className="detail">#595959</span>
          </div>
          <div className="color-cube" style={{backgroundColor: 'rgba(0, 0, 0, .45)'}}>
            <span className="title">Sub</span>
            <span className="detail">#8c8c8c</span>
          </div>
          <div className="color-cube" style={{backgroundColor: '#fafafa', marginTop: '20px', color: 'rgba(0, 0, 0, 0.45)'}}>
            <span className="title">Disabled</span>
            <span className="detail">#fafafa</span>
          </div>
          <div className="color-cube" style={{backgroundColor: '#f5f5f5', marginTop: '20px', color: 'rgba(0, 0, 0, 0.45)'}}>
            <span className="title">Background</span>
            <span className="detail">#f5f5f5</span>
          </div>
          <div className="color-cube" style={{backgroundColor: '#ddd', marginTop: '20px', color: 'rgba(0, 0, 0, 0.45)'}}>
            <span className="title">Border</span>
            <span className="detail">#dddddd</span>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Color;