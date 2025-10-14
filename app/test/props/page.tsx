'use client';
import React from 'react';
import ChildPage from '@/components/ChildPage';

const ParentContent = () => {
    const [value, setValue] = React.useState('');
    return (
        <div>
            <h1>Parent</h1>
            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <p>Value from parent sa props: {value}</p>
            <ChildPage value={value} />
        </div>
    );
};


export default ParentContent;
