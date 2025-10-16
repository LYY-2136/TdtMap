import request from "@/utils/taxios";
import { type AdminRegionParams } from "@/types/api";

// 搞半天，原来接口的权限是配置网站的“第三方服务”勾选的，全勾选就可以了，我都没看到v2= =见了鬼了

/**
 * 行政区划服务
 */
export function getAdministrative(params: AdminRegionParams) {
  return request({
    url: "/v2/administrative",
    method: "get",
    params,
  });
}
