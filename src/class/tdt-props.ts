/** 天地图-多边形组件 */
export class PolygonProp {
  /** 多边形边线颜色 */
  color: string = "#0000FF";
  /** 多边形边线的宽度，以像素为单位 */
  weight: number = 2;
  /** 多边形边线的透明度（范围 0-1 之间） */
  opacity: number = 0.2;
  /** 多边形填充颜色当参数为空时，折线覆盖物将没有填充效果  */
  fillColor: string = "#0000FF";
  /** 多边形填充的透明度（范围 0-1 之间） */
  fillOpacity: number = 0.2;
  /** 多边形边线的样式（solid 或 dashed） */
  lineStyle: string = "solid";
  /** 坐标数组 */
  path: number[][] = [];
  /** 是否可编辑 */
  edit: boolean = false;
  /** 是否可见 */
  visible: boolean = true;
  /** 自定义属性 */
  extData: any = null;

  constructor(options: Partial<PolygonProp>) {
    for (let key of Object.keys(options) as (keyof PolygonProp)[]) {
      if (options[key] !== undefined) {
        (this as any)[key] = options[key];
      }
    }
  }
}
