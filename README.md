# Chao.JS

Chao.JS is an open-source library with few common HTML component.
Version: 0.0.3.

## Installation and import

Download the latest minified JS and CSS sources then import the files in the main HTML file.
```html
<!-- Chao.JS: Import the minified JS and CSS source -->
<link rel="stylesheet" type="text/css" href="https://github.com/mbalyi/chaojs/blob/master/chao.min.css">
<script type="application/javascript" src="https://github.com/mbalyi/chaojs/blob/master/chao.min.js"></script>

<!-- Import requirements: jQuery, additional a Icon library -->
<script type="application/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
```

## Usage

More examples are available under [examples](https://github.com/mbalyi/chaojs/tree/master/examples) folder.
```html
<!-- Example for Chao.JS button component -->
<button type="button" id="chaoBtn">Default Active Button</button>
<script>
    var options = {
        target: $('#chaoBtn'),
        customClass: 'defaultBtn',
        disabled: false,
        type: ChaoButtonType.btn,
        callback: {
            onClick: function(res) {
                console.log('Button click event: ', res);
            },
            onMouseEnter: function(res) {
                console.log('Button hover event: ', res);
            }
        }
    };

    var btn = new ChaoButton(options);
</script>
```

## Available components
- Input [WIP]
- Dropdown [WIP]
- Button
- Checkbox-Group
- Switch

## Scope of beta release
- Input validation
- Notifications
- Dialogs

## Out of Scope from Beta release
- Data Table
- Scheduler/Calendar
- Charts

## Contributing
Later..

## License
[MIT](https://github.com/mbalyi/chaojs/blob/master/LICENSE)