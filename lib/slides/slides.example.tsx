import * as React from "react";
import Slides from "./slides";
const SlidesExample: React.FunctionComponent = () => {
  return (
    <Slides>
      <div className="box">1</div>
      <div className="box">2</div>
      <div className="box">3</div>
      <div className="box">4</div>
    </Slides>
  )
}
export default SlidesExample;