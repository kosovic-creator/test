import React from 'react';

interface ChildPageProps {
    value: string;
}

const ChildPage: React.FC<ChildPageProps> = ({ value }) => {
    return (
        <div>
            <h2>Child</h2>
            <p>Value from parent: {value}</p>
        </div>
    );
}

export default ChildPage;