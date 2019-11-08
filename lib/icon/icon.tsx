import React from 'react';
import './importicon';
import './icon.scss';
import classNames from '../helpers/classes';

interface IconProps extends React.SVGAttributes<SVGElement> {
    name: string;
    size?: 'mini' | 'small' | 'medium'
}

const Icon: React.FunctionComponent<IconProps> = ({
        className,
        name,
        size,
        ...restProps
    }) => {
    return (
        <svg className={classNames('ireact-icon', `ireact-${size}`, className)} {...restProps}>
            <use xlinkHref={`#${name}`}/>
        </svg>
    );
};
export default Icon;