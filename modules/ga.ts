export default function ga(...args) {
  if ("ga" in window) {
    window.ga(...args);
  } else {
    console.log("window.ga not available.", JSON.stringify(args, null, 2));
  }
}
