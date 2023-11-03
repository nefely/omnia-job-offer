$(document).ready(function(){
    const clickid_inputs = document.querySelectorAll('input[name=click_id]');
    const uclick_inputs = document.querySelectorAll('input[name=uclick]');
    const clickapi = document.createElement('script');
    clickapi.src = "click_api.php?getclickid=true&getuclick=true";
    document.head.appendChild(clickapi);

	onClickApiLoad = (func) => {
		clickapi.addEventListener("load", func, true);
	};

	onClickApiLoad(() => {
        for (let i = 0; i < clickid_inputs.length; i++) {
            clickid_inputs[i].value = clickid;  
            console.log(clickid);          
        }
        for (let i = 0; i < uclick_inputs.length; i++) {
            uclick_inputs[i].value = uclick;  
            console.log(uclick);          
        }
	});
})
