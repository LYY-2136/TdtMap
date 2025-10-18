<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { getAdministrative } from "@/api/tdtAPI";
import { parse } from "terraformer-wkt-parser";
import { type DirectGeometryObject } from "geojson";
import { PolygonProp } from "@/class/tdt-props";
import { useBoundaryStore } from "@/stores/boundaryStore";

import { GeoJsonToPolygonProps } from "@/utils/boundaryUtils";

const boundaryStore = useBoundaryStore();

/** 当前显示地图位置信息 */
const mapState = reactive({
  center: [113.280637, 23.125178],
  zoom: 12,
});

/** 当前绘制的多边形信息 */
const polygonState = ref<PolygonProp[]>([]);

function searchComplete(result: T.LocalSearchResult) {
  console.log("#1", result);
  // 切换地址
  // 读行政区省信息
  const area = result.getArea();
  if (area) {
    // let bound = (area as any).bound;
    // let pointArr = bound.split(",");
    // let new_bounds = []
    // for (let i = 0; i < pointArr.length; i++) {
    //   if (pointArr[i] && pointArr[i + 1]) {
    //     new_bounds.push([Number(pointArr[i]), Number(pointArr[i + 1])]);
    //     i++;
    //   }
    // }
    // mapState.bounds = new_bounds;
    // console.log('最后:',mapState.bounds )
  }
  // mapState.center =
}
function poiClick(poi: T.LocalSearchPoi) {
  console.log("#2", poi);
}
/** 点击搜索提示项 */
async function suggestClick(suggest: T.LocalSearchSuggest) {
  console.log("#3", suggest);
  drawBoundary(suggest.name);
}

/** 绘制区域边界
 * @param name 区域名称
 */
async function drawBoundary(name: string) {
  const res: any = await getAdministrative({
    keyword: name,
    childLevel: "3",
    extensions: true,
  });
  // 清空当前所有多边形
  polygonState.value.length = 0;
  let { district = [] } = res.data;
  for (let item of district) {
    // 接口返回的boundary其实是GeoJSON的MultiPolygon类型，所以直接针对此类型处理
    const multiPolygon = parse(item.boundary || "");
    console.log("边界数据:", multiPolygon);
    if (multiPolygon.type != "GeometryCollection") {
      const coordinates = (multiPolygon as DirectGeometryObject)
        .coordinates as number[][][][];
      console.log("数据", polygonState.value);
      for (let ploygonArr of coordinates) {
        for (let path of ploygonArr) {
          polygonState.value.push(
            new PolygonProp({
              color: "black",
              opacity: 1,
              edit: false,
              visible: true,
              path,
            })
          );
        }
      }
    }
  }
}

onMounted(async () => {
  const data = await boundaryStore.getProvinceData();
  polygonState.value.length = 0;
  console.log(
    GeoJsonToPolygonProps(data, {
      color: "red",
      fillColor: "yellow",
      opacity: 0.2,
      edit: false,
      visible: true,
    }).map((item) => item.path)
  );
});
</script>

<template>
  <div class="mapDiv">
    <tdt-map :center="mapState.center" :zoom="mapState.zoom">
      <tdt-control>
        <tdt-search
          @search-complete="searchComplete"
          @poi-click="poiClick"
          @suggest-click="suggestClick"
        ></tdt-search>
      </tdt-control>

      <tdt-polygon
        v-for="(item, index) in polygonState"
        :key="index"
        :path="item.path"
        :color="item.color"
        :opacity="item.opacity"
        :edit="item.edit"
        :visible="item.visible"
      ></tdt-polygon>
    </tdt-map>
  </div>
</template>

<style lang="scss" scoped>
.mapDiv {
  width: 100%;
  height: 100%;
}
</style>
