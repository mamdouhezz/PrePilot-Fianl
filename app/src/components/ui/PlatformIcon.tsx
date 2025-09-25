import React from 'react';
import { PLATFORM_INFO } from '../../constants.ts';
import { FiGlobe } from 'react-icons/fi';
import { SocialPlatformId } from '../../types';

const PlatformIcon = ({ id, className = 'w-6 h-6' }: { id: string, className?: string }) => {
    const IconComponent = PLATFORM_INFO[id as SocialPlatformId]?.icon || FiGlobe;
    return React.createElement(IconComponent, { className, 'aria-label': `${id} icon` });
};

export default PlatformIcon;