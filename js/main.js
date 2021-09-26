function listenInputChanges(field) {
  field.addEventListener('input', function() {
    removeInvalidStatus(field);
  });
}

function removeInvalidStatus(field) {
  if (field.classList.contains('form-field-invalid')) {
    field.classList.remove('form-field-invalid')
  }
}




var overlay = document.querySelector('.modal-overlay');

// Работа с формой входа

var popupForm = document.querySelector('.modal-content-form');

if (popupForm) {

  var openForm = document.querySelector('.login-btn');
  var loginForm = popupForm.querySelector('.login-form');
  var loginFormFields = document.querySelectorAll('.login-form-field');

  var closeForm = document.createElement('button');
  closeForm.classList.add('modal-content-close');
  closeForm.type = 'button';
  popupForm.appendChild(closeForm);


  openForm.addEventListener('click', function(event) {
    var focusFieldNum = 0;

    event.preventDefault();

    overlay.classList.add('modal-overlay-show');
    popupForm.classList.remove('modal-content-form-error');
    popupForm.classList.add('modal-content-form-show');

    for (var i = 0; i < loginFormFields.length; i++) {
      loginFormFields[i].classList.remove('form-field-invalid');

      if ( !loginFormFields[i].value && (loginFormFields[focusFieldNum] != document.activeElement) && (i >= focusFieldNum) ) {
        focusFieldNum = i;
        loginFormFields[focusFieldNum].focus();
      }
    }
  });


  loginForm.addEventListener('submit', function(event) {
    var invalidFieldNum = 0;

    for (var i = 0; i < loginFormFields.length; i++) {
      if (!loginFormFields[i].value) {
        event.preventDefault();
        loginFormFields[i].classList.add('form-field-invalid');

        if ( (loginFormFields[invalidFieldNum] != document.activeElement) && (i >= invalidFieldNum) ) {
          invalidFieldNum = i;
          loginFormFields[invalidFieldNum].focus();
        }

        popupForm.classList.remove('modal-content-form-error');
        setTimeout(function() {
          popupForm.classList.add('modal-content-form-error')
        }, 1);
      }
    }
  });


  for (var i = 0; i < loginFormFields.length; i++)  {
    listenInputChanges(loginFormFields[i]);
  }


  closeForm.addEventListener('click', function(event) {
    event.preventDefault();
    overlay.classList.remove('modal-overlay-show');
    popupForm.classList.remove('modal-content-form-show');
  });

  overlay.addEventListener('click', function(event) {
    event.preventDefault();
    overlay.classList.remove('modal-overlay-show');
    popupForm.classList.remove('modal-content-form-show');
  });

  window.addEventListener('keydown', function(event) {
    if (event.keyCode === 27) {
      overlay.classList.remove('modal-overlay-show');
      popupForm.classList.remove('modal-content-form-show');
    }
  });

}
