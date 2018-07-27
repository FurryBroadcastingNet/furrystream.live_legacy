var invocation = new XMLHttpRequest();
var url = 'https://547f72e6652371c3.mediapackage.us-east-1.amazonaws.com/out/v1/551f7d446def4d069e2bb054160fd46c/';
    
function callOtherDomain(){
  if(invocation) {
    invocation.open('GET', url, true);
    invocation.withCredentials = true;
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}