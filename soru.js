function Soru(soruMetni, soruCevaplari, dogruCevap) {
    this.soruMetni = soruMetni;
    this.soruCevaplari = soruCevaplari;
    this.dogruCevap = dogruCevap;
  }
  Soru.prototype.cevabiKontrolEt = function (cevap) {
    return cevap === this.dogruCevap;
  };
  let sorular = [
    new Soru(
      "Aşağıda Verilen İlk Çağ Uygarlıklarından Hangisi Yazıyı İcat Etmiştir?",
      { A: "Hititler", B: "Elamlar", C: "Sümerler", D: "Urartular" },
      "C"
    ),
    new Soru(
      "Aşağıdakilerden Hangisi Dünya Sağlık Örgütünün Kısaltılmış İsmidir?",
      { A: "Uhw ", B: "Unıcef ", C: "Who ", D: "Nato" },
      "C"
    ),
    new Soru(
      "Romen Rakamında Hangi Sayı Yoktur?",
      { A: "0", B: "50", C: "100", D: "150" },
      "A"
    ),
    new Soru(
      "Üç Büyük Dince Kutsal Sayılan Şehir Hangisidir?",
      { A: "Mekke ", B: "Kudüs", C: "Roma", D: "İstanbul" },
      "B"
    ),
  ];