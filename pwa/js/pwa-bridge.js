(function () {
    var STORAGE_KEY = "om-storage-token";
    var deferredInstallPrompt = null;

    function safeTrackCustom(eventName, payload) {
        if (typeof window.fbq === "function") {
            window.fbq("trackCustom", eventName, payload || {});
        }
    }

    function parseQuery(search) {
        var params = new URLSearchParams(search || "");
        var result = {};

        params.forEach(function (value, key) {
            if (value !== "") {
                result[key] = value;
            }
        });

        return result;
    }

    function stringifyQuery(paramsObject) {
        var params = new URLSearchParams();
        var keys = Object.keys(paramsObject || {});

        keys.forEach(function (key) {
            if (paramsObject[key] !== undefined && paramsObject[key] !== null && paramsObject[key] !== "") {
                params.set(key, String(paramsObject[key]));
            }
        });

        return params.toString();
    }

    function saveParams(paramsObject) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(paramsObject));
        } catch (error) {
        }
    }

    function getStoredParams() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return null;
            }

            var parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== "object") {
                return null;
            }

            return parsed;
        } catch (error) {
            return null;
        }
    }

    function getBasePath() {
        var pathname = window.location.pathname;
        var appIndex = pathname.indexOf("/app");

        if (appIndex !== -1) {
            return pathname.slice(0, appIndex + 1);
        }

        if (pathname.slice(-1) === "/") {
            return pathname;
        }

        return pathname.slice(0, pathname.lastIndexOf("/") + 1);
    }

    function isAppPage() {
        return /\/app(\/|$)/.test(window.location.pathname);
    }

    function saveCurrentQueryToStorage() {
        var currentParams = parseQuery(window.location.search);

        if (Object.keys(currentParams).length > 0) {
            saveParams(currentParams);
        }
    }

    function ensureRootHasStoredParams() {
        if (isAppPage()) {
            return;
        }

        var stored = getStoredParams();
        if (!stored) {
            return;
        }

        var current = parseQuery(window.location.search);
        var merged = Object.assign({}, stored, current);
        var currentQuery = stringifyQuery(current);
        var mergedQuery = stringifyQuery(merged);

        if (mergedQuery !== currentQuery) {
            var updatedUrl = window.location.pathname + (mergedQuery ? "?" + mergedQuery : "") + window.location.hash;
            window.history.replaceState({}, "", updatedUrl);
        }

        saveParams(merged);
    }

    function registerServiceWorker() {
        if (!("serviceWorker" in navigator)) {
            return;
        }

        var basePath = getBasePath();
        var serviceWorkerUrl = basePath + "sw.js";

        navigator.serviceWorker.register(serviceWorkerUrl, { scope: basePath }).catch(function () {
        });
    }

    function isStandaloneMode() {
        return window.matchMedia("(display-mode: standalone)").matches;
    }

    function trackPwaOpen() {
        if (isAppPage()) {
            return;
        }

        if (!isStandaloneMode()) {
            return;
        }

        safeTrackCustom("PWAOpened", {
            page: window.location.pathname
        });
    }

    function navigateToRootWithTokens() {
        var basePath = getBasePath();
        var stored = getStoredParams();
        var query = stringifyQuery(stored || {});
        var targetUrl = basePath + (query ? "?" + query : "");

        window.location.href = targetUrl;
    }

    function promptInstall() {
        if (!deferredInstallPrompt) {
            navigateToRootWithTokens();
            return Promise.resolve(false);
        }

        var installEvent = deferredInstallPrompt;
        deferredInstallPrompt = null;

        return installEvent.prompt()
            .then(function () {
                return installEvent.userChoice;
            })
            .then(function (choiceResult) {
                return !!(choiceResult && choiceResult.outcome === "accepted");
            })
            .catch(function () {
                return false;
            });
    }

    window.addEventListener("beforeinstallprompt", function (event) {
        event.preventDefault();
        deferredInstallPrompt = event;
    });

    window.addEventListener("appinstalled", function () {
        safeTrackCustom("PWAInstalled", {
            page: window.location.pathname
        });
    });

    saveCurrentQueryToStorage();
    ensureRootHasStoredParams();
    registerServiceWorker();
    trackPwaOpen();

    window.pwaInstallBridge = {
        promptInstall: promptInstall,
        navigateToRootWithTokens: navigateToRootWithTokens,
        getStoredParams: getStoredParams
    };
})();
