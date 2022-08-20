---
title: commands
layout: default.liquid
---

Commands I find myself using time and time again. Or used once, but were so difficult to get that I thought it worth noting.

## Vim

- Search & Replace: ```%s/<search_term>/<replace_term>/g``` 

## System

- **Hardware Info**: ```lshw -short```
- **Device model**: ```sudo dmidecode -s system-product-name```
- **Battery status**:  ```upower -e;  upower -i /org/freedesktop/UPower/devices/battery_BAT1```

## Git

- **Clone branch**: ```git clone --branch <branch name> <url>``` 

## Unicode

- U+2014 -> —

## Miscelaneous

- **Download website**: ```wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://example.com```
