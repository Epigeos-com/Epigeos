<!DOCTYPE html>
<html id="tp_variables">
    <head>
        <title id="tp_title"> - Epigeos</title>
        <script src="/scripts.js?ver=0"></script>
        <link rel="stylesheet" href="/styles.css?ver=0">
        <link rel="stylesheet" href="/app.css?ver=0">
        <link href="/assets/favicon.ico" rel="icon">
        <meta charset="UTF-8">
    </head>
    <body>
        <div id="header">
            <img id="tp_icon" src="/assets/" alt="Icon - ">
            <div id="content">
                <h1 id="tp_header"></h1>
                <p id="tp_platforms"><b>Platforms:</b>&nbsp </p>
                <p id="tp_languages"><b>Languages:</b>&nbsp </p>
                <p id="tp_status"><b>Status:</b>&nbsp </p>
                <p id="tp_source_code"><b>Source code:</b>&nbsp </p>
                <p id="tp_short_description"></p>
            </div>
            <div id="categories">
                <a onclick="checkHash('#Description')">Description</a>
                <a onclick="checkHash('#Download')">Download</a>
            </div>
        </div>
        <div id="Description"></div>
        <div id="Download"></div>
    </body>
</html>

<script>
    const page = "<?php echo $_GET['p'] ?>";
    fetch('/' + page.split('/')[0] + '.json').then(response => response.json()).then(json => {
        document.getElementById('tp_variables').style.setProperty("--backgroundColor", json.background_color);
    });
    fetch('/' + page + '.json').then(response => response.json()).then(json => {
        document.getElementById('tp_title').innerHTML = json.app_name + document.getElementById('tp_title').innerHTML;
        document.getElementById('tp_icon').src += page + ".svg";
        document.getElementById('tp_icon').alt += json.app_name;
        document.getElementById('tp_header').innerHTML += json.app_name;
        document.getElementById('tp_platforms').innerHTML += json.platforms;
        if (json.show_why_not_other_platforms) document.getElementById('tp_platforms').innerHTML += " &nbsp <a href=\"/platforms\">Why not others?</a>"
        document.getElementById('tp_languages').innerHTML += json.languages;
        if (json.show_contribute_to_languages) document.getElementById('tp_languages').innerHTML += " &nbsp <a href=\"https://github.com/Epigeos-com/" + json.repo_name + "/tree/main/contribute/languages.md\">Contribute</a>"
        document.getElementById('tp_status').innerHTML += json.status;
        document.getElementById('tp_source_code').innerHTML += json.source_code;
        document.getElementById('tp_short_description').innerHTML += json.short_description;
        if (!json.has_downloads) document.getElementById('categories').style.display = "none";
        document.getElementById('Description').innerHTML = json.description;
        createNavbar();
        if (json.has_downloads) {
            listDownloads(json.repo_name);
            checkHash();
        }
    });
</script>