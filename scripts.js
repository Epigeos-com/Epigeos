function createNavbar(){
    document.body.innerHTML = document.body.innerHTML + `<div id="navbar">
            <div></div>
            <a href="/pyr"><p>Pyr</p></a>
            <a href="/anemos"><p>Anemos</p></a>
            <a href="/"><p>Home</p></a>
            <a href="/hydor"><p>Hydor</p></a>
            <a href="/ge"><p>Ge</p></a>
            <div id="accessibilityButton" onclick="toggleAccessibility()">
                <img id="accessibilityButtonImg" src="/assets/accessibility.svg" alt="accesibility">
            </div>
        </div>`;
    if (!document.cookie.includes('accept=')) document.body.innerHTML += `
        <div id="cookiesDiv">
            <p>This website uses cookies for bot protection and this agreement.</p><input type="button" onclick="acceptCookies()" value="Okie dokie">
        </div>`
    if (document.cookie.includes('accessibility=')){
        document.documentElement.classList.add('accessibility');
        document.getElementById('accessibilityButtonImg').src = '/assets/accessibility-accessibility.svg';
    }
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

    else if (hash == '#Description'){
        document.getElementById('Description').style.display = 'block';
        if (document.getElementById('Download')) document.getElementById('Download').style.display = 'none'
        else document.getElementById('Apps').style.display = 'none';
    }else if (hash == '#Download'){
        document.getElementById('Description').style.display = 'none';
        document.getElementById('Download').style.display = 'block';
    }else if (hash == '#Apps'){
        document.getElementById('Apps').style.display = 'block';
        document.getElementById('Description').style.display = 'none';
    }
}

function downloadVersion(download_url, name){
    const link = document.createElement('a');
    link.href = download_url;
    link.download = 'Reo-' + name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function listDownloads(repo){
    const download = document.getElementById('Download');
    download.innerHTML = '';

    fetch('https://api.github.com/repos/Epigeos-com/' + repo + '/releases/latest', {
        method: "GET",
        headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": "Bearer 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"
        }
    }).then(response => response.json()).then(responseJson => {
        if (responseJson.assets){
            responseJson.assets.forEach(asset => {
                download.innerHTML += `<p onclick="downloadVersion('${asset.browser_download_url}', '${asset.name}')">${asset.name}</p>`
            });
        }else{
            download.innerHTML = '<h3 style="margin-top: var(--contentMargin)">This app doesn\'t seem released yet</h3>'
        }
    });
}