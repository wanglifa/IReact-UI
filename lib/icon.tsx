import React from 'react';
import './importicon'
import './icon.scss'
interface IconProps {
    name: string;
    onClick: React.MouseEventHandler
}

const Icon: React.FunctionComponent<IconProps> = (props) => {
    return (
        <svg className="ireact-icon" onClick={props.onClick}>
            <use xlinkHref={`#${props.name}`}/>
        </svg>
    )
}
export default Icon;