import React from 'react';
import './importicon';
import './icon.scss';
import classNames from './helpers/classes';

interface IconProps extends React.SVGAttributes<SVGElement> {
    name: string;
}

const Icon: React.FunctionComponent<IconProps> = ({
        className,
        name,
        ...restProps
    }) => {
    return (
        <svg className={classNames('ireact-icon', 'qq', className)} {...restProps}>
            <use xlinkHref={`#${name}`}/>
        </svg>
    );
};
export default Icon;