$(document).ready(function(){
	console.log("OmniaPixel is enabled");

        const omniapixel = document.createElement('script');
        omniapixel.src = "omniapixel.php";

        document.head.appendChild(omniapixel);

	onOmniaPixelLoad = (func) => omniapixel.addEventListener("load", func, true);
})
