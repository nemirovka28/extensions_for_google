/*-----------------------------------------------------------------------*/
const iframe = document.getElementsByTagName('iframe')[0];
console.log(iframe)

// console.log(iframe.onload)
//       iframe.onload = function() {
//         const iframeDocument = iframe;
//         console.log(iframeDocument)
//       };

/*---------------------------------------------------------------------------------- */

// const value = async function getCurrentTab() {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }

// chrome.runtime.onMessage.addListener(function(message) {
//   console.log(message.method);
//   });

// console.log(value)

/*---------------------------------------------------------------------------------- */

let wordIndex = undefined;
const words = {
  "Cat":['Dog', 'Rat', 'bat'],
  "Helo":['hello', 'Help', 'Hell'],
  "heldp":['help', 'held', 'hello'],
};

const input = document.querySelector('input'); // -> contenteditable elements, input[type=text]
input.insertAdjacentHTML('afterend',`<div class="tooltiptext"><div class="popup__content"></div><span class="close">X</span></div>`);
input.addEventListener("mouseup", triggerInput); // event 'mouseup' -> 'selectionchange', check later
input.addEventListener('keydown', (e) => e.code === 'Space' ? triggerInput(e) : null );

const tooltiptext = document.querySelector(".tooltiptext");

const popup = document.querySelector('.popup__content');
popup.addEventListener("click", (e) => {
  const target = e.target.closest("li");
  if (target) {
    const entireInputArr = input.value.split(" ");
    if(wordIndex >= 0) {
      entireInputArr[wordIndex] = target.textContent;
      input.value = entireInputArr.join(" ");
      tooltiptext.classList.add('tooltip__hidden');
    }
  }
});

const close = document.querySelector('.close');
      close.addEventListener('click', onClickClose);

function onClickClose (e) {
  console.log('click',e)
  tooltiptext.classList.add('tooltip__hidden');
}

/* ---------------------search for click mouse------------------------ */

function triggerInput(event) {
  const selectedIndex = input.selectionStart;
  const entireInput = event.target.value;
  console.log('entireInput',entireInput);
  const {selectedWord, selectedWordIndex} = getSelectedWord(selectedIndex, entireInput);
  wordIndex = selectedWordIndex;
  console.log('selectedWord',selectedWord);

  if (selectedWord) {
    const suggestionWords = words[selectedWord] ?? [];
    console.log('suggestionWords',suggestionWords);
  
    if(suggestionWords.length) {
      tooltiptext.style.visibility = 'visible';
      popup.innerHTML = (
        `<ul>
          ${suggestionWords.map((item) => `<li>${item}</li>`).join('')}
        </ul>`
      );
    } else {
      tooltiptext.style.visibility = 'hidden';
    }
  }
}

function getSelectedWord(selectedIndex, entireInput) {
  const leftArr = entireInput.slice(0, selectedIndex).split(" ");
  const left = leftArr[leftArr.length - 1];
  const rightArr = entireInput.slice(selectedIndex).split(" ");
  const right = rightArr[0];
  return {selectedWord: left + right, selectedWordIndex: leftArr.length - 1 };
}

/* ---------------------- Mouse move --------------------------- */

    window.onmousemove = moveElem;
    window.onmouseup = stopMovingElem;
    window.onload = init;

      let selected = null; //элемент для перемещения
      let oldMouseX, oldMouseY; // Сохраняет координаты x и y указателя мыши
      let elemX, elemY;
      
    function init() {
        document.querySelector('.tooltiptext').onmousedown = function (evt) {
            dragInit(evt);
        };
    }
      
    // Будет вызван, когда пользователь начнет перетаскивать элемент
    function dragInit(evt) {
        // Хранить элемент
        selected = evt.target;
        elemX = selected.offsetLeft;
        elemY = selected.offsetTop;
      
        oldMouseX = evt.clientX;
        oldMouseY = evt.clientY;
    }
    
    // Будет вызываться при перетаскивании пользователем элемента
    function moveElem(e) {
        // новая позиция мыши
        const newMouseX = e.clientX;
        const newMouseY = e.clientY;
        let dx = newMouseX;
        let dy = newMouseY;
      
        if(oldMouseX !== undefined) {
            // сколько пикселей мы двигали мышью?
            dx = newMouseX - oldMouseX;
            dy = newMouseY - oldMouseY;
         }
        
        if (selected !== null) {  
            // переместить выделенный элемент на dx, dy пикселей хозонтально / вертикально
            changePosOfSelectedElement(dx, dy);
        }
      
        // обновить старую позицию мыши
        oldMouseX = newMouseX;
        oldMouseY = newMouseY;
    }
    
    function changePosOfSelectedElement(dx, dy) {
      // обновить старую позицию выбранного элемента
      elemX += dx;
      elemY += dy;
      
      // изменить позицию элемента на экране 
      // изменив его CSS свойства left / top
      selected.style.left = elemX + 'px';
      selected.style.top = elemY + 'px';
    }
    
    // Уничтожить объект, когда мы закончим
    function stopMovingElem() {
        selected = null;
    }

  

