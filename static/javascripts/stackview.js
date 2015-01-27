// Delete User link click
$('#entryList').on('click', 'a.delentrylink', deleteEntry);
$('#btnNewEntry').on('click', addEntry);

function addEntry(event) {
  event.preventDefault();
  title = $('fieldset#newEntry input#title').val() 
  if(title === ''){
    alert('Please add a title');
  } else {
    var newEntry = {
     'entries':[{
       'title':title,
       'owner':stackid
      }]
    }
    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newEntry),
      url: '/api/entries',
      dataType: 'JSON'
    }).done(function( response ) {
      $('#addUser fieldset input').val('');
      location.reload(true);
    }); 
  }
}

// Delete User
function deleteEntry(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  var confirmation = confirm('Are you sure you want to delete this user?');

  // Check and make sure the user confirmed
  if (confirmation === true) {

    // If they did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/api/entries/' + $(this).attr('rel')
    }).done(function( response ) {
      location.reload(true);
    });

  }
  else {
    // If they said no to the confirm, do nothing
    return false;

  }

};
