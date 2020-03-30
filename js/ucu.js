// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces benween words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not include bad language: ugly, dumm, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,

function validateLength(fieldNode, fieldErrors, minn, maxx, type) {
  let error = false;
  let errorMessage;
  if (!maxx) {
    if (fieldNode.value.length < minn) {
      error = true;
      errorMessage = type + " is too short";
    }
  }
  else if (!minn) {
      if (fieldNode.value.length > maxx) {
        error = true;
        errorMessage = type + " is too long";
      }
  }
  else {
    if (fieldNode.value.length < minn){
      error = true;
      errorMessage = type + " is too short";
    }
    else if (fieldNode.value.length > maxx){
      error = true;
      errorMessage = type + " is too long";
    }
  }
  if (error) {
    let li = document.createElement('li');
    li.innerText = errorMessage;
    fieldErrors.appendChild(li);
  }
}


function validateMatch(fieldNode, fieldErrors, regExp, type) {
  if (!fieldNode.value.match(regExp)) {
    let li = document.createElement('li');
    li.innerText = type + ' format is incorrect';
    fieldErrors.appendChild(li);
  }
}


function validateEmail(event) {
  let emailNode;
  if (event['type'] == 'change')
    emailNode = event.target;
  else
    emailNode = event.target.elements['email'];
  const emailErrorNode = emailNode.parentNode.querySelector('p.help-block');
  emailErrorNode.innerHTML = '';

  let emailErrors = document.createElement('ul');
  emailErrors.setAttribute("role", "alert");

  validateLength(emailNode, emailErrors, 5, 50, "Email")

  validateMatch(emailNode, emailErrors, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email");

  if (emailErrors.childElementCount > 0) {
    emailErrorNode.appendChild(emailErrors);
    return false;
  }
  return true;
}


function validateName(event) {
  let nameNode;
  if (event['type'] == 'change')
    nameNode = event.target;
  else
    nameNode = event.target.elements['name'];
  const nameErrorNode = nameNode.parentNode.querySelector('p.help-block');
  nameErrorNode.innerHTML = '';

  let nameErrors = document.createElement('ul');
  nameErrors.setAttribute("role", "alert");

  validateLength(nameNode, nameErrors, 1, null, "Name");

  if (nameNode.value.split(" ").length - 1 !== 0 && nameNode.value.split(" ").length - 1 !== 2) {
    let li = document.createElement('li');
    li.innerText = 'Name should contain 0 or 2 whitespaces';
    nameErrors.appendChild(li)
  }

  if (nameErrors.childElementCount > 0) {
    nameErrorNode.appendChild(nameErrors);
    return false;
  }
  return true;
}


function validatePhone(event) {
  let phoneNode;
  if (event['type'] == 'change')
    phoneNode = event.target;
  else
    phoneNode = event.target.elements['phone'];
  const phoneErrorNode = phoneNode.parentNode.querySelector('p.help-block');
  phoneErrorNode.innerHTML = '';

  let phoneErrors = document.createElement('ul');
  phoneErrors.setAttribute("role", "alert");

  validateMatch(phoneNode, phoneErrors, /^[\+|0](38)[0]\(?\d{2}\)?[\ -]?\d{3}[\ -]?\d{2}[\ -]?\d{2}/,
      "Phone");

  if (phoneErrors.childElementCount > 0) {
    phoneErrorNode.appendChild(phoneErrors);
    return false;
  }
  return true;
}


function validateMessage(event) {
  let messageNode;
  if (event['type'] == 'change')
    messageNode = event.target;
  else
    messageNode = event.target.elements['message'];
  const messageErrorNode = messageNode.parentNode.querySelector('p.help-block');
  messageErrorNode.innerHTML = '';

  let messageErrors = document.createElement('ul');
  messageErrors.setAttribute("role", "alert");

  validateLength(messageNode, messageErrors, 10, null, "Message");

  const badLanguage = ["ugly", "dumb", "stupid", "pig", "ignorant"];

  if (badLanguage.some(word => messageNode.value.includes(word))){
    let li = document.createElement('li');
    li.innerText = 'Message should not include bad language';
    messageErrors.appendChild(li)
  }

  if (messageErrors.childElementCount > 0) {
    messageErrorNode.appendChild(messageErrors);
    return false;
  }
  return true;
}


function validateMe(event){
  event.preventDefault();

  let validate = validateEmail(event) && validateName(event) && validatePhone(event) && validateMessage(event);
  if (validate) {
    event.target.submit();
  }
  return validate;
}


