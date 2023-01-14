# Web Pixel UI Engine (WPUIE)

该库的目的是为了在网页中显示像素风格的UI。

我曾在网页中实现过一些像素风格的游戏，而UI部分的编写让我痛不欲生。
我无法放弃HTML+CSS带来的布局和样式上的便利，也无法说服自己在自带UI引擎的浏览器中用canvas实现一个UI引擎。
于是这个库就诞生了。

~~目前的想法是基于HTML标准的Web Component来实现整套UI显示部分。所以这个库目前来说也可以看作是一个组件库。~~  
目前想法转变，其实很多元素都不需要Web Component来完成，仅仅只是css足够对付绝大部分场景了。
因此项目可以由两个部分组成，一个纯css，另一个是js。引入css可以满足绝大部分需求，而js则可以有增强体验。

感谢 [NES.css](https://github.com/nostalgic-css/NES.css) 和 [Pixel borders](https://github.com/NigelOToole/pixel-borders) 给予我的灵感。他们在使用 `box-shadow` 和 `svg` 方面出神入化，使我受益匪浅。

我喜欢追求像素完美，换句话说，在高分辨率的屏幕中实现低分辨率的屏幕显示效果，一切的一切都是像素对齐的，而平滑的光影和动画在暗示着科技的进步，这就是一种艺术。
为了实现这种效果，文字的像素和图片的像素应该尽可能的保持一致才是最和谐的表现形式。
而将低分辨率的内容“邻近插值”到高分辨中似乎是一个麻烦的事情。
点阵字体的逐渐落寞既然人兴奋又让人伤感。

## Development

```console
npm i -g postcss-cli
npm i
```
