PS C:\Users\arfa rental\Desktop\Prak_backend> node latihan.js 
Latihan berjalan di http://localhost:3001
Kerjakan semua TODO 1-4, lalu uji setiap endpoint.
GET /about
GET /mahasiswa
POST /mahasiswa
POST /mahasiswa
GET /mahasiswa
PUT /mahasiswa
GET /mahasiswa/99

 *  History restored 

PS C:\Users\arfa rental\Desktop\Prak_backend> 

PS C:\Users\arfa rental\Desktop\Prak_backend> curl.exe -X POST http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d "{\"nim\":\"240160221021\",\"nama\":\"Lintang Azzahra Govarana\"}"
{
  "success": false,
  "message": "Field 'nim' dan 'nama' wajib diisi"
}curl: (3) URL rejected: Port number was not a decimal number between 0 and 65535
curl: (6) Could not resolve host: Azzahra
curl: (3) URL rejected: Bad hostname
PS C:\Users\arfa rental\Desktop\Prak_backend> Invoke-RestMethod -Method Post -Uri http://localhost:3001/mahasiswa -ContentType "application/json" -Body '{"nim":"240160221021","nama":"Lintang Azzahra Govarana"}'

success message                        data                                                                        
------- -------                        ----                                                                        
   True Mahasiswa berhasil ditambahkan @{nim=240160221021; nama=Lintang Azzahra Govarana}                          
                                                                                                                   

PS C:\Users\arfa rental\Desktop\Prak_backend> curl http://localhost:3001/mahasiswa


StatusCode        : 200
StatusDescription : OK
Content           : {
                      "success": true,
                      "total": 3,
                      "data": [
                        {
                          "nim": "F1D022001",
                          "nama": "Jhon Doe"
                        },
                        {
                          "nim": "F1D022002",
                          "nama": "Ani Lestari"
                        },
                        {
                          "nim": "24...
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Transfer-Encoding: chunked
                    Content-Type: application/json
                    Date: Tue, 29 Sep 2026 02:12:16 GMT
                    
                        }
                      "success": true,
                      "total": 3,
                      ...
Forms             : {}
Headers           : {[Connection, keep-alive], [Keep-Alive, timeout=5], [Transfer-Encoding, chunked], 
                    [Content-Type, application/json]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 265



PS C:\Users\arfa rental\Desktop\Prak_backend> Invoke-RestMethod -Method Put -Uri http://localhost:3001/mahasiswa -ContentType "application/json" -Body '{"nama":"Siapa"}'
Invoke-RestMethod : The remote server returned an error: (404) Not Found.
At line:1 char:1
+ Invoke-RestMethod -Method Put -Uri http://localhost:3001/mahasiswa -C ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-RestMethod], W 
   ebException
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeRestMethodCommand
 
PS C:\Users\arfa rental\Desktop\Prak_backend> curl.exe -i http://localhost:3001/mahasiswa/99
HTTP/1.1 404 Not Found
Content-Type: application/json
Date: Tue, 29 Sep 2026 02:25:52 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": false,
  "message": "Endpoint GET /mahasiswa/99 tidak ditemukan"
}
PS C:\Users\arfa rental\Desktop\Prak_backend>  
 *  History restored 

PS C:\Users\arfa rental\Desktop\Prak_backend> 
 *  History restored 

PS C:\Users\arfa rental\Desktop\Prak_backend> 






{
  "success": true,
  "message": "Selamat datang di API Pertemuan 1",
  "endpoints": [
    "GET /",
    "GET /mahasiswa",
    "POST /mahasiswa"
  ]
}


{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "total": 2,
  "data": [
    {
      "nim": "F1D022001",
      "nama": "Jhon Doe"
    },
    {
      "nim": "F1D022002",
      "nama": "Ani Lestari"
    }
  ]
}

{
  "success": false,
  "message": "Endpoint GET /tidakada tidak ditemukan"
}


{
  "success": true,
  "message": "API Pertemuan 1",
  "author": "Lintang Azzahra Govarana"
}

## Refleksi

Request adalah permintaan yang dikirim client (misalnya browser) ke server, berisi method, alamat, dan kadang data. Response adalah jawaban yang dikirim server kembali ke client, berisi status code dan isi data. Status code penting karena client langsung tahu hasilnya, misalnya 200 berarti berhasil dan 404 berarti data tidak ditemukan, sehingga client bisa menentukan langkah selanjutnya.