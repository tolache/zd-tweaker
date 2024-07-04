import React from 'react';

interface FeatureToggleProps {
    id: string;
    checked: boolean;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FeatureToggle: React.FC<FeatureToggleProps> = ({id, checked, label, onChange}) => {
    return (
        <div className={"feature-toggle"}>
            <input type={"checkbox"} id={id}
                   checked={checked} onChange={onChange}/>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default FeatureToggle;