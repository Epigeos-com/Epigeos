function createNavbar(){
    document.body.innerHTML = document.body.innerHTML + `<div id="navbar">
            <div></div>
            <a href="/pyr"><p>Pyr</p></a>
            <a href="/anemos"><p>Anemos</p></a>
            <a href="/"><p>Home</p></a>
            <a href="/hydor"><p>Hydor</p></a>
            <a href="/ge"><p>Ge</p></a>
            <div id="accessibilityButton" onclick="toggleAccessibility()">
                <img id="accessibilityButtonImg" src="/assets/accessibility.svg">
            </div>
        </div>`;
    if (!document.cookie.includes('accept=')) document.body.innerHTML += `
        <div id="cookiesDiv">
            <p>This website uses cookies for bot protection and this agreement.</p><input type="button" onclick="acceptCookies()" value="Okie dokie">
        </div>`
    if (document.cookie.includes('accessibility=')) document.documentElement.classList.add('accessibility');
}
function acceptCookies(){
    let date = new Date();
    date.setDate(date.getDate() + 30);
    document.cookie = `accept=; expires=${date}; path=/`;
    document.getElementById('cookiesDiv').outerHTML = '';
}
function toggleAccessibility(){
    let date = new Date();
    if (document.cookie.includes('accessibility=')){
        date.setDate(date.getDate() - 1);
        document.documentElement.classList.remove('accessibility');
        document.getElementById('accessibilityButtonImg').src = '/assets/accessibility.svg';
    }else{
        if (!window.confirm('Cookies are nessecary to store this info and use this')) return;
        date.setDate(date.getDate() + 30);
        document.documentElement.classList.add('accessibility');
        document.getElementById('accessibilityButtonImg').src = '/assets/accessibility-accessibility.svg';
    }

    document.cookie = `accessibility=; expires=${date}; path=/`;

}

function checkHash(setHash = null){
    if (setHash) window.location.hash = setHash;

    const hash = window.location.hash;
    if (hash == '');
    else if (hash == '#Info'){
        document.getElementById('Info').style.display = 'block';
        document.getElementById('Download').style.display = 'none';
    }else if (hash == '#Download'){
        document.getElementById('Info').style.display = 'none';
        document.getElementById('Download').style.display = 'block';
    }

    else if (hash == '#Apps'){
        document.getElementById('Apps').style.display = 'block';
        document.getElementById('Description').style.display = 'none';
    }else if (hash == '#Description'){
        document.getElementById('Apps').style.display = 'none';
        document.getElementById('Description').style.display = 'block';
    }
}

function downloadVersion(zipball_url, tag_name){
    const link = document.createElement('a');
    link.href = zipball_url;
    link.download = 'Reo-' + tag_name + '.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    checkHash('#Info');
}
function listDownloads(repo, autoDetect = false){
    const downloads = document.getElementById('downloads');
    downloads.innerHTML = '';

    const language = document.getElementById('language');
    const platform = document.getElementById('platform');
    if (autoDetect){
        language.value = navigator.language.substring(0, 2);

        const userAgent = window.navigator.userAgent;
        if (userAgent.includes('Windows')){
            platform.value = 'Windows';
        }else if (userAgent.includes('Android')){
            platform.value = 'Android';
        }else if (userAgent.includes('Linux')){
            platform.value = 'Linux';
        }else if (userAgent.includes('iOS')){
            platform.value = 'iOS';
        }else if (userAgent.includes('Mac OS')){
            platform.value = 'Mac';
        }
        console.log(userAgent);
    }

    let html = "";
    fetch('https://api.github.com/repos/Epigeos-com/' + repo + '/releases').then(response => {
        const responseJson = response.json();
        if (responseJson[0]){
            forEach(release => {
                console.log(release);
                if (release.tag_name.startsWith(language.value + platform.value))
                html += `<p onclick="downloadVersion('${release.zipball_url}', '${release.tag_name}')">${release.tag_name}</p>`
            });
        }else{
            html = '<h3>No downloads available</h3>'
        }
    }).then(() => 
        downloads.innerHTML += html
    );
}