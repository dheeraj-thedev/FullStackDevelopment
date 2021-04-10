### Important Links for Discussion - difference between block level or inline

https://stackoverflow.com/questions/1714121/block-level-elements-inside-inline-elements#:~:text=An%20element%20defined%20as%20a,%3B%22%3ELorem...&text=The%20will%20still%20be,in%20the%20eyes%20of%20HTML.


### As per W3c we should not create a block level element in an inline element 

https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements#:~:text=You%20can't%20put%20block,can%20be%20changed%20using%20CSS).

### Image on error  
  onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals';"

### Cross Origin attribute

https://stackoverflow.com/questions/25898035/html-crossorigin-attribute-for-img-tag

<iframe src="demo_iframe_sandbox_form.htm" sandbox="allow-forms">
  <p>Your browser does not support iframes.</p>
</iframe>

demo_iframe_sandbox_form.htm

<!-- No sandbox there... Popup window won't be sandboxed as well -->
<iframe id="red" src="iframe.html"></iframe>

<!-- This sandboxed frame will allow sandboxed popup window to open popups
     but not to execute JavaScript for instance. -->
<iframe id="green" src="iframe.html" sandbox="allow-popups"></iframe>

<!-- This sandboxed frame will create a clean non sandboxed popup window,
     allowed to execute JavaScript and open popups. -->
<iframe id="blue" src="iframe.html"
        sandbox="allow-popups allow-popups-to-escape-sandbox"></iframe>

### 
https://googlechrome.github.io/samples/allow-popups-to-escape-sandbox/

### SeamLess is not suported by browsers
https://stackoverflow.com/questions/29125274/is-there-an-alternative-to-the-seamless-attribute-that-works-in-all-browsers





![blockvsInline](https://user-images.githubusercontent.com/32265439/111888866-79a18f00-8a06-11eb-9504-22a0329d745d.png)



### form encoding 

application/x-www-form-urlencoded	Default. All characters are encoded before sent (spaces are converted to "+" symbols, and special characters are converted to ASCII HEX values)
multipart/form-data	No characters are encoded. This value is required when you are using forms that have a file upload control
text/plain	Spaces are converted to "+" symbols, but no special characters are encoded


### Git Push Existing Repo

…or create a new repository on the command line
echo "# MyFirstHtmlProj" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/dheeraj-thedev/MyFirstHtmlProj.git
git push -u origin main

## Existing

…or push an existing repository from the command line
git remote add origin https://github.com/dheeraj-thedev/MyFirstHtmlProj.git
git branch -M main
git push -u origin main


