var str = "halo.halogan.jpeg"
var nama = str.split('.')
var ext = nama[nama.length-1]
var fileName = str.replace(`.${ext}`, "")
console.log(fileName)
console.log(ext)