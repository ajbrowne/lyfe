Parse.initialize("BnGiWDWDjLiOakfubnazWrs60ToHwgHy40lspsjt", "0xW4A6mq0vl0H29GaApu9xHu9MBaARcua2pB6Bur");

  var currentUser = Parse.User.current();

  if(currentUser == null){
    window.location.replace('./index.html');
  }
