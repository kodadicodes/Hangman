let word_el = document.getElementById("word");
const popup = document.getElementById("popup-container")
const message_el = document.getElementById("success-message")
const wrongLetters_el = document.getElementById("wrong-letters")
const items = document.querySelectorAll(".item")
const message = document.getElementById("message")
const btn = document.getElementById("play-again")

const correctLetters = []
const wrongLetters = []
let selectedWord = getRandomWord();

function getRandomWord() {
  const words = ['javascript', 'java', 'python'];

  // `Math()` JavaScript'te matematiksel hesaplamalar yapmak ve matematik fonksiyonlarına erişmek için kullanılan dahili bir nesnedir.
  // `Math.floor()` JavaScript'de, bir sayıyı en yakın küçük tam sayıya yuvarlayan bir matematik fonksiyonudur.
  // `Math.random()` JavaScript'te, 0 ile 1 arasında rastgele bir ondalık sayı döndüren bir matematik fonksiyonudur.
  // --- Yukarıdaki ifade, `words` dizisinden rastgele bir kelime döndürmek için kullanılan JavaScript kodunu temsil etmektedir.
  // `Math.random()` ile elde edilen rastgele bir ondalık sayı, `words` dizisinin uzunluğuyla çarpılır ve
  // `Math.floor()` fonksiyonuyla en yakın küçük tam sayı elde edilir.
  // Bu sayı, `words` dizisinin indeksi olarak kullanılarak rastgele bir kelime seçilir ve `return` ifadesiyle geri döndürülür.---
  return words[Math.floor(Math.random() * words.length)];
}


function displayWord() {


  word_el.innerHTML =

    // `split()` JavaScript'te kullanılan bir dize yöntemidir ve bir diziyi belirli bir ayraca göre parçalarına böler, sonuç olarak bir dize dizisi döndürür.
    // `map()` JavaScript'te kullanılan bir dizi yöntemidir ve her dizi öğesi üzerinde belirli bir işlem yaparak yeni bir dizi oluşturur.
    // `join()` JavaScript'te kullanılan bir dizi yöntemidir ve dizinin öğelerini birleştirerek bir dize oluşturur.
    // --- 1. `selectedWord` dizesi `split("")` ile her harfi ayrı bir dizi elemanı yapılır.
    // 2. `map()` yöntemi, her harf için `<div class="letter">...</div>` şeklinde bir dize oluşturur.
    // 3. `join("")` yöntemi, bu diziyi birleştirerek tek bir dize haline getirir.
    // 4. Elde edilen dize, `word_el.innerHTML` ile `word_el` elementine atanır ve görüntülenir.
    `
    ${selectedWord.split("").map(letter =>
      // `includes()` JavaScript'te kullanılan bir dizi yöntemidir ve bir dizinin belirli bir öğeyi içerip içermediğini kontrol etmek için kullanılır.
      // Bu kod parçası, `correctLetters` dizisinin belirli bir harfi içerip içermediğini kontrol eder ve sonucuna göre ilgili harfi ya da boş bir dize döndürür.
      `
      <div class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
      </div>
    `).join("")}
  `;

  // `replace()` JavaScript'te kullanılan bir dize yöntemidir ve bir dizedeki belirli bir metni başka bir metinle değiştirir.
  // 1. `word_el` elementinin içeriğine erişmek için `innerText` özelliği kullanılır.
  // 2. `replace()` yöntemi, bu içerikteki `\n` (yeni satır) karakterlerini tespit etmek için düzenli bir ifade (`/\n/g`) kullanır.
  // 3. `\n` karakteri, `/` ile başlayıp `g` ile biten bir düzenli ifade olarak temsil edilir. `/` karakterleri arasındaki `\n` ifadesi,
  // metindeki tüm yeni satır karakterlerini belirlemek için kullanılır.
  // 4. `replace()` yöntemi, `\n` karakterlerini boş bir dizeyle (`""`) değiştirir.
  // 5. Sonuç olarak, bu değiştirme işlemi, `w` değişkenine atanır ve `w` değişkeni,
  // yeni satır karakterleri olmadan `word_el` elementinin içeriğini temsil eden bir dizeyi tutar.
  const w = word_el.innerText.replace(/\n/g, "")
  if (w === selectedWord) {
    popup.style.display = "flex"
    message_el.innerText = "Tebrikler kazandınız."
  }
}

function updateWrongLetters() {
  wrongLetters_el.innerHTML = `
  ${wrongLetters.length > 0 ? "<h3>Hatalı Harfler</h3>" : ""}
  ${wrongLetters.map(letter => `<span>${letter}<span>`)}
  `

  // Bu JavaScript kodu, `items` adlı bir diziyi döngüyle gezerek her öğe üzerinde belirtilen işlemi gerçekleştirir. 
  // Döngü her adımda iki parametre alır: `item`, o anki öğeyi temsil eder ve `index`, öğenin dizindeki konumunu belirtir.
  items.forEach((item, index) => {
    const errorCount = wrongLetters.length;
    if (index < errorCount) {
      item.style.display = "block"
    } else {
      item.style.display = "none"
    }
  })
  if (wrongLetters.length === items.length) {
    popup.style.display = "flex"
    message_el.innerText = "Kaybettiniz."
  }
}

btn.addEventListener("click", function () {

  // `splice()` yöntemi, bir JavaScript dizisinde öğe eklemek, çıkarmak veya değiştirmek için kullanılır. Diziyi değiştirir ve silinen öğeleri döndürür.
  // Bu kod, `correctLetters` adlı dizinin tüm öğelerini `splice()` yöntemiyle siler. Dizi boş hale gelir.
  correctLetters.splice(0)
  wrongLetters.splice(0)

  selectedWord = getRandomWord();
  displayWord();
  updateWrongLetters();
  popup.style.display = "none"
})

// `window`, tarayıcıda çalışan JavaScript kodunun ana küresel nesnesidir ve tarayıcı özelliklerine erişimi sağlar.
// `keydown`, tarayıcıda JavaScript kullanarak bir klavye tuşuna basıldığında tetiklenen bir olaydır.
// `window.addEventListener("keydown", function(e){...})`, tarayıcıda klavyeden bir tuşa basıldığında belirtilen işlevi tetikleyen bir olay dinleyici ekler.
window.addEventListener("keydown", function (e) {

  function displayMessage() {
    message.classList.add("show")

    setTimeout(() => {
      message.classList.remove("show")
    }, 2000);
  }

  // `e.keyCode`, klavyeden basılan tuşun ASCII karakter kodunu temsil eder.(Google'da keycode diye aratarak klavye tuşlarınızın kodunu bulabilirsiniz.)
  if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode == 222) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter)
        displayWord();
      } else {
        displayMessage();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter)
        updateWrongLetters();
      } else {
        displayMessage();
      }
    }
  }
})

displayWord();
