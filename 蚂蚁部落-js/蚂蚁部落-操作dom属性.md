# 操作dom属性
## dataset
> HTML5之前没有自定义属性的标注规范，基本上可以是随意定义。现在又规范之后可以用这个了

> demo>detaset

## childNodes
> 返回的是子节点的列表（属性节点不属于子）
> 节点

## offsetwidth 
> 返回的是数值 不带单位   ==width+padding+border


## scrollTop
> 内容向上滚动的尺寸，可读写属性。
特别说明：设置或者返回的值是纯数字，不能带有单位，默认是像素。

## scrollHeight

> "内容高度"等于元素在不出现垂直滚动条情况下，恰好容纳其内部所有内容所需要的高度。


## offsetWidth
> 返回的是数值 没有单位
> 元素的宽度（包括变宽），但是当元素display:none  的时候一直为0
，需要getconmputed（）来获取
> demo>offsetWidth 
