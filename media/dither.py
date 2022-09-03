from PIL import Image
import os, sys, hitherdither

img= Image.open('torta.jpg')
palette = hitherdither.palette.Palette.create_by_median_cut(img)
img_dithered = hitherdither.ordered.bayer.bayer_dithering(
img, palette, [256/4, 256/4, 256/4], order=8)
img_dithered.save('trotona.png', optimize=True)

