# Adding images
All images must be saved in /assets/images/albums/*.
Images must have their data added to the img-data.const.ts file.

## Creating thumbnails
Use http://makethumbnails.com/ for ease.
Thumbnails must be 300x300 px. If smaller or rectangular, they
must be padded with black bars.
Thumbnails must go in /assets/images/albums/*/thumbs.
Thumbnails must end with '_tn.jpg'.

# Adding projects
A new project must have its name added to the ProjectName enum.
The new enum must be mapped to a new route in projectNameToRouteMap.
The new project's data must be added to projectData.