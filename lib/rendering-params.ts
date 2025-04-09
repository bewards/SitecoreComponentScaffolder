import { CustomRenderingParameter } from "models/fields";
import { logError } from "./error-logger";

export const getRenderingParam = (param: CustomRenderingParameter): string => {
  let renderingParam = "";

  if (!param) return renderingParam;

  if (typeof param === "string") {
    if (!param.startsWith("{")) {
      return param;
    }
    try {
      const paramObj = JSON.parse(param);
      if (paramObj.Value) {
        renderingParam = paramObj.Value.value;
      } else if (paramObj.Class) {
        renderingParam = paramObj.Class.value;
      }
    } catch (e) {
      logError({ e, pre: "getRenderingParam error:" });
    } finally {
      // if we already have a string, return it
      return param;
    }
  } else if ("key" in param) {
    renderingParam = param.value.value;
  } else if ("Class" in param) {
    // support for RenderingParamGrid (SXA Grid Params when LayoutService.DetailedRenderingParams = true)
    renderingParam = param.Class.value;
  }

  return renderingParam;
};
