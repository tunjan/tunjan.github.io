---
title: commands
layout: default.liquid
---

Commands I find myself using time and time again. Or used once, but were so difficult to get that I thought it worth noting.

## Vim

- Search & Replace: ```%s/<search_term>/<replace_term>/g``` 
- Add snippet: ```require("luasnip.loaders.from_vscode").lazy_load({ paths = { "~/.config/nvim/lua/custom/snippets" } })``` in luasnip
examples in ``` ~/.local/share/nvim/site/pack/packer/opt/friendly-snippets/snippets/global.json```

## System

- **Hardware Info**: ```lshw -short```
- **Device model**: ```sudo dmidecode -s system-product-name```
- **Battery status**:  ```upower -e;  upower -i /org/freedesktop/UPower/devices/battery_BAT1```
- **Enable touchpad while typing**: ```xinput list-props``` select input ```xinput set-prop [input-number] [property number] [state]```
- **Show loaded kernel modules**: ```lsmod```
- **Failed to set power on: org.bluez.Error.Failed**: ```rfkill block bluetooth
rfkill unblock bluetooth```

## Git

- **Clone branch**: ```git clone --branch <branch name> <url>``` 

## Unicode

- U+2014 -> —

## Miscellaneous

- **Download website**: ```wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://example.com```

- **Start server** : ```python3 -m http.server 8000```

- Check <a target="_blank" href="http://aspell.net/man-html/Spellchecking-Individual-Files.html#Spellchecking-Individual-Files">Spelling</a>: ```for f in *.md; do aspell check -l en -mode markdown $f; done```

- **Reduce Video Size**:ffmpeg -i input.mp4 -vcodec libx265 -crf 28 output.mp4
