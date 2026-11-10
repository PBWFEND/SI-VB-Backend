# LATIHAN INDIVIDU PERTEMUAN-1 API MAHASISWA

Nama : Athiyya Salsabila Hermawan
NPM : 240160221053
Kelas : SI-VB

# HASIL LATIHAN 
PS D:\240160221053\Pertemuan-1\Latihan-Individu> node latihan.js
Latihan berjalan di http://localhost:3001
Kerjakan semua TODO 1-4, lalu uji setiap endpoint.
GET /about
GET /mahasiswa
POST /mahasiswa
POST /mahasiswa
POST /mahasiswa
POST /mahasiswa
POST /mahasiswa
POST /mahasiswa
POST /mahasiswa
GET /mahasiswa
GET /mahasiswa
PUT /mahasiswa
DELETE /mahasiswa/1
GET /mahasiswa/99
GET /mahasiswa/tidakada

PS D:\240160221053> cd Pertemuan-1
PS D:\240160221053\Pertemuan-1> cd Latihan-Individu
PS D:\240160221053\Pertemuan-1\Latihan-Individu> curl http://localhost:3001/about                                                                             
                                                                                                                                                              
Security Warning: Script Execution Risk                                                                                                                       
Invoke-WebRequest parses the content of the web page. Script code in the web page might be run when the page is parsed.                                       
      RECOMMENDED ACTION:
      Use the -UseBasicParsing switch to avoid script code execution.

      Do you want to continue?
    
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "N"): y


StatusCode        : 200
StatusDescription : OK
Content           : {
                      "success": true,
                      "message": "API Pertemuan 1",
                      "author": "Athiyya Salsabila Hermawan"
                    }
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Transfer-Encoding: chunked
                    Content-Type: application/json
                    Date: Fri, 30 Oct 2026 04:53:52 GMT
                    
                    {
                      "success": true,
                      "message": "AP...
                    }
Forms             : {}
Headers           : {[Connection, keep-alive], [Keep-Alive, timeout=5], [Transfer-Encoding, chunked], [Content-Type, application/json]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 95


                                                                                                                                                              
PS D:\240160221053\Pertemuan-1\Latihan-Individu> curl http://localhost:3001/mahasiswa                                                                         
                                                                                                                                                              
Security Warning: Script Execution Risk                                                                                                                       
Invoke-WebRequest parses the content of the web page. Script code in the web page might be run when the page is parsed.
      RECOMMENDED ACTION:
      Use the -UseBasicParsing switch to avoid script code execution.

      Do you want to continue?
    
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "N"): y


StatusCode        : 200
StatusDescription : OK
Content           : {
                      "success": true,
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
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Transfer-Encoding: chunked
                    Content-Type: application/json
                    Date: Fri, 30 Oct 2026 04:55:18 GMT
                    
                    {
                      "success": true,
                      "total": 2,
                      ...
                    }
Forms             : {}
Headers           : {[Connection, keep-alive], [Keep-Alive, timeout=5], [Transfer-Encoding, chunked], [Content-Type, application/json]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 182



PS D:\240160221053\Pertemuan-1\Latihan-Individu> curl -X POST http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d " {\"nim\":\"240160221053\",\"nama\":\"Athiyya Salsabila Hermawan\"}"
Invoke-WebRequest : Cannot bind parameter 'Headers'. Cannot convert the "Content-Type: application/json" value of type "System.String" to type 
"System.Collections.IDictionary".
At line:1 char:49
+ ... /localhost:3001/mahasiswa -H "Content-Type: application/json" -d " {\ ...
+                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidArgument: (:) [Invoke-WebRequest], ParameterBindingException
    + FullyQualifiedErrorId : CannotConvertArgumentNoMessage,Microsoft.PowerShell.Commands.InvokeWebRequestCommand
 
PS D:\240160221053\Pertemuan-1\Latihan-Individu> curl.exe -X POST http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d "{\"nim\":\"240160221053\",\"nama\":\"Athiyya Salsabila Hermawan\"}"
{
  "success": false,
  "message": "Field 'nim' dan 'nama' wajib diisi"
}curl: (3) URL rejected: Port number was not a decimal number between 0 and 65535
curl: (6) Could not resolve host: Salsabila
curl: (3) URL rejected: Bad hostname
PS D:\240160221053\Pertemuan-1\Latihan-Individu> curl.exe -X POST "http://localhost:3001/mahasiswa" -H "Content-Type: application/json" -d '{"nim":"240160221053","nama":"Athiyya Salsabila Hermawan"}'
{
  "success": false,
  "message": "Field 'nim' dan 'nama' wajib diisi"
}
PS D:\240160221053\Pertemuan-1\Latihan-Individu> curl.exe -X POST http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d '{"nim":"240160221053","nama":"Athiyya Salsabila Hermawan"}'
{
  "success": false,
  "message": "Field 'nim' dan 'nama' wajib diisi"
}
PS D:\240160221053\Pertemuan-1\Latihan-Individu> curl.exe -X POST http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d '{"nim":"240160221053","nama":"Athiyya Salsabila Hermawan"}'
{
  "success": false,
  "message": "Field 'nim' dan 'nama' wajib diisi"
}
PS D:\240160221053\Pertemuan-1\Latihan-Individu> $body = '{"nim":"240160221053","nama":"Athiyya Salsabila Hermawan"}'
PS D:\240160221053\Pertemuan-1\Latihan-Individu> curl.exe -X POST http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d $body
{
  "success": false,
  "message": "Field 'nim' dan 'nama' wajib diisi"
}
PS D:\240160221053\Pertemuan-1\Latihan-Individu> curl.exe -X POST http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d '{"nim":"240160221053","nama":"Athiyya Salsabila Hermawan"}'
{
  "success": false,
  "message": "Field 'nim' dan 'nama' wajib diisi"
}
PS D:\240160221053\Pertemuan-1\Latihan-Individu> $headers = @{ "Content-Type" = "application/json" }
PS D:\240160221053\Pertemuan-1\Latihan-Individu> $body = '{"nim":"240160221053","nama":"Athiyya Salsabila Hermawan"}'
PS D:\240160221053\Pertemuan-1\Latihan-Individu> Invoke-RestMethod -Uri "http://localhost:3001/mahasiswa" -Method POST -Headers $headers -Body $body

success message                        data                                                
------- -------                        ----                                                
   True Mahasiswa berhasil ditambahkan @{nim=240160221053; nama=Athiyya Salsabila Hermawan}

                                                                                                                                                              
PS D:\240160221053\Pertemuan-1\Latihan-Individu> curl http://localhost:3001/mahasiswa                                                                         
                                                                                                                                                              
Security Warning: Script Execution Risk                                                                                                                       
Invoke-WebRequest parses the content of the web page. Script code in the web page might be run when the page is parsed.
      RECOMMENDED ACTION:
      Use the -UseBasicParsing switch to avoid script code execution.

      Do you want to continue?
    
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "N"): y


StatusCode        : 200
StatusDescription : OK
Content           : {
                      "success": true,
                      "total": 3,
                      "data": } [
                        {
                          "nim": "F1D022001",
                          "nama": "Jhon Doe"
                        },
                        {
                          "nim": "F1D022002",
                          "nama": "Ani Lestari"
                        },
                        {
                          "nim": "24...} ]
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Transfer-Encoding: chunked
                    Content-Type: application/json
                    Date: Fri, 30 Oct 2026 05:08:04 GMT
                    
                    {
                      "success": true,
                      "total": 3,
                      ...
Forms             : {}
Headers           : {[Connection, keep-alive], [Keep-Alive, timeout=5], [Transfer-Encoding, chunked], [Content-Type, application/json]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 267


                                                                                                                                                              
PS D:\240160221053\Pertemuan-1\Latihan-Individu> (curl http://localhost:3001/mahasiswa).Content                                                               
                                                                                                                                                              
Security Warning: Script Execution Risk                                                                                                                       
Invoke-WebRequest parses the content of the web page. Script code in the web page might be run when the page is parsed.
      RECOMMENDED ACTION:
      Use the -UseBasicParsing switch to avoid script code execution.

      Do you want to continue?
    
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "N"): y
{
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
      "nim": "240160221053",
      "nama": "Athiyya Salsabila Hermawan"
    }
  ]
}
PS D:\240160221053\Pertemuan-1\Latihan-Individu> PUT http://localhost:3001/mahasiswa           
PUT : The term 'PUT' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a path was 
included, verify that the path is correct and try again.
At line:1 char:1
+ PUT http://localhost:3001/mahasiswa
+ ~~~
    + CategoryInfo          : ObjectNotFound: (PUT:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
 
PS D:\240160221053\Pertemuan-1\Latihan-Individu> curl.exe -X PUT http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d '{"nama":"Siapa"}'
{
  "success": false,
  "message": "Endpoint PUT /mahasiswa tidak ditemukan"
}
PS D:\240160221053\Pertemuan-1\Latihan-Individu> curl -X DELETE http://localhost:3001/mahasiswa/1                                                         
Invoke-WebRequest : A parameter cannot be found that matches parameter name 'X'.
At line:1 char:6
+ curl -X DELETE http://localhost:3001/mahasiswa/1
+      ~~
    + CategoryInfo          : InvalidArgument: (:) [Invoke-WebRequest], ParameterBindingException
    + FullyQualifiedErrorId : NamedParameterNotFound,Microsoft.PowerShell.Commands.InvokeWebRequestCommand
 
PS D:\240160221053\Pertemuan-1\Latihan-Individu> curl.exe -X DELETE http://localhost:3001/mahasiswa/1 
{
  "success": false,
  "message": "Endpoint DELETE /mahasiswa/1 tidak ditemukan"
}
PS D:\240160221053\Pertemuan-1\Latihan-Individu> curl.exe http://localhost:3001/mahasiswa/99         
{
  "success": false,
  "message": "Endpoint GET /mahasiswa/99 tidak ditemukan"
}
PS D:\240160221053\Pertemuan-1\Latihan-Individu> curl.exe http://localhost:3001/mahasiswa/tidakada
{
  "success": false,
  "message": "Endpoint GET /mahasiswa/tidakada tidak ditemukan"
}