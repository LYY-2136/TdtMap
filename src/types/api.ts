/** /v2/administrative 接口入参 */
export interface AdminRegionParams {
  /** 【关键词】
   * 规则：只支持单个关键词语搜索
      关键词支持：行政区划名称、行政区划编码
      例如，keyword='北京' 或 keyword='156110000'
      说明：仅行政区划名称支持模糊查询
      注：keyword只有一个字符时，将只返回suggestion字段值，不返回district字段值
   */
  keyword: string;
  /** 【行政区级数】 默认值=0
   * 规则：设置显示下级行政区级数（行政区级别包括：国家、省/直辖市、市、区/县多级数据
      可选值：0、1、2、3
      0：不返回下级行政区
      1：返回下一级行政区
      2：返回下两级行政区
      3：返回下三级行政区
      需要在此特殊说明，目前部分城市和省直辖县因为没有区县的概念，故在省级下方直接显示区县。
      例如：河南-济源
   */
  childLevel?: string;
  /** 【是否需要轮廓数据】 默认值=false
      可选值：true、false
      true：返回轮廓数据
      false：不返回轮廓数据
   */
  extensions?: boolean;
}
