<!DOCTYPE html>
<html id="tp_variables">
    <head>
        <title id="tp_title"> - Epigeos</title>
        <script src="/scripts.js?ver=0"></script>
        <link rel="stylesheet" href="/styles.css?ver=0">
        <link rel="stylesheet" href="/element.css?ver=0">
        <link href="/assets/favicon.ico" rel="icon">
        <meta charset="UTF-8">
    </head>
    <body>
        <div id="header">
            <img id="tp_icon" src="/assets/" alt="Icon - ">
            <h1 id="tp_header"></h1>
            <h3 id="tp_subtitle"></h3>

            <div>
                <a onclick="checkHash('#Apps')">Apps</a>
                <a onclick="checkHash('#Description')">Description</a>
            </div>
        </div>
        <div id="Apps"></div>
        <div id="Description"></div>
    </body>
</html>

<script>
    const page = "<?php echo $_GET['p'] ?>";
    fetch(page + '.json').then(response => {
        console.log(response);
        if (response.status == 404){
            window.location.replace("/404");
        }else{
            response.json().then(json => {
                document.getElementById('tp_variables').style.setProperty("--backgroundColor", json.background_color);
                document.getElementById('tp_title').innerHTML = json.element_name + document.getElementById('tp_title').innerHTML;
                document.getElementById('tp_icon').src += page + ".svg";
                document.getElementById('tp_icon').alt += json.element_name;
                document.getElementById('tp_header').innerHTML += json.element_name;
                document.getElementById('tp_subtitle').innerHTML += json.subtitle;
                document.getElementById('Description').innerHTML = json.description;
                createNavbar();

                const apps = document.getElementById('Apps');
                if (json.apps.length == 0) {
                    apps.innerHTML = "<h3 style=\"margin-top: var(--contentMargin)\">Nothing's here yet, ain't that sad?</h3>";
                }else{
                    json.apps.forEach(app => fetch(page + '/' + app + '.json').then(response => response.json()).then(json => {
                    apps.innerHTML += `<div class="app" onclick="window.location.href='/${page}/${app}'">
                            <img src="/assets/${page}/${app}.svg" alt="Icon - ${json.app_name}">
                            <div>
                                <h2>${json.app_name}</h2>
                                <p><b>Platforms:</b>&nbsp ${json.platforms}</p>
                                <p><b>Languages:</b>&nbsp ${json.languages}</p>
                                <p><b>Status:</b>&nbsp ${json.status}</p>
                                <p>${json.short_description}</p>
                            </div>
                        </div>`
                    }));
                }

                checkHash();
            })
        }
    });
</script>