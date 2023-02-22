
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

每种按钮的触发方式：

1. `a.pui-btn`
2. `button.pui`
3. `input[type=button|submit|reset].pui`
4. `input[type=file].pui`

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
|`border`|显示在文件名回显部分的边框<br>目前仅在chrome中有效果|
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

### 属性

|属性名|缺省值|可选值|说明|
|---|---|---|---|
|`size`|`0`|`0`, `1`, `2`|边框的圆角<br>由于纯css实现的限制，`button[size=2]`和`input[size=1|2]`的边框在`margin`范围中。|

TODO: `button[size=2]`的边框不占用`margin`。

对于文件选择按钮：

|属性名|类型|说明|
|---|---|---|---|
|`fill`||按钮占据文件名回显的空间<br>在Firefox中和`size=2`一起使用显示有问题|
|`aria-label`|字符串|label的内容<br>仅在`fill`模式中运行<br>目前仅在chrome中有效果|

TODO: `fill`在Firefox中和`size=2`一起使用显示有问题
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
|`primary`|设置边框颜色为 primary 主题的 hover 色|
|`success`|设置边框颜色为 success 主题的 hover 色|
|`warning`|设置边框颜色为 warning 主题的 hover 色|
|`error`|设置边框颜色为 error 主题的 hover 色|
|`disabled`|设置边框颜色为 disabled 主题的 hover 色|

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

默认样式为实心圆`disc`。

### css变量

|变量名|缺省值|说明|
|---|---|---|
|`--mark-size`|`4px`|列表项标志的核心的大小（空心圆的内径）<br>总大小为核心大小*3|
|`--mark-color`|`#000`|列表项标志的颜色|

## Tables

触发方式：`table.pui, .pui-table`

### class

|class名|说明|
|---|---|
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
|`--bg-color`|`#fff`|背景的颜色<br>无法使用带有透明度的颜色|
|`--start-at`|`2ch - --bwidth`|气泡的脚的偏移位置<br>当`from-right`时，从气泡的右边缘开始计算；<br>当`from-top`时，从气泡的下边缘开始计算。|

TODO: 无法使用带有透明度的背景色

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
