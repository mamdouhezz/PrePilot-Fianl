import React from 'react';

const VersionHint: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`text-center text-sm text-gray-500 ${className}`}>
            <p>PrePilot v3 - Playground</p>
        </div>
    );
};

export default VersionHint;
