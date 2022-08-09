function textCopy() {
  const add = ["r3x", "duck.com"].join("@");
  navigator.clipboard.writeText(add);
  alert("Copied e-mail address to clipboard");
}
