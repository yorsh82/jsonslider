# JSONslider
JSONslider is a simple fade slideshow for pictures stored dynamically in a JSON file you can edit without messing up your HTML.

**This is a beta version, it has not been fully tested**

## SET UP

### 1 - Set up the JSON file
The JSON file must have at least these names and values:

    { "pictures": [
      {
        "url" : "path-to-picture-1",
        "alt" : "A little description"
      }
    ] }

Repeat for other pictures.
In the [store.json](store.json) file you will find along with the plug-in, is just an example of a `*.json` file. Other names in that file are just for storing more information.

### 2 - Set HTML tag
Give a unique ID or a class to an empty `<div>` in your `HTML`:

  <div class="your-class"></div>
  
### 3 - Run the function
This is an example of how the function must be called with all available options.

  $( document ).ready(function() {
  	$( '.your-class' ).jsonSlider({
  		json: 'path-to-your-json-file.json',
  		Class: 'slider-active' //default class
  	});
  });

For compatibility issues I added the option `Class` that lets you set a custom class to call the *active element*.
By default the class is `'slider-active`.
