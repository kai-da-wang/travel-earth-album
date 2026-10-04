# 3D photobook sources

The upgraded photobook uses the original Quick FlipBook page deformation engine selected by the user's named reference project. Existing album data, user photographs, visual layouts and site integration are maintained separately.

## User's reference project

- Project: https://github.com/HaichaoLihc/create-photo-flipbook-ui
- Current 3D Book 2 template: https://github.com/HaichaoLihc/create-photo-flipbook-ui/tree/main/ui-collections/3d-book-2
- Template renderer: https://github.com/HaichaoLihc/create-photo-flipbook-ui/blob/main/ui-collections/3d-book-2/src/main.js
- Original code: MIT, Copyright (c) 2026 Haichao Li. Full license: create-photo-flipbook-ui-LICENSE.
- The project's default installable skill uses a 2D reader; 3D Book 2 is a separately reusable reader template.
- The linked Douyin video could not be viewed in this environment. It is not represented as a directly viewed visual source.

## Included page engine

- Quick FlipBook 1.1.3: https://github.com/bandinopla/quick_flipbook
- npm source: https://cdn.jsdelivr.net/npm/quick_flipbook@1.1.3/dist/flipbook.mjs
- Exact source for the curved sheet: https://github.com/bandinopla/quick_flipbook/blob/main/src/FlipPage.ts
- License: BSD 2-Clause, Copyright (c) 2024 bandinopla. Full license: quick-flipbook-LICENSE.
- Original Bend, Twist and PageCurve deformation and two-sided sheet geometry are preserved. Imports are wrapped to use the existing offline Three.js instance; the engine exports QuickFlipbook.FlipBook globally.

## Included geometry modifiers

- three.modifiers 2.5.7: https://github.com/drawcall/threejs-mesh-modifiers
- Published source: https://cdn.jsdelivr.net/npm/three.modifiers@2.5.7/dist/modifiers.min.js
- Author: drawcall. The upstream package and README identify BSD. The repository and published bundle do not contain a fuller license text; the original version header is retained. See three-modifiers-NOTICE.md.

## Included Three.js helper

- BufferGeometryUtils, r185: https://github.com/mrdoob/three.js/blob/r185/examples/jsm/utils/BufferGeometryUtils.js
- License: MIT, Copyright Three.js Authors. Full license: three-LICENSE.

No sample photographs, demo artwork, videos, or 3D Book 1 adapted components from the reference repositories are included. User-supplied photographs remain stored by the existing local album application.
