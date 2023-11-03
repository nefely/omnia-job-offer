let clickidInterval = setInterval(function (){
    const uclick = getUclick();
    if(uclick != undefined)
    {  
        clearInterval(clickidInterval);

    	const clickid_inputs = document.querySelectorAll('input[name=click_id]');
    	const uclick_inputs = document.querySelectorAll('input[name=uclick]');

        const clickscript = document.createElement('script');
        clickscript.src = "click.php?lp=1&uclick="+uclick+"&"+window.location.search.substr(1);
        document.head.appendChild(clickscript);
        clickscript.onload = function () {
            for (let i = 0; i < clickid_inputs.length; i++) {
            	clickid_inputs[i].value = clickid;  
            	console.log(`clickid: ${clickid}`);          
            }
       	    for (let i = 0; i < uclick_inputs.length; i++) {
            	uclick_inputs[i].value = uclick;  
            	console.log(`uclick: ${uclick}`);          
            }
        };
    }
}, 500)