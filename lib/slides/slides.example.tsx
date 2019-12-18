import * as React from "react";
import Slides from "./slides";
const SlidesExample: React.FunctionComponent = () => {
  return (
    <Slides width={400}>
      <div className="box">1</div>
      <div className="box" style={{background: "red"}}>2</div>
      <div className="box">3</div>
      <div className="box" style={{background: "blue"}}>4</div>
    </Slides>
  )
}
export default SlidesExample;