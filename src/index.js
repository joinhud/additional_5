module.exports = function check(str, bracketsConfig) {
  var strLength = str.length;
  var bracketsConfigCount = bracketsConfig.length;
  var bracketsStack = [];
  var i = 0;
  
  while (i < strLength) {
    var bracket = str[i];
    var j = 0;

    while (j < bracketsConfigCount) {
      var bracketIndex = bracketsConfig[j].lastIndexOf(bracket);
      
      if (bracketIndex >= 0) {
        if (isOpenLineBracket(bracketsConfig[j], bracket, bracketsStack) || bracketIndex === 0) {
          bracketsStack.push(bracket);
          break;
        }
        
        if (isCloseLineBracket(bracketsConfig[j], bracket, bracketsStack) || bracketIndex === 1) {
          if (bracketsStack.pop() !== bracketsConfig[j][0]) {
            return false;
          }
          break;
        }
      }

      j++;
    }

    i++;
  }

  return bracketsStack.length === 0;
}

function isCloseLineBracket(configPair, bracket, stack) {
  return isLineBracket(configPair) && stack.indexOf(bracket) > 0;
}

function isOpenLineBracket(configPair, bracket, stack) {
  return isLineBracket(configPair) && stack.indexOf(bracket) < 0;
}

function isLineBracket(configPair) {
  return configPair[0] === configPair[1];
}
