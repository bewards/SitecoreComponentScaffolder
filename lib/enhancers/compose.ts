import React from "react";

export type EnhancerFunction<P> = (component: React.ComponentType<P>) => (props: P) => JSX.Element;

export const compose =
  <P>(...enhancers: EnhancerFunction<P>[]) =>
  (component: React.ComponentType<P>) =>
    enhancers.reduceRight((res, fn) => fn(res), component);

export default compose;
