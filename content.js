
// /*---------------------------------------------------------------------------------- */

// // const value = async function getCurrentTab() {
// //   let queryOptions = { active: true, lastFocusedWindow: true };
// //   let [tab] = await chrome.tabs.query(queryOptions);
// //   return tab;
// // }

// // chrome.runtime.onMessage.addListener(function(message) {
// //   console.log(message.method);
// //   });

// // console.log(value)

// /*---------------------------------------------------------------------------------- */

// let wordIndex = undefined;
// let targetItem = undefined;

// console.log('targetItem',targetItem);
// const words = {
//   "Cat":['Dog', 'Rat', 'bat'],
//   "Helo":['hello', 'Help', 'Hell'],
//   "heldp":['help', 'held', 'hello'],
// };

// const input = document.querySelector('input'); // -> contenteditable elements, input[type=text]
// input.insertAdjacentHTML('afterend',`<div class="tooltiptext"><div class="popup__content"></div><span class="close">X</span></div>`);
// document.addEventListener("click", triggerInput); // event 'mouseup' -> 'selectionchange', check later
// document.addEventListener('keydown', (e) => e.code === 'Space' ? triggerInput(e) : null );

// const tooltiptext = document.querySelector(".tooltiptext");

// const popup = document.querySelector('.popup__content');

// popup.addEventListener("click", (e) => {
  // const target = e.target.closest("li");
  // if (target) {
  //   const entireInputArr = targetItem.value || targetItem.textContent;
  //   let arr = entireInputArr.split(" ");
  //   console.log('arr',arr);
  //   if(wordIndex >= 0) {
  //     arr[wordIndex] = target.textContent;
  //     targetItem.value = arr.join(" ")
  //     targetItem.textContent = arr.join(" ");
  //     tooltiptext.style.visibility = 'hidden';
  //     targetItem.focus();
  //   }
  // }
// });

// const close = document.querySelector('.close');
//       close.addEventListener('click', onClickClose);

// function onClickClose (e) {

//   tooltiptext.style.visibility = 'hidden';
// }

// /* ---------------------search for click mouse------------------------ */

//  function triggerInput(event) {

//   console.log('event.code',event.code);

  // const target = event.target.closest("input[type=text]")
  //             || event.target.closest("textarea")
  //             || event.target.closest("[contenteditable='true']");
  // if(target){
  // targetItem = target;
  // const selectedIndex = target.selectionStart || document.getSelection().anchorOffset;
  // let entireInput = null;
  //   if(target.selectionStart) {
  //     entireInput =  event.target.value;
  //     console.log('entireInput', entireInput);
  //     } else {
  //       entireInput = targetItem.textContent;
  //       console.log('entireInput', entireInput);
  //     }
  // const {selectedWord, selectedWordIndex} = getSelectedWord(selectedIndex, entireInput);
  // wordIndex = selectedWordIndex
  // if (selectedWord) {
  //   console.log('selectedWord',selectedWord);
  //   const suggestionWords = words[selectedWord] ?? [];
  //   if(suggestionWords.length) {
  //     tooltiptext.style.visibility = 'visible';
  //     popup.innerHTML = (
  //       `<ul class="list">
  //         ${suggestionWords.map((item) => `<li class="list__item">${item}</li>`).join('')}
  //       </ul>`
  //     );
  //     } else {
  //       tooltiptext.style.visibility = 'hidden';
  //     }
  //   }
  // }
// }

// function getSelectedWord(selectedIndex, entireInput) {
//   const leftArr = entireInput.slice(0, selectedIndex).split(' ');
//   const left = leftArr[leftArr.length - 1];
//   console.log('left',left);
//   const rightArr = entireInput.slice(selectedIndex).split(' ');
//   const right = rightArr[0];
//   console.log('right',right);
//   return {selectedWord: left + right, selectedWordIndex: leftArr.length - 1 };
// }

// /* ---------------------- Mouse move --------------------------- */

//     window.onmousemove = moveElem;
//     window.onmouseup = stopMovingElem;
//     window.onload = init;

//       let selected = null; //элемент для перемещения
//       let oldMouseX, oldMouseY; // Сохраняет координаты x и y указателя мыши
//       let elemX, elemY;
      
//     function init() {
//         document.querySelector('.tooltiptext').onmousedown = function (evt) {
//             dragInit(evt);
//         };
//     }
      
//     // Будет вызван, когда пользователь начнет перетаскивать элемент
//     function dragInit(evt) {
//         // Хранить элемент
//         selected = evt.target;
//         elemX = selected.offsetLeft;
//         elemY = selected.offsetTop;
      
//         oldMouseX = evt.clientX;
//         oldMouseY = evt.clientY;
//     }
    
//     // Будет вызываться при перетаскивании пользователем элемента
//     function moveElem(e) {
//         // новая позиция мыши
//         const newMouseX = e.clientX;
//         const newMouseY = e.clientY;
//         let dx = newMouseX;
//         let dy = newMouseY;
      
//         if(oldMouseX !== undefined) {
//             // сколько пикселей мы двигали мышью?
//             dx = newMouseX - oldMouseX;
//             dy = newMouseY - oldMouseY;
//          }
        
//         if (selected !== null) {  
//             // переместить выделенный элемент на dx, dy пикселей хозонтально / вертикально
//             changePosOfSelectedElement(dx, dy);
//         }
      
//         // обновить старую позицию мыши
//         oldMouseX = newMouseX;
//         oldMouseY = newMouseY;
//     }
    
//     function changePosOfSelectedElement(dx, dy) {
//       // обновить старую позицию выбранного элемента
//       elemX += dx;
//       elemY += dy;
      
//       // изменить позицию элемента на экране 
//       // изменив его CSS свойства left / top
//       selected.style.left = elemX + 'px';
//       selected.style.top = elemY + 'px';
//     }
    
//     // Уничтожить объект, когда мы закончим
//     function stopMovingElem() {
//         selected = null;
//     }

  const words = {
    "Cat":['Dog', 'Rat', 'bat'],
    "Helo":['hello', 'Help', 'Hell'],
    "heldp":['help', 'held', 'hello'],
  };

  class Popup {

    wordIndex;
    targetElement;
    tooltiptext;
    popup;

    constructor({wordsMap = words } = {}) {
      this.wordsMap = wordsMap;
      this.render();
      this.addEventListeners();
  }

    render(){
      console.log('render');
      const input = document.querySelector('input')
      input.insertAdjacentHTML('afterend',`<div class="tooltiptext"><div class="popup__content"></div><span class="close">X</span></div>`);
      this.popup = document.querySelector('.popup__content');
            this.popup.addEventListener("click", this.getWordPopup);
    }
    addEventListeners(){
      console.log('addEventListeners');
      document.addEventListener("mouseup", this.triggerInput);
      document.addEventListener('keydown', (e) => e.code === 'Space' ? this.triggerInput(e) : null );
    }

    triggerInput = (event) => {
      const target = event.target.closest("input[type=text]")
                    || event.target.closest("textarea")
                    || event.target.closest("[contenteditable='true']");
      this.tooltiptext = document.querySelector(".tooltiptext");
      if(target){
      this.targetElement = target;
      const selectedIndex = target.selectionStart || document.getSelection().anchorOffset;
      let entireInput = null;
      if(target.selectionStart) {
        entireInput = event.target.value;
        } else {
          entireInput = this.targetElement.textContent;
        }
      const {selectedWord, selectedWordIndex} = this.getSelectedWord(selectedIndex, entireInput);
      this.wordIndex = selectedWordIndex;
      if (selectedWord) {
        const suggestionWords = this.wordsMap[selectedWord] ?? [];
        if(suggestionWords.length) {
          this.tooltiptext.style.visibility = 'visible';
          this.popup.innerHTML = (
            `<ul class="list">
              ${suggestionWords.map((item) => `<li class="list__item">${item}</li>`).join('')}
            </ul>`
          );
        } else {
          this.tooltiptext.style.visibility = 'hidden';
        }
      }
    }
  }
  getWordPopup = (e) => {
    const target = e.target.closest("li");
    if (target) {
      const entireInputArr = this.targetElement.value ||  this.targetElement.textContent;
      let arr = entireInputArr.split(" ");
      if(this.wordIndex >= 0) {
        arr[this.wordIndex] = target.textContent;
        // this.targetElement.value = arr.join(" ");
        this.targetElement.textContent = arr.join(" ");
        this.tooltiptext.style.visibility = 'hidden';
        this.targetElement.focus();
      }
    }
  }
    getSelectedWord(selectedIndex, entireInput) {
      const leftArr = entireInput.slice(0, selectedIndex).split(" ");
      const left = leftArr[leftArr.length - 1];
      console.log('left',left);
      const rightArr = entireInput.slice(selectedIndex).split(" ");
      const right = rightArr[0];
      console.log('right',right);
      return {selectedWord: left + right, selectedWordIndex: leftArr.length - 1 };
    }
  }

  let main = new Popup();

  main.render()