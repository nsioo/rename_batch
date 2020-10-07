var fs = require('fs'),
    path=require('path'),
    dist = '',
    keyword = '',
    repStr = '',
    args = process.argv.slice(2)

//show help
if(args.length === 0 || args[0].match('--help')) {
console.log('--help\n \t-dist 文件目标\n \t-k 搜索词\n \t-r 替换词\n');
return false;
}
//
args.forEach((item, i) => {
  if (item.match('-k')) {
      keyword = args[i + 1];
  } else if (item.match('-dist')) {
      dist = args[i + 1];
  } else if (item.match('-r')) {
      repStr = args[i + 1];
  }
});
console.log([    dist,
    keyword,
    repStr]);
//
// fs.readdir(src, (err, files) => {
// if (err) {
//     console.log(err);
// } else {
//     fs.exists(dist, exist => {
//         if (exist) {
//             copyFile(files, src, dist, filename, index);
//         } else {
//             fs.mkdir(dist, () => {
//                 copyFile(files, src, dist, filename, index);
//             })
//         }
//     });
// }
// });
//
// function copyFile(files, src, dist, filename, index) {
// files.forEach(n => {
//     let readStream,
//         writeStream,
//         arr = n.split('.'),
//         oldPath = src + '/' + n,
//         newPath = dist + '/' + filename + index + '.' + arr[arr.length - 1];
//     fs.stat(oldPath, (err, stats) => {
//         if (err) {
//             console.log(err);
//         } else if (stats.isFile()) {
//             readStream = fs.createReadStream(oldPath);
//             writeStream = fs.createWriteStream(newPath);
//             readStream.pipe(writeStream);
//         }
//     });
//     index++;
// })
// }

function renFiles(filePath , keyword ,  repStr ){
  if( !fs.lstatSync(filePath).isDirectory()){
    console.error("不是目录");
    return false;
  }
  //readdir方法读取文件名
  //readFile方法读取文件内容
  //writeFile改写文件内容
  //console.log(filePath);
  fs.readdir(filePath, { encoding:'utf8',withFileTypes:true }, function (err,data) {
    if(err){console.log(err);return;}
    data.forEach(function(item, index) {

      var currentItemPath = filePath+"\\"+item.name;
      //console.log(currentItemPath)
      if(item.isDirectory()){
        return renFiles( currentItemPath , keyword ,  repStr );
      }

      // fs.readFile(currentItemPath,'utf8',function(err,files){
      //   console.log(files)
      //   var result = files.replace(lineData[0].length>1 ? /x/g : /d/g , lineData[0]);
      //   result = result.replace(/com.caimao.caimao/g, "com."+slugify(lineData[0]).replace(/\-/g ,"")+"."+slugify(lineData[0]).replace(/\-/g ,"") );
      //   result = result.replace(/6e8757571a8b425cb4e740dcf16a0626/g, uuidv4().replace(/\-/g ,""));
      //   result = result.replace(/a8b665b1eff642f9977c2ccdcdf98a13/g, uuidv4().replace(/\-/g ,"") );
      //
      //   fs.writeFile(currentItemPath, result, 'utf8', function (err) {
      //      if (err) return console.log(err);
      //   });
      //
      // })
      if( item.name.indexOf( keyword )>-1 ){
          var newName = filePath+"\\"+(item.name.replace( keyword , repStr ));
          //console.info(newName);
           fs.rename(currentItemPath, newName , (err) => {
             if (err) throw err;
             console.log('重命名'+newName+'完成');
          });
      }

    });

  });
}

renFiles( path.resolve(__dirname+dist) , keyword ,  repStr );

// node rename.js -dist \base-douyin -k Wx -r Dy
