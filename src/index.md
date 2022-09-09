---
title: index
layout: default.liquid
---
<ul>
{% for item in site.data.structure.nav %}
<li>
  <a href="{{ item.name }}.html">{{item.name}}</a>
</li>

{% endfor %}
</ul>
