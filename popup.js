
const changeColor = document.getElementById("changeColor");
      changeColor.addEventListener('input', setInputValue);

function setInputValue (e) {
  const value = e.target.value
  chrome.runtime.sendMessage({
    method: value
  }, function(response) {});
}
