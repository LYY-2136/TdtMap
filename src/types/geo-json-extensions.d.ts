import "geojson";

declare global {
  namespace GeoJSON {
    interface GBAdministrativeProperties {
      name: string;
      gb: string; // 国标代码
    }
  }
}

export interface GBAdministrativeProperties {
  name: string;
  gb: string;
}
