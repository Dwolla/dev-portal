export default function ga(...args) {
  if ("ga" in window) {
    window.ga(...args);
  } else {
    // eslint-disable-next-line no-console
    console.log("window.ga not available.", JSON.stringify(args, null, 2));
  }
}
