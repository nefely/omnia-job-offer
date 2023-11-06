$(document).ready(function(){
    const pixelInterval = setInterval(() => {
        let pixelLoaded = false;

        if(!pixelLoaded) {
            clearInterval(pixelInterval);

            console.log("OmniaPixel is enabled");

            const uclickCookie = (document.cookie.match(/^(?:.*;)?\s*uclick\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];
            const uclickParam = uclickCookie ? "&uclick=" + uclickCookie : "";

            const omniapixel = document.createElement('script');
            omniapixel.src = "omniapixel.php?" + window.location.search.substring(1) + uclickParam;

            document.head.appendChild(omniapixel);

            onOmniaPixelLoad = (func) => omniapixel.addEventListener("load", func, true);
        
            onOmniaPixelLoad(() => {

                (pixelData['cookies']||[]).forEach(cookie => {
                    document.cookie = cookie;
                });

                const clickid_inputs = document.querySelectorAll('input[name=click_id]');
                const uclick_inputs = document.querySelectorAll('input[name=uclick]');

                uclick_inputs.forEach(input => { input.value = pixelData?.data?.uclick; console.log(pixelData?.data?.uclick); });
                clickid_inputs.forEach(input => { input.value = pixelData?.data?.clickid; console.log(pixelData?.data?.clickid); });
            })
            pixelLoaded = true;
        }
    }, 500);
});
