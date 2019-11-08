import React from 'react'
import Icon from './icon'
const IconExample: React.FunctionComponent = () => {
    return (
        <div>
            <Icon name="alipay" size="mini"></Icon>
            <Icon name="qq" size="small"></Icon>
            <Icon name="wechat" size="medium"></Icon>
            <Icon name="loading"></Icon>
        </div>
    )
}
export default IconExample