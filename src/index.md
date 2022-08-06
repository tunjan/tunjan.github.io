---
title: index
layout: default.liquid
---
<ul>
{% for item in site.data.samplelist.nav %}
  [{{item.name}}](./{{item.name}}.html)
{% endfor %}
</ul>
