import {
    ComponentParams,
    ComponentRendering,
    SitecoreContextValue,
  } from '@sitecore-jss/sitecore-jss-nextjs';
  
  /**
   * Shared component props
   */
  export type ComponentProps = {
    rendering: ComponentRendering;
    params: ComponentParams;
  
    // withStyles HOC prop to rendering SXA CSS classes
    stylesSXA: string;
  };
  
  /**
   * Component props with context
   * You can access `sitecoreContext` by withSitecoreContext/useSitecoreContext
   * @example withSitecoreContext()(ContentBlock)
   * @example const { sitecoreContext } = useSitecoreContext()
   */
  export type ComponentWithContextProps = ComponentProps & {
    sitecoreContext: SitecoreContextValue;
  };
  