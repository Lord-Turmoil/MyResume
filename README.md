# Tony's Resume

> Copyright &copy; Tony's Studio 2024

---

## Overview

A simple but laconic resume template. It is customizable and easy to use. You can use it to build your own resume.

## Customization

The data of the resume is stored in the `data.json` file. You can modify the data in the file to customize the resume.

You can refer to the template `data.json` to write your own data. You can also extend the template by adding new data types and handlers in `js/index.js`.

```js
const CHAPTER_HANDLERS = {
    "plaintext": _plainTextHandler,
    "timeline": _timelineHandler,
    "multiline": _multilineHandler,
    "project": _projectHandler
};

const SIDEBAR_HANDLERS = {
    "timeline": _sidebarTimelineHandler,
    "list": _sidebarListHandler
};
```

---

Good luck with your resume! 🚀