# 同游地球相册 · 源码说明

这是离线可用的单文件网页。修改 index.template.html、style.css、app.js 后，在父目录运行 python work/build.py，会生成 outputs/同游地球相册.html。所有依赖和素材均已包含，无需在线下载。

Globe.GL 2.46.2 — https://github.com/vasturiano/globe.gl — MIT
Three.js 0.185.0 — https://github.com/mrdoob/three.js — MIT
Globe.GL 自身分发包也包含其依赖；原始包中的授权注释已保留。
夜景贴图：https://unpkg.com/three-globe@2.44.0/example/img/earth-night.jpg ，来自 three-globe 示例资产。
世界边界：https://cdn.jsdelivr.net/gh/vasturiano/globe.gl@master/example/datasets/ne_110m_admin_0_countries.geojson ，Natural Earth 数据。
中国省级边界：https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json ，DataV GeoAtlas。

数据获取日期：2026-09-28。地理数据是展示用简化数据，未声明拥有第三方素材版权。中国边界数据包含港澳台与南海诸岛；地图用于私人旅行纪念可视化。

本地照片使用 IndexedDB（浏览器内置数据库）保存；不会上传。HTML 文件自身不包含用户后续添加的照片。请使用页面内备份功能迁移资料。

星空采用 Solar System Scope 的星空与银河贴图，加上立体星点和程序生成的三维旋涡星系。木星、土星、火星、月球、海王星均为 Three.js 实体球面，具有表面纹理、光照、阴影和自转，土星包含立体环带。Planet textures from Solar System Scope / INOVE (CC BY 4.0): https://www.solarsystemscope.com/textures/ 。构图用于纪念相册，并非天体距离或比例模拟。来源记录见“星空素材说明.md”。

3D 画册参考 https://github.com/HaichaoLihc/create-photo-flipbook-ui 中的 3d-book-2，使用其选用的 Quick FlipBook 1.1.3 原始纸页变形引擎。Quick FlipBook: BSD 2-Clause；原参考项目: MIT；three.modifiers: BSD（按其上游发布元数据）。许可证与依赖说明已包含在 work/assets 目录。

可选 WebMCP 只读接口 list_travel_memories 在支持该能力的浏览器中注册，用于返回地点和照片数，不读取照片内容；当前 Edge 环境不支持该接口，因此未做真实环境接口验证。
