const quiz = new Quiz(sorular);
var dogruCevapSayaci = 0;

btnStart.addEventListener("click", function () {
  startTimer(9);
  startTimerLine();
  card.classList.add("active");
  document.getElementById("soruSayisi").textContent = quiz.soruIndex + 1 + "-)";
  soru.textContent = quiz.soruGetir().soruMetni;
  document.getElementById("soruSayaci").textContent = quiz.soruIndex + 1;
  document.getElementById("toplamSoruSayaci").textContent = quiz.sorular.length;
  soruSiklari();
});
btnNext.addEventListener("click", function () {
  quiz.soruIndex += 1;
  if (quiz.sorular.length != quiz.soruIndex) {
    document.querySelector("#kalanSure").textContent = "Kalan Süre:";
    document.querySelector("#sure").textContent = "10";
    clearInterval(counterLine);
    clearInterval(counter);
    startTimerLine();
    startTimer(9);
    soruSayisi.textContent = quiz.soruIndex + 1 + "-)";
    soru.textContent = quiz.soruGetir().soruMetni;
    document.getElementById("soruSayaci").textContent = quiz.soruIndex + 1;
    document.getElementById("toplamSoruSayaci").textContent =
      quiz.sorular.length;
    soruSiklari();
    btnNext.classList.add("gizli");
  } else {
    card.classList.remove("active");
    document.querySelector(".bitis_card").classList.remove("gizli");
  }
});
kapat.addEventListener("click", function () {
  window.location.reload(false);
});

function soruSiklari() {
  document.querySelector(".secenekler").innerHTML = "";
  for (let cevaplar in quiz.soruGetir().soruCevaplari) {
    let soruCevapIcerik = quiz.soruGetir().soruCevaplari[cevaplar];
    let secenek = `<li class="secenek" id="secenek" >
    <span id="cevap">${cevaplar}-) ${soruCevapIcerik}</span><span class="none" id="correctIcon"><i class="fa-solid fa-check"></i></span><span class="none" id="incorrectIcon"><i class="fa-solid fa-xmark"></i></span>
             </li>`;
    document
      .querySelector(".secenekler")
      .insertAdjacentHTML("beforeend", secenek);
  }
  const secenekler = document.querySelectorAll(".secenek");
  for (let sec of secenekler) {
    sec.setAttribute("onclick", "optionSelected(this)");
  }
}
function optionSelected(secim) {
  let cevaps = secim.querySelector("#cevap");
  let cevabim = cevaps.textContent[0];
  let sorum = quiz.soruGetir().dogruCevap;

  if (quiz.soruGetir().cevabiKontrolEt(cevabim)) {
    secim.classList.add("correct");
    secim.querySelector("#correctIcon").classList.remove("none");
    dogruCevapSayaci += 1;
  } else {
    secim.classList.add("incorrect");
    secim.querySelector("#incorrectIcon").classList.remove("none");
  }
  const secenekler = document.querySelectorAll(".secenek");
  for (let i = 0; i < secenekler.length; i++) {
    secenekler[i].classList.add("disabled");
  }
  btnNext.classList.remove("gizli");
  document.querySelector("#sorudan").textContent = quiz.sorular.length;
  document.querySelector("#dogrum").textContent = dogruCevapSayaci;
  clearInterval(counter);
  clearInterval(counterLine);
  for (let k of secenekler) {
    if (
      k.querySelector("#cevap").textContent[0] == quiz.soruGetir().dogruCevap
    ) {
      k.classList.add("correct");
      k.querySelector("#correctIcon").classList.remove("none");
      btnNext.classList.remove("gizli");
    }
  }
}
document.querySelector(".bitir").addEventListener("click", function () {
  window.location.reload(false);
});
document.querySelector(".tekrar").addEventListener("click", function () {
  document.querySelector("#kalanSure").textContent = "Kalan Süre:";
  document.querySelector("#sure").textContent = "10";
  clearInterval(counterLine);
  clearInterval(counter);
  startTimerLine();
  startTimer(9);
  quiz.soruIndex = 0;
  dogruCevapSayaci = 0;
  document.querySelector(".bitis_card").classList.add("gizli");
  card.classList.add("active");
  document.getElementById("soruSayisi").textContent = quiz.soruIndex + 1 + "-)";
  soru.textContent = quiz.soruGetir().soruMetni;
  document.getElementById("soruSayaci").textContent = quiz.soruIndex + 1;
  document.getElementById("toplamSoruSayaci").textContent = quiz.sorular.length;
  soruSiklari();
});

let counter;
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    document.querySelector("#sure").textContent = time;
    time--;

    if (time < 0) {
      document.querySelector("#kalanSure").textContent = "Süre Bitti!";
      clearInterval(counter);
      let secenekler = document.querySelectorAll(".secenek");
      for (let k of secenekler) {
        if (
          k.querySelector("#cevap").textContent[0] ==
          quiz.soruGetir().dogruCevap
        ) {
          k.classList.add("correct");
          k.querySelector("#correctIcon").classList.remove("none");
          btnNext.classList.remove("gizli");
        }
      }
    }
  }
}
let counterLine;
function startTimerLine() {
  let time = 0;
  let line_width = 0;

  counterLine = setInterval(timer, 100);
  function timer() {
    line_width += 1;
    if (line_width <= 100) {
      document.querySelector("#sureAnimasyonIci").style.width =
        line_width + "%";
    } else {
      clearInterval(counterLine);
    }
  }
}
