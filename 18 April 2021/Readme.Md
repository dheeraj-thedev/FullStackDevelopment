


1. Jquery 
    but JavaScrip Library that simplies javaScript

    2. How to add jquery to you html web pages / sites 
        i) CDN
        ii) Download the library with HTML


Explanation on how everything worked :- 


$().ready(   // an Event Handler that says on page load complete
    function(){
        $('#BtnSubmit').click(function(){  // an Event handler that says on click of button
            let number = $('#UName').val();  // we have just got the val 
                                                as we id                              //in javascript with value 
            alert(number);
        })
        
    }
);

    