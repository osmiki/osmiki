let isOpenDrawer02 = false
let isOpenDrawer05 = false
let isOpenDrawer07 = false

function drawer02(){
  if(!isOpenDrawer05){
    $('.section-02').addClass('open-02')
    $('.drawer-02').addClass('slide-02')
    $('.section-logo').addClass('logo-fade')
    isOpenDrawer02 = !isOpenDrawer02
  }else{
    $('.section-02').removeClass('open-02')
    $('.drawer-02').removeClass('slide-02')
    $('.section-logo').removeClass('logo-fade')
    isOpenDrawer02 = !isOpenDrawer02
  }
}
function drawer05(){
  if(!isOpenDrawer05){
    $('.section-05').addClass('open-05')
    $('.drawer-05').addClass('slide-05')
    isOpenDrawer05 = !isOpenDrawer05
  }else{
    $('.section-05').removeClass('open-05')
    $('.drawer-05').removeClass('slide-05')
    isOpenDrawer05 = !isOpenDrawer05
  }
}
function drawer07(){
  if(!isOpenDrawer07){
    $('.section-07').addClass('open-07')
    $('.drawer-07').addClass('slide-07')
    isOpenDrawer07 = !isOpenDrawer07
  }else{
    $('.section-07').removeClass('open-07')
    $('.drawer-07').removeClass('slide-07')
    isOpenDrawer07 = !isOpenDrawer07
  }
}

$(function() {


  //section 08
  let typeBg = $('.section-08')
  let typeInput = $('.type-input')
  typeInput.attr('placeholder', 'TYPE YOUR PASSWORD')
  typeInput.keypress(function(e) {
    if (!e) e = window.event;
    let keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
      if (this.value == "") {
        typeInput.attr('placeholder', 'TYPE YOUR PASSWORD')
      } else {
        // wait for it...
        let colorStr = inputParser(this.value)
        console.log(colorStr);
        bgUpdate(typeBg,colorStr)
      }
    }
  })
  // prevent Korean letter input.
  typeInput.keyup(function(e) {
    if (!(e.keyCode >= 37 && e.keyCode <= 40)) {
      var v = $(this).val()
      $(this).val(v.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi, ''))
    }
  })
})

function inputParser(password) {
  let colorHash = new ColorHash()
  pwLength = password.length

  //Count each elements in given password
  // if there is a character matching with num, append it to the target string variable.

  //initializa again
  numStr = new String()
  upperStr = new String()
  lowerStr = new String()
  specStr = new String()
  numColor = new String()
  upperColor = new String()
  lowerColor = new String()
  specColor = new String()

  for (let i = 0; i < password.length; i++) {
    if (password.charAt(i).match(/\d/g)) {numStr += password.charAt(i).match(/\d/g)}
    if (password.charAt(i).match(/^[A-Z]*$/)) {upperStr += password.charAt(i).match(/^[A-Z]*$/)}
    if (password.charAt(i).match(/^[a-z]*$/)) {lowerStr += password.charAt(i).match(/^[a-z]*$/)}
    if (password.charAt(i).match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi)) {specStr += password.charAt(i).match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi)}
  }

  if (numStr.length > 0) {numColor = colorHash.hex(numStr)}
  if (upperStr.length > 0) {upperColor = colorHash.hex(upperStr)}
  if (lowerStr.length > 0) {lowerColor = colorHash.hex(lowerStr)}
  if (specStr.length > 0) {specColor = colorHash.hex(specStr)}
  rawPwArray = []
  rawPwArray = new Array(numColor, upperColor, lowerColor, specColor)
  // leave elemnets in array that has value that not 0.
  // means now the array has only submitted values.
  pwArray = []
  pwArray = rawPwArray.filter(function(value, index, arr) {
    return value.length > 0
  });
  let colorValue = new String()

  if (pwArray.length > 1) {
    for (let i = 0; i < pwArray.length; i++) {
      colorValue = colorValue + ',' + pwArray[i]
    }
    colorValue = colorValue.slice(1)
  } else {
    colorValue = pwArray[0]
  }
  return colorValue
}

function bgUpdate(bgDiv,colorStr){
  console.log('bg update requested');
  if(typeof colorStr !== 'undefined'){
    if(colorStr.length > 7){
      bgDiv.css('background-image', getCssValuePrefix() + 'linear-gradient(90deg,' + colorStr + ')')
    } else {
      bgDiv.css('background-image', 'none')
      bgDiv.css('background-color', colorStr)
    }
  }
}
function getCssValuePrefix() {
  let prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];
  let rtrnVal = ''; //default to standard syntax
  let tempDom = document.createElement('div');
  for (let i = 0; i < prefixes.length; i++) {
    // Attempt to set the style
    tempDom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';

    // Detect if the style was successfully set
    if (tempDom.style.background) {
      rtrnVal = prefixes[i];
    }
  }

  tempDom = null;
  delete tempDom;
  return rtrnVal;
}
