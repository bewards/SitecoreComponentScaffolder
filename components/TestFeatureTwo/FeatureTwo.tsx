import React from "react";

type FeatureTwoProps = {
  message: string;
};

const FeatureTwo: React.FC<FeatureTwoProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default FeatureTwo;
