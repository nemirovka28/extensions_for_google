  const words = {
    "Cat":   ['Dog', 'Rat', 'bat'],
    "Helo":  ['hello', 'Help', 'Hell'],
    "heldp": ['help', 'held', 'hello'],
  };
  
  class Popup {

    substringSelectedIndex;
    substringSelectedWordIndex;
    rowIndex;
    targetElement;
    tooltiptext;
    popup;
    target;
  
    constructor({wordsMap = words } = {}) {
      this.wordsMap = wordsMap;
      this.addEventListeners();
      this.render();
    }
  
    addEventListeners(){
      console.log('addEventListeners');
      document.addEventListener("mouseup", this.SelectedTriggerElem);
      document.addEventListener('keydown', (e) => e.code === 'Space' ? this.SelectedTriggerElem(e) : null );
      document.addEventListener('keyup', (e) => this.switchCase(e) );
    }

    switchCase = (e) => {
      switch (e.code) {
        case 'ArrowLeft':
            return this.SelectedTriggerElem(e)
        case 'ArrowRight':
            return this.SelectedTriggerElem(e)
        case 'ArrowUp':
            return this.SelectedTriggerElem(e)
        case 'ArrowDown':
            return this.SelectedTriggerElem(e)
        default: null      
      }
    }

    SelectedTriggerElem = (event) => {
      console.log('SelectedTriggerElem');
      this.target = event.target.closest("input[type=text]")
                || event.target.closest("textarea")
                || event.target.closest("[contenteditable='true']");
      this.triggerElem(this.target);
    }
  
    render() {
      console.log('render');
      this.target = document.querySelector('input')
                    .insertAdjacentHTML('afterend',`<div class="tooltiptext"><div class="popup__content"></div><span class="close">X</span></div>`);
  
      const close = document.querySelector('.close');
      close.addEventListener('click', this.onClickClose);
  
      this.popup = document.querySelector('.popup__content');
      this.popup.addEventListener("click", this.getWordPopup);
    }
  
    onClickClose = (e) => {
      this.tooltiptext.style.visibility = 'hidden';
    }
  
    triggerElem = (target) => {
      this.tooltiptext = document.querySelector(".tooltiptext");
  
      if(target){
        this.targetElement = target;
  
        const selectedIndex = target.selectionStart || document.getSelection().anchorOffset;
        let entireInput = null;
  
        if(target.selectionStart) {
          entireInput = target.value;
        } else {
          entireInput = this.targetElement.textContent;
        }
  
        const {substringSelectedIndex, substring, rowIndex} = this.getSelectedSubstring(selectedIndex, entireInput);
        const {
          selectedWord:       selectedSubstringWord,
          selectedWordIndex:  substringSelectedWordIndex,
        } = this.getSelectedWord(substringSelectedIndex, substring);
        
        this.rowIndex = rowIndex;
        this.substringSelectedIndex = substringSelectedIndex;
        this.substringSelectedWordIndex = substringSelectedWordIndex;
  
          if (selectedSubstringWord) {
            const suggestionWords = this.wordsMap[selectedSubstringWord] ?? [];
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
  
    getSelectedSubstring(selectedIndex, entireInput) {
      const substrings = entireInput.split("\n").reduce( (acc, substring, index) => {
        acc[index] = {
                  length:     substring.length,
                  startsFrom: acc[index - 1]?.length+acc[index - 1]?.startsFrom+1 || 0,
                  substring:  substring,
                    };
          return acc;
        },[]);
      const rowIndexElem = substrings.findIndex((substr) => substr.startsFrom >= selectedIndex );
      const rowIndex = rowIndexElem > 0 ? rowIndexElem : substrings.length;
      const { substring, startsFrom } = substrings[rowIndex-1];
      const substringSelectedIndex = selectedIndex - startsFrom;
      return { substring, substringSelectedIndex, rowIndex };
    }
  
    getWordPopup = (e) => {
      const target = e.target.closest("li");
  
      if (target) {
        const entireInput = this.targetElement.value || this.targetElement.textContent;
        const substrings = entireInput.split('\n');
        const substring = substrings[this.rowIndex-1];
        const substringWords = substring.split(' ');
        substringWords[this.substringSelectedWordIndex] = target.textContent;
        const finalString = substrings.map( (item, index) => {
          if(index === this.rowIndex-1){
            return substringWords.join(' ');
          } else{
           return item;
          }
      }).join('\n');
      this.tooltiptext.style.visibility = 'hidden';
      this.targetElement.value
        ? this.targetElement.value = finalString
        : this.targetElement.textContent = finalString
      this.targetElement.focus();
    }
  }
  
  getSelectedWord(selectedIndex, substring="") {
    console.log('substring',substring);
    const leftArr = substring.slice(0,selectedIndex).split(' ');
    const left = leftArr[leftArr.length - 1];

    const rightArr = substring.slice(selectedIndex).split(" ");
    const right = rightArr[0];

    const selectedWord = (left+right).trim();
    const selectedWordIndex = leftArr.length - 1;
    console.log('selectedWord:', selectedWord);
    return { selectedWord, selectedWordIndex };

  }
}

const main = new Popup();

  window.onmousemove = moveElem;
  window.onmouseup = stopMovingElem;
  window.onload = init;
    let selected = null; //element to move
    let oldMouseX, oldMouseY; // Stores the x and y coordinates of the mouse pointer
    let elemX, elemY;
  function init() {
      document.querySelector('.tooltiptext').onmousedown = function (evt) {
          dragInit(evt);
      };
  }
  function dragInit(evt) {
      selected = evt.target;
      elemX = selected.offsetLeft;
      elemY = selected.offsetTop;
      oldMouseX = evt.clientX;
      oldMouseY = evt.clientY;
  }
  function moveElem(e) {
      const newMouseX = e.clientX;
      const newMouseY = e.clientY;
      let dx = newMouseX;
      let dy = newMouseY;
      if(oldMouseX !== undefined) {
          dx = newMouseX - oldMouseX;
          dy = newMouseY - oldMouseY;
       }
      if (selected !== null) {  
          changePosOfSelectedElement(dx, dy);
      }
      oldMouseX = newMouseX;
      oldMouseY = newMouseY;
  }
  function changePosOfSelectedElement(dx, dy) {
    elemX += dx;
    elemY += dy;
    selected.style.left = elemX + 'px';
    selected.style.top = elemY + 'px';
  }
  function stopMovingElem() {
      selected = null;
  }