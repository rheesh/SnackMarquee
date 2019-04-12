# SnackMarquee
SnackMarquee is a simple text marquee library.
Like brothers([SnackSlider](https://github.com/rheesh/SnackSlider), [SNackSliderV](https://github.com/rheesh/SnackSliderV)) 
The source length of the SnackSliderV is less than 400 lines, and it has a very simple structure.
But unlike brothers, this text marquee is usually restarted when you change the running option.
Please understand that if the text width changes, the animation cycle changes and therefore a restart is inevitable.


## Feature

- No control button, only functions. (You can easily create buttons by invoking a function.)
- Super smooth ext scroll.
- You can change font, font size, animation speed, color...

## Dependency

- JQuery (3.1 or above)

## Tested browser

- Chrome 73
- Safari 12

## Remark

If you create a SnackMarque object before the font is loaded when using a web font, 
the text width calculation will be problematic. 
In this case, you must delay the creation of the SnackMarcqueue object.

## Usage

Please refer to the test folder.


````
 <script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
     <script src="../src/snackmarquee.js"></script>
 
     <script>
         let slider;
         $(document).ready(function () {
             slider = new SnackMarquee({
                 selector: '.slider',
                 mode: 'right',
                 speed: 100,
                 space: 20,
                 font: 'Arial, Helvetica, sans-serif',
                 size: 24,
                 color: 'white',
                 background: 'black',
                 width: 0,
                 height: 0,
                 children: [
                     'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                     'Quisque elementum diam nisi, eget sollicitudin ex rutrum at.',
                     'Suspendisse potenti. Praesent odio nisl, bibendum sit amet ultricies eget.',
                 ]
             });
         });
     </script>
 
 
 </head>
 <body>
     <div class="slider" style="width:640px;height:32px"></div>
````

## Options

| Option Name | Type | Default value | Description |
| ----------- | ---- | ------------- | ----------------------------------------------------------------------|
| selector    | string | -           | Required. JQuery selector pointing to the html element to include the marquee. |
| mode        | string | 'right'     | One of 'right', 'left'. Mode of marquee show. |
| speed       | integer| 100         | Text animation speed. (px/s) |
| space       | string | ''          | Space between each text element. (number of space character) |
| font        | string | 'Arial, Helvetica, sans-serif'| Value of css 'font-face' for text. |
| size        | integer| 24         | Font size for text (px) |
| color       | string | 'white'     | Font color |
| background  | string | 'black'     | Background color |
| width       | integer| 0           | If 0, width is parent element's width. |
| height      | integer| 0           | If 0, height is parent element's height. |
| children    | array  | [ ]         | List of texts |

## Changelog

**V1.0.0**
- First commit.

## License

**MIT**

## Remarks

If you find that SnackSliderV is useful, please support me with [a glass of beer :beer:](https://www.paypal.me/SeunghoYi). 

