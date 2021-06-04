import React, { FC } from 'react';

export interface AssignmentProps {
    onChange: (assignment: AssignmentType) => void;
}

export interface AssignmentType {
    points: number;
    possiblePoints: number;
}

const Assignment: FC<AssignmentProps> = ({ onChange }) => {
    return <div></div>;
};

export default Assignment;
