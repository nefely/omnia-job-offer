let pixelInterval = setInterval(() => {
	console.log("OmniaPixel is enabled");

    const omniapixel = document.createElement('script');
    omniapixel.src = "omniapixel.php";

    document.head.appendChild(omniapixel);

	onOmniaPixelLoad = (func) => {
		clearInterval(pixelInterval);
		omniapixel.addEventListener("load", func, true);
	}
}, 500);
