export function loadScriptGsi(onLoadFunction: VoidFunction) {
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.onload = onLoadFunction; //gsiLoaded
  script.async = true;
  script.id = "google-client-script";
  document.querySelector("body")?.appendChild(script);
}

export function loadScriptGoogleJsApi(onLoadFunction: VoidFunction) {
  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/api.js";
  script.onload = onLoadFunction; //gapiLoaded
  script.async = true;
  script.defer = true;
  script.id = "google-apis-js-script";
  document.querySelector("body")?.appendChild(script);
}

export function removeGoogleScripts() {
  document.getElementById("google-client-script")?.remove();
  document.getElementById("google-apis-js-script")?.remove();
}
