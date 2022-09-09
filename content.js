

/*-----------------------------------------------------------------------*/

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

const dragDrop=document.querySelector('.two');
      dragDrop.addEventListener('mousemove', onClick);

      function onClick (e) {
          transition();
      }

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
 
  console.log('entireInput', entireInput)
  console.log('selectedIndex', selectedIndex)

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
  const words = ["lizard", "cat", "dog", "dooger", "elephant", "owl"];

  const filteredWords = words.filter(
    (item) => item[0] === word[0] && item[1] === word[1]);
  if(filteredWords){
    tooltiptext.classList.add('tooltip')
  }
  return filteredWords;
}

function renderList(filteredWords) {
  const template = `<ul>
              ${filteredWords.map((item) => `<li>${item}</li>`).join('')}
                   </ul>`;
  content.innerHTML = template;
  return content;
}

/* Mouse move */

function transition () {
  console.log('click in transition')

  // const ball=document.querySelector('.tooltiptext')

tooltiptext.onmousedown = function(event) {

  console.log(event.target)

  let shiftX = event.clientX - tooltiptext.getBoundingClientRect().left;
  let shiftY = event.clientY - tooltiptext.getBoundingClientRect().top;

  tooltiptext.style.position = 'absolute';
  tooltiptext.style.zIndex = 1000;
  document.body.append(tooltiptext);

  moveAt(event.pageX, event.pageY);

  // переносит мяч на координаты (pageX, pageY),
  // дополнительно учитывая изначальный сдвиг относительно указателя мыши
  function moveAt(pageX, pageY) {
    tooltiptext.style.left = pageX - shiftX + 'px';
    tooltiptext.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // передвигаем мяч при событии mousemove
  document.addEventListener('mousemove', onMouseMove);

  // отпустить мяч, удалить ненужные обработчики
  tooltiptext.onmouseup = function() {
    
    document.removeEventListener('mousemove', onMouseMove);
    console.log('remove mouse');

    // ball.onmouseup = null;
  };

};

tooltiptext.ondragstart = function() {
  return false;
};
}

