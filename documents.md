
# 文档

## 全局

### 主题配色颜色

|变量名|缺省值|说明|
|---|---|---|
|`--primary`|`#209cee`|primary 主题 常态 颜色|
|`--primary-hover`|`#108de0`|primary 主题 hover 颜色|
|`--primary-shadow`|`#006bb3`|primary 主题 shadow 颜色|
|`--success`|`#92cc41`| success 主题 常态 颜色|
|`--success-hover`|`#76c442`| success 主题 hover 颜色|
|`--success-shadow`|`#4aa52e`| success 主题 shadow 颜色|
|`--warning`|`#f7d51d`| warning 主题 常态 颜色|
|`--warning-hover`|`#f2c409`| warning 主题 hover 颜色|
|`--warning-shadow`|`#e59400`| warning 主题 shadow 颜色|
|`--error`|`#e76e55`| error 主题 常态 颜色|
|`--error-hover`|`#ce372b`| error 主题 hover 颜色|
|`--error-shadow`|`#8c2022`| error 主题 shadow 颜色|
|`--disabled`|`#d3d3d3`| disabled 主题 常态 颜色|
|`--disabled-shadow`|`#adafbc`| disabled 主题 shadow 颜色|
|`--normal`|`#fff`| normal 主题 常态 颜色|
|`--normal-hover`|`#e7e7e7`| normal 主题 hover 颜色|
|`--normal-shadow`|`#adafbc`| normal 主题 shadow 颜色|

hover的颜色比常态的深，shadow比hover深。
disabled没有hover。
没设置主题时缺省为 normal 。

## Texts

触发方式：`.pui-text, span.pui`

### class

|class名|说明|
|---|---|
|`primary`|设置文本颜色为 primary 主题的常态色|
|`success`|设置文本颜色为 success 主题的常态色|
|`warning`|设置文本颜色为 warning 主题的常态色|
|`error`|设置文本颜色为 error 主题的常态色|
|`disabled`|设置文本颜色为 disabled 主题的常态色|

## Buttons

常见的按钮种类：

1. 链接按钮 `a`
2. `button`
3. input按钮 `input[type=button|submit|reset]`
4. 文件选择按钮 `input[type=file]`
5. 颜色选择按钮 `input[type=color]`

每种按钮的触发方式：

1. `a.pui-btn`
2. `button.pui`
3. `input[type=button|submit|reset].pui`
4. `input[type=file].pui`
5. `input[type=color].pui`

文件选择按钮 在 Firefox 中还有很多问题。

### class

|class名|说明|
|---|---|
|`primary`|使用 primary 配色方案|
|`success`|使用 success 配色方案|
|`warning`|使用 warning 配色方案|
|`error`|使用 error 配色方案|
|`disabled`|使用 disabled 配色方案<br>需要注意的是，class内有`disabled`但按钮本身并没有`disabled`性质时，用户还是可以点击的|

除`class=disabled`外，`[disabled], :disabled`也会激活disabled主题配色。

TODO: class内有`disabled`但按钮本身并没有`disabled`性质时，用户还是可以点击的。

对于文件选择按钮：

|class名|说明|
|---|---|
|`fill`|详见下方对于`fill`属性的描述|
|`border`|显示在文件名回显部分的边框<br>目前仅在chrome中有效果，Firefox中显示有问题。|
|`center-ellipsis`|在过长的文件名回显的中间进行省略<br>目前仅在chrome中有效果<br>和`.border[size=2]`不兼容|

TODO: `border`仅在chrome中有效果，兼容Firefox。

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--bcolor`|`#000`|边框的颜色<br>由于纯css实现的限制，`input[size=2]`不能设置为带透明度的颜色。|
|`--bwidth`|`4px`|边框的宽度|
|`--bg-color`|主题常态色<br>if hover: 主题hover色<br>if active: 主题shadow色|背景的颜色|
|`--inset-color`||内测阴影的颜色|
|`--inset-color-br`|主题shadow色<br>if active & ! disabled: `--bg-color`|右下角内测阴影的颜色<br>优先级高于`--inset-color`|
|`--inset-color-tl`|`--bg-color`<br>if active & ! disabled: 主题shadow色|左上角内测阴影的颜色<br>优先级高于`--inset-color`|
|`--inset-width`||内测阴影的宽度|
|`--inset-width-br`|`--bwidth`<br>hover: `1.5 * --bwidth`<br>if active & ! disabled: `0px`|右下角内测阴影的宽度<br>优先级高于`--inset-width`|
|`--inset-width-tl`|`0px`<br>if active & ! disabled: `1.5 * --bwidth`|左上角内测阴影的宽度<br>优先级高于`--inset-width`|

由于边框的实现大量基于`::before`和`::after`伪元素，而input按钮不支持这两个伪元素，因此边框在实现上是通过`box-shadow`来模拟的。
（`input[type=file]::file-selector-button`在chrome中本质上是一个input按钮，而Firefox中是button，为了平台统一性，将Firefox中的当作input按钮对待。）

于内侧阴影不同的绘制顺序导致不同的覆盖结果，故有下面两个变量来确保渲染结果正确，
这两个变量仅在`size=2`的input按钮和文件选择按钮的`::file-selector-button`中使用：

|变量名|缺省值|可选值|说明|
|---|---|---|---|
|`--tr-is-tl-cover-br`|`1`|`0`, `1`|对于内侧阴影的右上角，右侧阴影是否覆盖上侧阴影|
|`--bl-is-tl-cover-br`|`0`|`0`, `1`|对于内侧阴影的左下角，下侧阴影是否覆盖左侧阴影|

TODO: 尝试用 `background image` 来画出 input 按钮的所有效果，这样就不需要占用 margin 的空间，文件体积上应该会小于当前基于`box-shadow`的解决方案，而且逻辑也应该会简单一点。

### 属性

|属性名|缺省值|可选值|说明|
|---|---|---|---|
|`size`|`0`|`0`, `1`, `2`|边框的圆角<br>由于纯css实现的限制，`input[size=1|2]`的边框在`margin`范围中。|

对于文件选择按钮：

|属性名|类型|说明|
|---|---|---|
|`fill`||按钮占据文件名回显的空间|
|`aria-label`|字符串|label的内容<br>仅在`fill`模式中运行<br>目前仅在chrome中有效果，Firefox中显示有问题。|

TODO: `aria-label`目前仅在chrome中有效果，兼容Firefox

## Radios

触发方式：`.pui-radio, input[type=radio].pui`。

> 其紧跟着的`span`的鼠标样式会被设置为`pointer`。

### class

|class名|说明|
|---|---|
|`primary`|设置标志的颜色为 primary 主题的常态色|
|`success`|设置标志的颜色为 success 主题的常态色|
|`warning`|设置标志的颜色为 warning 主题的常态色|
|`error`|设置标志的颜色为 error 主题的常态色|
|`disabled`|设置标志的颜色为 disabled 主题的常态色|
|`at-after`|详见下方对于`at-after`属性的描述|
|`triangle`|详见下方对于`triangle`属性的描述|

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--mark`|`_`|标志的文本内容|
|`--mark-indeterminate`|`var(--mark, '=')`|不确定时，标志的文本内容（不确定指拥有相同 `name` 值的所有单选按钮都未被选中时）|
|`--mark-checked`|`>` if not at-after else `<`|选中后标志的文本内容|
|`--mark-after-checked`|`--mark-checked`|单选按钮位于文本之后时，选中后标志的文本内容|
|`--mark-zoom`|`1.2`|标志的缩放率（基于`1em`，若标志为三角形时基于`1px`）|
|`--mark-color`|`inherit`（和文本颜色一致），如果设置了主题则为主题的常态色|标志的颜色，默认为文本的颜色|
|`--mark-checked-color`|`--mark-color`|选中后标志的颜色|
|`--mark-triangle-zoom`|`var(--mark-zoom, 2)`|标志为三角形时的缩放率（基于`1px`）|

### 属性

|属性名|说明|
|---|---|
|`at-after`|单选按钮位于文本之后|
|`triangle`|设置标志为三角形|

## Checkboxes

触发方式：`.pui-checkbox, input[type=checkbox]`。

> 其紧跟着的`label`的鼠标样式会被设置为`pointer`。

### class

|class名|说明|
|---|---|
|`primary`|使用 primary 配色方案|
|`success`|使用 success 配色方案|
|`warning`|使用 warning 配色方案|
|`error`|使用 error 配色方案|
|`disabled`|使用 disabled 配色方案|
|`at-after`|详见下方对于`at-after`属性的描述|
|`animation`|详见下方对于`animation`属性的描述|
|`disc`|不确定时，标志为实心圆|
|`circle`|不确定时，标志为空心圆|
|`square`|不确定时，标志为实心方形|
|`rect`|不确定时，标志为空心方形|
|`pattern`|不确定时，标志为网格状图案|
|`anti`|不确定时，标志镜像（仅在默认图案和网格状图案时有效果）|

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--mark-zoom`|`2`|复选框的缩放率（基于`1px`）|
|`--mark-color`|`inherit`（和文本颜色一致），如果设置了主题则为主题的常态色|
|`--mark-check-color`|`--mark-color`|选中时，勾√的颜色|
|`--mark-indeterminate-color`|`--mark-check-color`|不确定时，勾√的颜色|

### 属性

|属性名|说明|
|---|---|
|`at-after`|复选框位于文本之后|
|`animation`|选中时播放动画|

## Inputs & Textarea

触发方式：`input[type=email|number|password|search|tel|text|url].pui, textarea.pui`。

### class

|class名|说明|
|---|---|
|`primary`|使用 primary 配色方案|
|`success`|使用 success 配色方案|
|`warning`|使用 warning 配色方案|
|`error`|使用 error 配色方案|
|`disabled`|使用 disabled 配色方案|
|`inline`|使输入框占用一整行|
|`resizer`|赋予缩放器样式<br>仅在`webkit`中的`textarea`元素生效|
|`resizer2`|赋予缩放器样式2<br>仅在`webkit`中的`textarea`元素生效|

除`class=disabled`外，`[disabled], :disabled`也会激活disabled主题配色。

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--bwidth`|`4px`|边框的宽度|
|`--bcolor`|`#000`|边框的颜色|
|`--bg-color`|`#fff`|背景的颜色|

### 属性

|属性名|缺省值|可选值|说明|
|---|---|---|---|
|`bsize`|`0`|`0`, `1`, `2`|边框的圆角|

## Selects

触发方式：`select.pui`。

### class

|class名|说明|
|---|---|
|`primary`|使用 primary 配色方案|
|`success`|使用 success 配色方案|
|`warning`|使用 warning 配色方案|
|`error`|使用 error 配色方案|
|`disabled`|使用 disabled 配色方案|
|`inline`|使`select`元素占用一整行|

除`class=disabled`外，`[disabled], :disabled`也会激活disabled主题配色。

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--bwidth`|`4px`|边框的宽度|
|`--bcolor`|`#000`|边框的颜色|
|`--bg-color`|`#fff`|背景的颜色|
|`--mark-width`|`3px`|标志的像素宽度|
|`--mark-color`|`--bcolor`|标志的颜色|

### 属性

|属性名|缺省值|可选值|说明|
|---|---|---|---|
|`bsize`|`0`|`0`, `1`, `2`|边框的圆角|

TODO: `[size=2]`在移动端显示和`[size=1]`一致，需要显示标志。

## Background

触发方式：`.pui-bg`

将背景封装在`::before`伪元素中。背景图片的缩放算法为最邻近。你可以通过设定`::before`来达到更细节的操作。

### class

|class名|说明|
|---|---|
|`no-repeat`|详见下方对于`no-repeat`属性的描述|

### css变量

|变量名|说明|
|---|---|
|`--brightness`|背景的亮度。`filter: brightness(var(--brightness));`|
|`--attach`|`background-attachment: var(--attach);`|
|`--blend-mode`|`background-blend-mode: var(--blend-mode);`|
|`--clip`|`background-clip: var(--clip);`|
|`--color`|`background-color: var(--color);`|
|`--img`|`background-image: var(--img);`<br>由于css变量限制，请使用`--img: url(/path/to/your/img)`来引用url<br>相对路径是相对于css文件来说的。如果需要相对于`html`文件，请在`html`中手动加入`<style>.pui-bg::before{background-image:var(--img);}</style>`|
|`--origin`|`background-origin: var(--origin);`|
|`--pos`|`background-position: var(--pos);`|
|`--size`|`background-size: var(--size);`|
|`--repeat`|`background-repeat: var(--repeat);`<br>优先级高于`.no-repeat, [no-repeat]`|

### 属性

|属性名|说明|
|---|---|
|`no-repeat`|背景是否重复|

## Image

设置图片缩放算法为最邻近。触发方式：`.pui-img, img.pui, input[type=image].pui`

## Colored Border

纯色边框。触发方式：`.pui-cb`

### class

|class名|说明|
|---|---|
|`primary`|设置边框颜色为 primary 主题的常态色|
|`success`|设置边框颜色为 success 主题的常态色|
|`warning`|设置边框颜色为 warning 主题的常态色|
|`error`|设置边框颜色为 error 主题的常态色|
|`disabled`|设置边框颜色为 disabled 主题的常态色|

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--bwidth`|`4px`|边框的宽度|
|`--bcolor`|`#000`|边框的颜色|
|`--bg-color`|`transparent`|背景的颜色<br>你也可以通过`background-color`设定背景色。如果你通过`background`设定背景色，请和`background-clip: padding-box;`一起使用。|

### 属性

|属性名|缺省值|可选值|说明|
|---|---|---|---|
|`size`|`0`|`0`, `1`, `2`|边框的圆角|

> `[size!=0]`通过`::after`伪元素实现。

## Containers

触发方式：`fieldset.pui, .pui-container`

目前仅支持在`fieldset`中使用。

### class

|class名|说明|
|---|---|
|`primary`|设置边框颜色为 primary 主题的常态色|
|`success`|设置边框颜色为 success 主题的常态色|
|`warning`|设置边框颜色为 warning 主题的常态色|
|`error`|设置边框颜色为 error 主题的常态色|
|`disabled`|设置边框颜色为 disabled 主题的常态色|
|`.centered`|详见下方对于`centered`属性的描述|

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--bwidth`|`4px`|边框的宽度<br>由于纯css实现的限制，在`[size!=0]`时，左右两侧边框在`margin`范围中。|
|`--bcolor`|`#000`|边框的颜色|
|`--bg-color`|`transparent`|背景的颜色|

### 属性

|属性名|缺省值|可选值|说明|
|---|---|---|---|
|`size`|`0`|`0`, `1`, `2`|边框的圆角|
|`centered`|||`legend`是否位于中间|

## Dialogs

触发方式：`dialog.pui, .pui-dialog`

对于古老的浏览器，你可能需要一个 dialog polyfill。

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--bwidth`|`4px`|边框的宽度|
|`--bcolor`|`#000`|边框的颜色|

### 属性

|属性名|缺省值|可选值|说明|
|---|---|---|---|
|`size`|`0`|`0`, `1`, `2`|边框的圆角|

## Lists

触发方式：`ul.pui, .pui-list`

### class

|class名|说明|
|---|---|
|`disc`|列表项标志为实心圆|
|`circle`|列表项标记为空心圆|
|`square`|列表项标记为实心方形|
|`rect`|列表项标记为空心方形|
|`disclosure-open`|列表项标记为向右指的三角形|
|`disclosure-closed`|列表项标记为向下指的三角形|
|`none`|无列表项标记|
|`nil`|列表项标记，同时无左侧缩进|

默认样式为实心圆`disc`。

你可以通过对列表中单个列表项的class进行设置来应用样式。例如：

```html
<ul class="pui circle">
  <li class="square">list item</li>
</ul>
```

将会显示`square`，而不是`circle`。

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--mark-size`|`4px`|列表项标志的核心的大小（空心圆的内径，两倍于像素大小）|
|`--mark-color`|`#000`|列表项标志的颜色|
|`--mark-offset`|`-1pc`|列表项标志的核心的偏移（从列表项左侧边缘开始）|
|`--padding-left`|`4ch`|列表左侧的缩进|

## Details

### class

|class名|说明|
|---|---|
|`sideline`|显示边线|
|`dashed`|边线类型为虚线|
|`dotted`|边线类型为点线|

如有边线，默认是实线。

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--mark-size`|`4px`|标志的核心的大小（两倍于图标的像素大小）|
|`--mark-color`|`#000`|标志的颜色|
|`--mark-offset`|`-1pc`|标志的核心的偏移（从`<summary>`左侧边缘开始）|
|`--padding-left`|`4ch`|details左侧的padding|

## Tables

触发方式：`table.pui, .pui-table`

### class

|class名|说明|
|---|---|
|`primary`|设置边框颜色为 primary 主题的常态色|
|`success`|设置边框颜色为 success 主题的常态色|
|`warning`|设置边框颜色为 warning 主题的常态色|
|`error`|设置边框颜色为 error 主题的常态色|
|`disabled`|设置边框颜色为 disabled 主题的常态色|
|`unbordered`|去除表格最外层边框|
|`hollow`|表格内的单元的边框的相交处镂空|
|`unbordered-inside`|去除表格内单元的边框|

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--bwidth`|`4px`|边框的宽度|
|`--bcolor`|`#000`|边框的颜色|
|`--bg-color`|`transparent`|背景的颜色<br>你也可以通过`background-color`设定背景色。如果你通过`background`设定背景色，请和`background-clip: padding-box;`一起使用。|

### 属性

|属性名|缺省值|可选值|说明|
|---|---|---|---|
|`size`|`0`|`0`, `1`, `2`|边框的圆角|

## Progress

触发方式：`progress.pui, .pui-progress`

当progress为不定(indeterminate)时，会带有动画。

### class

|class名|说明|
|---|---|
|`primary`|使用 primary 配色方案|
|`success`|使用 success 配色方案|
|`warning`|使用 warning 配色方案|
|`error`|使用 error 配色方案|
|`disabled`|使用 disabled 配色方案|
|`hollow`|镂空（边框和进度条栅块之间的间隙）|
|`pattern`|进度条栅块呈现网格状图案|
|`baseline`|进度条栅块和文本的基线对齐|

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--bwidth`|`4px`|边框的宽度|
|`--bcolor`|`#000`|边框的颜色|
|`--bg-color`|`transparent`|背景的颜色|
|`--value-color`|`#000`|进度条栅块的颜色|
|`--pattern-color`|`transparent`|网格状图案时，进度条栅块网格的颜色|

### 属性

|属性名|缺省值|可选值|说明|
|---|---|---|---|
|`size`|`0`|`0`, `1`, `2`|边框的圆角<br>由于纯css实现的限制，`[size=2].pattern:not(hollow)`的进度条栅块是不规则的|

## Balloons

聊天气泡

触发方式：`.pui-balloon`

### class

|class名|说明|
|---|---|
|`on-left`|气泡的脚位于气泡左侧|
|`on-right`|气泡的脚位于气泡右侧|
|`on-top`|气泡的脚位于气泡上方|
|`from-right`|气泡的脚指向右边，仅在脚位于下方或上方时使用|
|`from-top`|气泡的脚指向上边，仅在脚位于左侧或右侧时使用|

气泡的脚默认在下方，指向左侧。

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--bwidth`|`4px`|边框的宽度|
|`--bcolor`|`#000`|边框的颜色|
|`--bg-color`|`transparent`|背景的颜色|
|`--toe-bcolor`|`--bcolor`|气泡的脚的边框色|
|`--toe-bg-color`|`--bg-color`|气泡的脚的背景色|
|`--start-at`|`2ch - --bwidth`|气泡的脚的偏移位置<br>当`from-right`时，从气泡的右边缘开始计算；<br>当`from-top`时，从气泡的下边缘开始计算。|

### 属性

|属性名|缺省值|可选值|说明|
|---|---|---|---|
|`size`|`0`|`0`, `1`, `2`|边框的圆角|

TODO: 缺少size属性实现

## Pixel arts - octocat

触发方式：`.pui-octocat`

图片大小为 14w * 15h 像素

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--pixel-width`|`4px`|每个像素的大小|

## Image Border

图片边框。触发方式：`.pui-ib`

### class

|class名|说明|
|---|---|
|`fill`|边框是否填充中间区域|

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--bwidth`|`4`|边框的宽度，按图片像素计算|
|`--bw-up`|`--bwidth`|上边框的宽度|
|`--bw-right`|`--bwidth`|右边框的宽度|
|`--bw-bottom`|`--bwidth`|下边框的宽度|
|`--bw-left`|`--bwidth`|左边框的宽度|
|`--bimg`||`border-image-source: var(--bimg);`<br>由于css变量限制，请使用`--bimg: url(/path/to/your/img)`来引用url<br>相对路径是相对于css文件来说的。如果需要相对于`html`文件，请在`html`中手动加入`<style>.pui-ib{border-image-image:var(--bimg);}</style>`|

## Scroll Bar

滚动条。触发方式：`.pui-scroller`

### class

|class名|说明|
|---|---|
|`resizer`|显示resizer。仅`webkit`有样式。|
|`resizer2`|显示resizer。仅`webkit`有样式2。|
|`has-btn`|指示是否有上下按钮。当没有按钮时，Firefox中会显示窄类型的边框。|
|`[v\|h\|]double[-start\|-end\|]`|仅`webkit`有效，指示是否是双按钮。<br>可选项`[v\|h\|]`：`v`时为垂直；`h`为水平；空为水平和垂直。<br>可选项`[-start\|-end\|]`：`-start`表示按钮在滑块上面(垂直)/左边(水平)；`-end`表示按钮在滑块下面(垂直)/右边(水平)；空表示所有。|
|`[v\|h\|]single[-start\|-end]`|仅`webkit`有效，指示是否是单按钮。<br>可选项`[v\|h\|]`：`v`时为垂直；`h`为水平；空为水平和垂直。<br>可选项`[-start\|-end\|]`：`-start`表示按钮在滑块上面(垂直)/左边(水平)；`-end`表示按钮在滑块下面(垂直)/右边(水平)。|
|`[v\|h]none`|仅`webkit`有效，指示有无按钮。<br>可选项`[v\|h]`：`v`时为垂直；`h`为水平。|

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--scrollbar-width`| if `.has-btn`: `14px`<br>else: `8px`|仅`webkit`有效，滚动条的宽度|
|`--scrollbar-height`|`--scrollbar-width`|仅`webkit`有效，滚动条的高度|
|`--[hover-\|active-\|inactive-\|][start-\|end-\|]track`|`transparent`|滑轨背景色。可选项参考下方。|
|`--[hover-\|active-\|inactive-\|][start-\|end-\|]btn-bg`|`--track`|仅`webkit`有效，按钮背景色。<br>可选项`[start-\|end-\|]`：`start`上/左箭头；`end`下/右箭头；空时指全部。<br>其他可选项参考下方。|
|`--[hover-\|active-\|inactive-\|][start-\|end-\|]btn`|`rgb(136, 136, 136, .5)`<br>`hover`: `rgb(187, 187, 187, .5)`<br>`active`: `rgb(85, 85, 85, .5)`<br>`inactive`: `--btn`|仅`webkit`有效，按钮前景色。可选项参考下方。|
|`--[hover-\|active-\|inactive-\|]thumb`|`rgb(119, 119, 119, .65)`<br>`hover`: `rgb(187, 187, 187, .75)`<br>`active`: `rgb(187, 187, 187, .5)`|滑块颜色。可选项参考下方。|
|`--[active-\|inactive-]corner`|`--track`|仅`webkit`有效，resizer背景色。|
|`--resizer`|`rgb(119, 119, 119, .5)`|仅`webkit`有效，resizer的颜色|

Firefox 中按钮和滑块同色。状态可选项和位置可选项都只能在`webkit`中工作。Firefox 的状态颜色是自动生成的。

状态可选项解释：

|可选项|说明|
|---|---|
|`hover`|鼠标悬在目标上方时|
|`active`|目标处于激活状态|
|`inactive`|窗口(整个网页页面)处于非活动状态|

位置可选项解释：

|可选项|说明|
|---|---|
|`start`|按钮或背景位于滑块上面(垂直)/左边(水平)|
|`end`|按钮或背景位于滑块下面(垂直)/右边(水平)|

## Slider

滑动条。触发方式：`.pui-range, .pui-slider, input[type=range].pui`

### class

|class名|说明|
|---|---|
|`primary`|使用 primary 配色方案|
|`success`|使用 success 配色方案|
|`warning`|使用 warning 配色方案|
|`error`|使用 error 配色方案|
|`disabled`|使用 disabled 配色方案|
|`hollow`|镂空（边框与滑动条背景/滑块之间的间隙）|
|`short`|仅Firefox有效果。显示较短的滑动条背景。由于纯css的限制，chrome目前无法显示较短的前景，故放弃实现。|
|`thin`|显示无边框的滑动条|
|`square`|显示矩形的滑块|

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--bwidth`|`4px`|边框的宽度。可以为透明。|
|`--bcolor`|`#000`|边框的颜色|
|`--bg-color`|`#fff`|滑动条背景的颜色。可以为透明。|
|`--fg-color`|`rgba(128, 128, 128, .4)`|滑块左侧的滑动条的颜色。可以为透明。|
|`--thumb-size`|`1em`|滑块的大小|
|`--thumb-size-w`|`--thumb-size`，最小不小于 `3 * --bwidth`|滑块的宽度|
|`--thumb-size-h`|`--thumb-size`，最小不小于 `3 * --bwidth`|滑块的高度|
|`--thumb-color`|`#888` 或 主题色|滑块的颜色。可以为透明。|
|`--track-h`|`100%`|滑动条背景的高度。|
|`--width`|`10em`|滑动条的整体宽度。Firefox中借助了`padding`属性，使用时需要注意。|

### 属性

|属性名|缺省值|可选值|说明|
|---|---|---|---|
|`bsize`|`0`|`0`, `1`, `2`|边框的圆角|

## Icons

一些小图标。触发方式：`.pui-icon`。

### class

|class名|说明|
|---|---|
|`primary`|使用 primary 配色方案|
|`success`|使用 success 配色方案|
|`warning`|使用 warning 配色方案|
|`error`|使用 error 配色方案|
|`disabled`|使用 disabled 配色方案|
|`after`|通过`::after`伪元素显示图标|
|`before`|通过`::before`伪元素显示图标|
|`triangle`|三角形|
|`disc`|实心圆|
|`circle`|空心圆|
|`square`|实心方形|
|`rect`|空心方形|

除了`square`和`rect`之外，其他的需要同时拥有下面三个任意之一才能显示：

|class名|说明|
|---|---|
|`bg`|通过背景图片来显示图标，在`devicePixelRatio`不是整数时，或网页缩放率让css像素和实际像素不能完美对齐时，会有间隔|
|`sd`|通过`box-shadow`来显示，使用`margin`来撑开阴影区域|
|`clip`|通过`clip-path`来显示，效果是最好的，但对老浏览器的兼容性不算好，且比较吃性能|

当是`triangle`时，以下类控制显示方向：

|class名|说明|
|---|---|
|`right`|三角形指向右边。默认是向右指向的。|
|`left`|三角形指向左边|
|`up`|三角形指向上边|
|`down`|三角形指向下边|

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--pixel-size`|`0.125em`|图标的像素大小。|

注：颜色通过css本身的`color`属性来控制。
