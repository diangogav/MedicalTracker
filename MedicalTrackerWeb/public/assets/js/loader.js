
function showLoader(div){
    var loader = document.getElementById(div);
    loader.style.visibility = 'visible';
    loader.style.zIndex = '100000';
    loader.style.opacity = '1';

}

function hiddenLoader(div){
    var loader = document.getElementById(div);
    loader.style.visibility = 'hidden';
    loader.style.opacity = '0';
}