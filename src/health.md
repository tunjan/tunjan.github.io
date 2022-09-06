---
title: health
published_date: "2022-08-01 20:11:17 +0000"
layout: default.liquid
is_draft: false
---

<q>A state of complete physical, mental and social well-being and not merely the absence of disease and infirmity</q>
<cite> World Health Organization </cite>

{%- for item in site.data.structure.nav -%}
  {%- if page.title == item.name -%}
    {% assign pageRoot = item.name %}
    {%- for item in site.data.structure.nav -%}
      {%- if pageRoot == item.folder -%}
        <a href='{{item.name}}.html'>{{item.name}}</a>
      {%- endif -%}
    {%- endfor -%}
  {%- endif -%}
{%- endfor -%}
