# replace-adobe-svgids
Utility to replace the dreaded Adobe Illustrator SVGID_1_ issue

Adobe Illustrator is great, but even in 2019 with the web moving toward SVGs, it still sucks at exporting them.

Not only does illustrator not save scale/translate/rotate on the exported <g> tags as expected (it saves these changes into the shapes themselves, losing all translation information), by default it exports gradient fills with the lame "SVGID_1_", "SVGID_2_", etc. ids.

This means if you export your SVG from Adobe, and you draw two or more SVGs on the same web page, the gradients will be ruined on all SVGs after the first one.

Adobe fixed this by adding a huge, massive UUID to ids, but this option is locked away in export options and is off by default. It also bloats your image size.

What if you exported a thousand of SVGs, and you just realized Adobe Illustrator has this issue? Do you have to find the option, turn it on, re-export everything and suffer with bloat?

No, you can run this tool. :)

# Getting started

You need to install NodeJS. This is really, really easy.
https://nodejs.org/en/download/

You need to run the tool from the command line.

# Usage
```
node replace-svgids.js [path to folder containing svgs]
```

# Details

By default, this script will exchange SVGID_n_ IDs with A-z0-9 (base 62) 16 character length UIDs.  This means a 1/23 Octillion chance of collision, while being much smaller than UUIDs.
