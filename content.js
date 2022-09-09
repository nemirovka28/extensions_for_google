

/*-----------------------------------------------------------------------*/
// const iframe = document.getElementsByTagName('iframe')[0];

//       iframe.onload = function() {
//         const iframein = document.getElementsByTagName('iframe')[0];
//         const body = iframein.contentWindow.document;
//         console.log('body',body);
//       };


const input = document.querySelector('input');

input.insertAdjacentHTML('afterend',`<div class="tooltiptext"><div class="two">two</div><div class="popup__content"></div><span class="close">X</span></div>`);
input.addEventListener("mouseup", mouseClick);
const tooltiptext = document.querySelector(".tooltiptext");
const content = document.querySelector('.popup__content');

const close = document.querySelector('.close');
      close.addEventListener('click', onClickClose);

function onClickClose (e) {
  console.log('click',e)
  tooltiptext.classList.add('tooltip__hidden');
}

// функция для перемещения вспывающего окна


/* ---------------------search for click key------------------------ */

input.addEventListener('keydown', (e) => {

    if (e.code === 'Space') {
        mouseClick(e)
    }

});

/* ---------------------search for click mouse------------------------ */

function mouseClick(event) {

  const selectedIndex = input.selectionStart;
  const entireInput = event.target.value;

  const word = getSelectedWord(selectedIndex, entireInput);

  if (word) {

    const filteredWords = searchWord(word);
    const content = renderList(filteredWords);
        content.addEventListener("click", (e) => {
   
      const target = e.target.closest("li");
      if (target) {
        const entireInputArr = entireInput.split(" ");
       
        const selectedWordIndex = entireInputArr.findIndex(item => item === word);
        
        entireInputArr[selectedWordIndex] = target.textContent;
        event.target.value = entireInputArr.join(" ");
      }
    });
  }
}

function getSelectedWord(selectedIndex, entireInput) {
  const leftArr = entireInput.slice(0, selectedIndex).split(" ");
  const left = leftArr[leftArr.length - 1];
  const rightArr = entireInput.slice(selectedIndex).split(" ");
  const right = rightArr[0];
  const word = left + right;
  console.log(word)
  return word;
}

function searchWord(word) {

  tooltiptext.classList.remove('tooltip__hidden');

  const words = {
                    "Cat":['Dog', 'Rat', 'bat'],
                    "Helo":['hello', 'Help', 'Hell'],
                    "heldp":['help', 'held', 'hello'],
                };
  const filteredWords = words[word] 

  if(filteredWords)  tooltiptext.classList.add('tooltip')
 
  return filteredWords;
}

function renderList(filteredWords) {
  if(!filteredWords) return 
  const template = `<ul>
              ${filteredWords.map((item) => `<li>${item}</li>`).join('')}
                   </ul>`;
  content.innerHTML = template;
  return content;
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

  

