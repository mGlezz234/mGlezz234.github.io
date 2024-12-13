let langOption = document.querySelectorAll('.select');
let fromText   = document.querySelector('.fromText');
let transText  = document.querySelector('.toTranslate');
let fromVoice  = document.querySelector('.from');
let toVoice    = document.querySelector('.to');
let cpyBtn     = document.querySelector('.bx-copy');
let countValue = document.querySelector('.code_length');
let exchangLang= document.querySelector('.bx-transfer');

function navigateToPage() {
    const menu = document.getElementById("menu");
    const selectedValue = menu.value;

    if (selectedValue) {
        window.location.href = selectedValue;
    }
}
langOption.forEach((get, con) =>{
    for(let countryCode in language){
        let selected;
        if(con == 0 && countryCode == "id-ID"){
            selected = "selected";
        }else if(con == 1 && countryCode == "ja-JP"){
            selected = "selected";
        }
        let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
        get.insertAdjacentHTML('beforeend', option);
    }
})
fromText.addEventListener('input', function() {
    let content = fromText.value;
    fromContent = langOption[0].value;
    transContent= langOption[1].value;

    let  transLINK = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`;

    fetch(transLINK).then(translate => translate.json()).then(data => {
        transText.value = data.responseData.translatedText;
    })
})
fromVoice.addEventListener('click', function() {
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(fromText.value);
    fromTalk.lang = langOption[0].value;
    speechSynthesis.speak(fromTalk)
})
function toggleMenu() {
    const menuList = document.getElementById('menu-list');
    // Toggle class 'active' untuk menampilkan/menyembunyikan menu
    if (menuList.style.display === "block") {
      menuList.style.display = "none";
    } else {
      menuList.style.display = "block";
    }
  }
function toggleDropdown() {
    const menuList = document.getElementById('menu-list');
    menuList.classList.toggle('show');
  }
  

toVoice.addEventListener('click', function() {
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(transText.value);
    fromTalk.lang = langOption[1].value;
    speechSynthesis.speak(fromTalk)
})
cpyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(transText.value);
})
fromText.addEventListener('keyup', function() {
    countValue.innerHTML = `${fromText.value.length}/5,000`;
})
exchangLang.addEventListener('click', function() {
    let tempText = fromText.value;
    fromText.value = transText.value;
    transText.value = tempText;

    let tempOpt = langOption[0].value;
    langOption[0].value = langOption[1].value;
    langOption[1].value = tempOpt;
})
function toggleFormVisibility() {
    const form = document.querySelector('form');
    form.classList.toggle('visible');
}