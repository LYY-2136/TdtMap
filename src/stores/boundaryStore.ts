import { defineStore } from "pinia";

/** 行政区边界集合 */
export const useBoundaryStore = defineStore("boundaries", {
  state: (): Boundaries => ({
    /** 省 */
    provinceData: null,
    /** 市 */
    cityData: null,
    /** 县 */
    countyData: null,
  }),
  actions: {
    async getProvinceData() {
      if (!this.provinceData) {
        const res = await fetch("/tdt-geojson/中国_省.geojson");
        this.provinceData = await res.json();
      }
      return this.provinceData;
    },
    async getCityData() {
      if (!this.cityData) {
        const res = await fetch("/tdt-geojson/中国_市.geojson");
        this.cityData = await res.json();
      }
      return this.cityData;
    },
    async getCountyData() {
      if (!this.countyData) {
        const res = await fetch("/tdt-geojson/中国_县.geojson");
        this.countyData = await res.json();
      }
      return this.countyData;
    },
    persist: {
      debug: true,
      enabled: true,
      strategies: [
        {
          key: "vt-boundaries",
          storage: localStorage,
          path: ["provinceData", "cityData", "countyData"],
        },
      ],
    },
  },
});

/** 行政边界数据 */
interface Boundaries {
  /** 省 */
  provinceData: any;
  /** 市 */
  cityData: any;
  /** 县 */
  countyData: any;
}
