import { toRaw } from "vue";
import { PolygonProp } from "@/class/tdt-props";

/** GeoJSON转为天地图组件可用数据
 * @param geoJsonData GeoJSON数据
 * @param options 自定义的多边形属性
 */
function parseGeoJSONToTdt<
  T extends GeoJSON.GeometryObject = GeoJSON.GeometryObject,
  P = GeoJSON.GBAdministrativeProperties
>(
  geoJSON: GeoJSON.FeatureCollection<T, P> | GeoJSON.Feature<T, P>,
  options?: Partial<PolygonProp>
) {
  const componentProps: any = {};

  const features =
    geoJSON.type === "FeatureCollection" ? geoJSON.features : [geoJSON];

  for (const feature of features) {
    const { geometry, properties } = feature;

    if (!geometry) continue;

    switch (geometry.type) {
      case "Point": // 点
        console.warn("[GeoJSON转化] => 点类型暂不支持转换");
        break;

      case "MultiPoint": // 多点
        console.warn("[GeoJSON转化] => 多点类型暂不支持转换");
        break;

      case "LineString": // 线
        components.push(
          convertLineStringToTdt(geometry.coordinates, properties)
        );
        break;

      case "MultiLineString": // 多线
        geometry.coordinates.forEach((coords) => {
          const lineGeometry: GeoJSON.LineString = {
            type: "LineString",
            coordinates: coords,
          };
          components.push(convertLineStringToTdt(lineGeometry, properties));
        });
        break;

      case "Polygon": // 多边形
        components.push(convertPolygonToTdt(geometry, properties));
        break;

      case "MultiPolygon": // 多多边形
        geometry.coordinates.forEach((polygonCoords) => {
          const polygonGeometry: Polygon = {
            type: "Polygon",
            coordinates: polygonCoords,
          };
          components.push(convertPolygonToTdt(polygonGeometry, properties));
        });
        break;
    }
  }

  return components;
}

/**  */
export const convertLineStringToTdt = () => {};

/** GeoJSON转为可用的多边形组件可用数据
 * @param geoJsonData GeoJSON数据
 * @param options 自定义的多边形属性
 */
export const GeoJsonToPolygonProps = (
  geoJsonData: any,
  options?: Partial<PolygonProp>
): PolygonProp[] => {
  const polygons: PolygonProp[] = [];
  const features = toRaw(geoJsonData).features || [];
  for (let item of features) {
    // 边界点信息集合
    const coordinates = item.geometry.coordinates;
    // 当前行政区信息
    const properties: { gb: string; name: string } = item.properties;
    for (let coordinate of coordinates) {
      for (let path of coordinate) {
        const polygon = new PolygonProp({
          ...options,
          path,
          extData: properties,
        });
        polygons.push(polygon);
      }
    }
  }
  return polygons;
};

/** 边界组件 */
export interface BoundaryComponent {}
