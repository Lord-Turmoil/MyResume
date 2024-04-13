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


(function () {
    fetch("./data.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error("Cannot find \"data.json\".");
            }
            return res.json();
        })
        .then((data) => render(data))
        .catch((error) => {
            console.log("🚀 > error:", error);
            html = `<div class="error">`;
            html += `<h1>Failed to load "data.json"</h1>`;
            html += `<p>${error}</p>`;
            html += `</div>`;
            document.getElementById("container").innerHTML = html;
        });
})();

function e(id) {
    return document.getElementById(id);
}

function v(value, defaultValue = null) {
    return value ? value : (defaultValue ? defaultValue : "Unknown");
}

function o(obj, func) {
    if (obj) {
        func(obj);
    }
}

function render(data) {
    console.log("🚀 > Rendering data...");

    _renderInfo(data);
    o(data.chapters, _renderChapters);
    o(data.sidebar, _renderSidebar);

    console.log("🚀 > Render complete!");
}

function _renderInfo(data) {
    e("name").innerHTML = v(data.name);
    e("title").innerHTML = v(data.title);
    e("avatar").innerHTML = `<img src="${v(data.avatar, "avatar.svg")}" alt="avatar">`;
    o(data.contact, _renderContact);
}

function _renderContact(contact) {
    names = "";
    values = "";
    if (contact.tel) {
        names += '<li><i class="fa fa-phone" title="Cell phone"></i></li>';
        values += `<li>${contact.tel}</li>`;
    }
    if (contact.email) {
        names += '<li><i class="fa fa-envelope" title="Email"></i></li>';
        values += `<li><a href="mailto:${contact.email}" target="_blank">${contact.email}</a></li>`;
    }
    if (contact.website) {
        names += '<li><i class="fa fa-globe-americas" title="Website"></i></li>';
        // remove http(s):// in website
        let website = contact.website.replace(/(^\w+:|^)\/\//, '');
        values += `<li><a href="${contact.website}" target="_blank">${website}</a></li>`;
    }
    if (contact.github) {
        names += '<li><i class="fab fa-github" title="GitHub"></i></li>';
        values += `<li><a href="https://github.com/${contact.github}" target="_blank">${contact.github}</a></li>`;
    }
    e("contact-names").innerHTML = names;
    e("contact-values").innerHTML = values;
}

function _renderChapters(chapters) {
    var html = "";
    chapters.forEach(element => {
        html += _renderChapter(element);
    });
    e("chapters").innerHTML = html;
}

function _renderChapter(chapter) {
    var html = `<div class="chapter">`;

    html += `<h2>${v(chapter.title)}</h2><hr />`;
    handler = CHAPTER_HANDLERS[chapter.type];
    if (handler) {
        html += handler(chapter);
    } else {
        throw new Error(`Unknown chapter type: ${chapter.type}`);
    }
    html += `</div>`;

    return html;
}

function _renderSidebar(sections) {
    var html = "";
    sections.forEach(section => {
        handler = SIDEBAR_HANDLERS[section.type];
        if (!handler) {
            throw new Error(`Unknown sidebar type: ${section.type}`);
        }
        html += handler(section);
    });
    e("sidebar").innerHTML = html;
}

//////////////////////////////////////////////////
// Specific chapter handlers.
//////////////////////////////////////////////////

function _plainTextHandler(chapter) {
    console.log("🚀 > handle plain text");
    var html = `<div class="section">`;
    html += `<p>${v(chapter.text)}</p>`;
    html += `</div>`;
    return html;
}

function _timelineHandler(timeline) {
    console.log("🚀 > handler timeline");
    var html = "";
    timeline.timeline.forEach(element => {
        html += `<div class="section">`;
        html += `<div class="timeline">`;
        html += `<h3>${v(element.title)}</h3>`;
        html += `<span class="small trivial">${v(element.time)}</span>`;
        html += `</div>`;
        html += `<p>${v(element.description)}</p>`;
        html += `</div>`;
    });
    return html;
}

function _multilineHandler(chapter) {
    var html = `<div class="section">`;
    chapter.lines.forEach(element => {
        html += `<p class="no-indent">${v(element)}</p>`;
    });
    html += `</div>`;
    return html;
}

function _projectHandler(chapter) {
    var html = "";
    chapter.projects.forEach(project => {
        html += `<div class="section">`;
        html += `<div class="timeline">`;
        html += `<h3>${v(project.title)}</h3>`;
        html += `<span class="small trivial">${v(project.description)}</span>`;
        html += `</div>`;
        html += `<div class="subtitle trivial">${v(project.badges, []).join(" | ")}</div>`;
        html += `<ul>`;
        project.highlights.forEach(detail => {
            html += `<li>${v(detail)}</li>`;
        });
        html += `</ul>`;
        html += `</div>`;
    });

    return html;
}

//////////////////////////////////////////////////
// Sidebar handlers.
//////////////////////////////////////////////////

function _sidebarTimelineHandler(timeline) {
    var html = `<div class="section">`;
    html += `<h4>${`<i class="${v(timeline.icon, "")}"></i>`} ${v(timeline.title)}</h4>`;
    html += `<ul>`
    timeline.timeline.forEach(element => {
        html += `<li class="very-small">`;
        html += `<span class="time-badge">`;
        html += `<span class="item">${v(element.title)}</span>`;
        html += `<span class="badge">${v(element.time)}</span>`;
        html += `</span>`;
        html += `</li>`;
    });

    html += `</div>`;
    return html;
}

function _sidebarListHandler(list) {
    var html = `<div class="section">`;
    html += `<h4>${`<i class="${v(list.icon, "")}"></i>`} ${v(list.title)}</h4>`;
    html += `<ul>`;
    list.items.forEach(element => {
        html += `<li>${v(element)}</li>`;
    });
    html += `</ul>`;
    html += `</div>`;
    return html;
}

//////////////////////////////////////////////////

e("hide-watermark").onclick = function () {
    e("watermark").innerHTML = "";
    e("hide-watermark").onclick = null;
}