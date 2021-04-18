## What is jQuery?
#### jQuery is a lightweight, "write less, do more", JavaScript library. The purpose of jQuery is to make it much easier to use JavaScript on your website. jQuery takes a lot of common tasks that require many lines of JavaScript code to accomplish, and wraps them into methods that you can call with a single line of code. jQuery also simplifies a lot of the complicated things from JavaScript, like AJAX calls and DOM manipulation.

The jQuery library contains the following features:
- HTML/DOM manipulation
- CSS manipulation
- HTML event methods
- Effects and animations
- AJAX
- Utilities


#### It is solves the purpose for which JavaScript is being used but i has many advantages, like it shortens the login we write additionaly it works on selectors that provides much flexibility while modifying or manipulation or quering the real dom from the browser 

### How can I use Jquery on my HTML to practice the same ?

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

    
