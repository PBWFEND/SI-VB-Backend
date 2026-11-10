Nama : Muhamad Kurnia
NPM : 240160221025
Kelas : SI-VB

Cara Pengujian:
1.curl.exe http://localhost:3005/buku
 response: {"success":true,"total":2,"data":[{"id":1,"judul":"Belajar Node.js","penulis":"Andi","tersedia":true},{"id":2,"judul":"Dasar Express.js","penulis":"Budi","tersedia":false}]}

 2.curl.exe "http://localhost:3005/buku?tersedia=true"
 response: {"success":true,"total":1,"data":[{"id":1,"judul":"Belajar Node.js","penulis":"Andi","tersedia":true}]}

 3.curl.exe http://localhost:3005/buku/1  
 response: {"success":true,"data":{"id":1,"judul":"Belajar Node.js","penulis":"Andi","tersedia":true}}

 4. curl.exe -i  http://localhost:3005/buku/99 
 response: HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Content-Length: 50
ETag: W/"32-2kLOF8Jziq6AV3cHCrWWwt8Je2c"
Date: Tue, 13 Oct 2026 02:52:53 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Buku tidak ditemukan"}

5. $body = @{ror: Expected property name or &#39;}&#39; in JSON at position 1 (line 1 column 2)<br> &nbsp; &nbsp;at JSON.parse (&lt;anonymous&gt;)<br> &nbsp; &nbsp;at parse (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\body-parser\lib\types\json.js:91:
>>     judul = "Belajar React"k-backend\pertemuan-4\latihan-individu\node_modules\body-parser\lib\read.js:162:18<br> &nbsp; &nbsp;at AsyncResource.runInAsyncScope (node:async_hooks:227:14)<br> &nbsp; &nbsp;at invokeCallback (D:\prak-backend\pertemuan-4\latihan-indi
>>     penulis = "Cici"ody\index.js:238:16)<br> &nbsp; &nbsp;at done (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\raw-body\index.js:227:7)<br> &nbsp; &nbsp;at IncomingMessage.onEnd (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\raw-body\in
>> } | ConvertTo-Json -Compressat IncomingMessage.emit (node:events:509:28)<br> &nbsp; &nbsp;at endReadableNT (node:internal/streams/readable:1729:12)<br> &nbsp; &nbsp;at process.processTicksAndRejections (node:internal/process/task_queues:90:21)</pre>
>> ody>
>> Invoke-RestMethod -Uri "http://localhost:3005/buku" -Method POST -ContentType "application/json" -Body $body

response: success message                   data                                                     
------- -------                   ----                                                     
   True Buku berhasil ditambahkan @{id=3; judul=Belajar React; penulis=Cici; tersedia=True} 

6.  $body = '{"judul":"Hanya Judul"}'
>> Invoke-RestMethod -Uri "http://localhost:3005/buku" -Method POST -ContentType "application/json" -Body $body

    response:Invoke-RestMethod : {"success":false,"message":"Field 'judul' dan 'penulis' wajib diisi"}
At line:3 char:1
+ Invoke-RestMethod -Uri "http://localhost:3005/buku" -Method POST -Con ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-RestMethod], WebException
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeRestMethodCommand

7.curl.exe -i http://localhost:3005/siswa
    response: HTTP/1.1 404 Not Found              
Content-Type: application/json; charset=utf-8                                                                  
Content-Length: 65
ETag: W/"41-UARRMdM7rboOynMSPhVF3dGwBzc"
Date: Tue, 13 Oct 2026 03:15:45 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Endpoint GET /siswa tidak ditemukan"}

Hasil Pengujian: cd pertemuan-4
PS D:\prak-backend\pertemuan-4> cd latihan-individu
PS D:\prak-backend\pertemuan-4\latihan-individu> NPM install

added 68 packages, and audited 69 packages in 6s

27 packages are looking for funding
  run `npm fund` for details

1 critical severity vulnerability

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
PS D:\prak-backend\pertemuan-4\latihan-individu> node latihan.js
Latihan berjalan di http://localhost:3005
Uji: curl http://localhost:3005/buku?tersedia=true
[2026-10-13T02:49:46.387Z] GET /buku
[2026-10-13T02:51:38.422Z] GET /buku?tersedia=true
[2026-10-13T02:52:06.837Z] GET /buku/1
[2026-10-13T02:52:53.335Z] GET /buku/99
[2026-10-13T02:59:44.844Z] POST /buku
SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
    at JSON.parse (<anonymous>)
    at parse (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\body-parser\lib\types\json.js:91:21)
    at D:\prak-backend\pertemuan-4\latihan-individu\node_modules\body-parser\lib\read.js:162:18
    at AsyncResource.runInAsyncScope (node:async_hooks:227:14)
    at invokeCallback (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\raw-body\index.js:238:16)
    at done (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\raw-body\index.js:227:7)
    at IncomingMessage.onEnd (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\raw-body\index.js:287:7)
    at IncomingMessage.emit (node:events:509:28)
    at endReadableNT (node:internal/streams/readable:1729:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
[2026-10-13T03:03:44.875Z] POST /buku
SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
    at JSON.parse (<anonymous>)
    at parse (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\body-parser\lib\types\json.js:91:21)
    at D:\prak-backend\pertemuan-4\latihan-individu\node_modules\body-parser\lib\read.js:162:18
    at AsyncResource.runInAsyncScope (node:async_hooks:227:14)
    at invokeCallback (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\raw-body\index.js:238:16)
    at done (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\raw-body\index.js:227:7)
    at IncomingMessage.onEnd (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\raw-body\index.js:287:7)
    at IncomingMessage.emit (node:events:509:28)
    at endReadableNT (node:internal/streams/readable:1729:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
[2026-10-13T03:03:50.065Z] POST /buku
SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
    at JSON.parse (<anonymous>)
    at parse (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\body-parser\lib\types\json.js:91:21)
    at D:\prak-backend\pertemuan-4\latihan-individu\node_modules\body-parser\lib\read.js:162:18
    at AsyncResource.runInAsyncScope (node:async_hooks:227:14)
    at invokeCallback (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\raw-body\index.js:238:16)
    at done (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\raw-body\index.js:227:7)
    at IncomingMessage.onEnd (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\raw-body\index.js:287:7)
    at IncomingMessage.emit (node:events:509:28)
    at endReadableNT (node:internal/streams/readable:1729:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
[2026-10-13T03:07:14.873Z] POST /buku
[2026-10-13T03:10:36.328Z] POST /buku
SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
    at JSON.parse (<anonymous>)
    at parse (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\body-parser\lib\types\json.js:91:21)
    at D:\prak-backend\pertemuan-4\latihan-individu\node_modules\body-parser\lib\read.js:162:18
    at AsyncResource.runInAsyncScope (node:async_hooks:227:14)
    at invokeCallback (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\raw-body\index.js:238:16)
    at done (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\raw-body\index.js:227:7)
    at IncomingMessage.onEnd (D:\prak-backend\pertemuan-4\latihan-individu\node_modules\raw-body\index.js:287:7)
    at IncomingMessage.emit (node:events:509:28)
    at endReadableNT (node:internal/streams/readable:1729:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
[2026-10-13T03:13:52.831Z] POST /buku
[2026-10-13T03:15:45.282Z] GET /siswa
[2026-10-13T03:20:25.113Z] GET /buku