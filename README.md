# API - Rastreio Gollog

API for tracking loads on the Gollog portal

## Installation

Download the project to your computer, open the folder with the files and run:

```bash
yarn i
node index
```

## How to use
To track a AWB just use the link {your-domain}/gollog/rastreio/{prefix}/{awb}
```bash
http://localhost:3000/gollog/rastreio/127/12313123
```


## Response - Success
```JSON
{"status":true,"message":"Rastreamento Disponível","awb":{"conhecimento":"12754477905","nota_fiscal":"","referencia":"86471383","produto":"Convencional","origem":"LEC","destino":"REC","volumes":"10","peso":"235,0","pedo_dimensional":"50917","tracking":[{"data":"2018-11-06","hora":"16:39","movimentacao":"10 volumes recebidos em LEC - EXTREMA para embarque.","local":"LEC"},{"data":"2018-11-06","hora":"22:25","movimentacao":"10 volumes embarcados em LEC - EXTREMA para transferência para GRU - GUARULHOS","local":"LEC"},{"data":"2018-11-06","hora":"22:25","movimentacao":"2 volumes recebidos em GRU - GUARULHOS para conexão","local":"GRU"},{"data":"2018-11-06","hora":"23:29","movimentacao":"8 volumes recebidos em GRU - GUARULHOS para conexão","local":"GRU"},{"data":"2018-11-07","hora":"09:08","movimentacao":"10 volumes embarcados em GRU - GUARULHOS no voo G31412 para BSB - BRASILIA","local":"GRU"},{"data":"2018-11-07","hora":"13:41","movimentacao":"1 volume recebido em BSB - BRASILIA no voo G31412 para conexão","local":"BSB"},{"data":"2018-11-07","hora":"15:00","movimentacao":"3 volumes recebidos em BSB - BRASILIA no voo G31412 para conexão","local":"BSB"},{"data":"2018-11-07","hora":"15:18","movimentacao":"6 volumes recebidos em BSB - BRASILIA no voo G31412 para conexão","local":"BSB"},{"data":"2018-11-07","hora":"21:36","movimentacao":"3 volumes embarcados em BSB - BRASILIA no voo G31746 para REC - RECIFE","local":"BSB"},{"data":"2018-11-07","hora":"21:36","movimentacao":"1 volume embarcado em BSB - BRASILIA no voo G31746 para REC - RECIFE","local":"BSB"},{"data":"2018-11-08","hora":"00:42","movimentacao":"4 volumes desembarcados no destino REC - RECIFE","local":"REC"},{"data":"2018-11-08","hora":"00:42","movimentacao":"4 volumes retidos na base REC - RECIFE para alfândega","local":"REC"},{"data":"2018-11-08","hora":"03:11","movimentacao":"4 volumes liberados na base REC - RECIFE pela alfandega","local":"REC"}]}}
```

## Response - Error
```JSON
{"status":false,"message":"AWB não encontrado"}
```
