import React from "react";

type FeatureOneProps = {
  message: string;
};

const FeatureOne: React.FC<FeatureOneProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default FeatureOne;
