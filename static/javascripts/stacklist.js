// Delete User link click
$('#stackList').on('click', 'a.delstacklink', deleteStack);
$('#btnNewStack').on('click', addStack);

function addStack(event) {
  event.preventDefault();
  name = $('fieldset#newStack input#name').val() 
  if(name === ''){
    alert('Please add a name');
  } else {
    var newStack = {
     'stacks':[{
       'name':name,
       'color':$('fieldset#newStack select#color').val()
      }]
    }
    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newStack),
      url: '/api/stacks',
      dataType: 'JSON'
    }).done(function( response ) {
      $('#addUser fieldset input').val('');
      location.reload(true);
    }); 
  }
}

// Delete User
function deleteStack(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  var confirmation = confirm('Are you sure you want to delete this stack?');

  // Check and make sure the user confirmed
  if (confirmation === true) {

    // If they did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/api/stacks/' + $(this).attr('rel')
    }).done(function( response ) {
      location.reload(true);
    });

  }
  else {
    // If they said no to the confirm, do nothing
    return false;

  }

};
