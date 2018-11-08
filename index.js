//import
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');

//initialize
const app = express();
const router = express.Router();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = "https://servicos.gollog.com.br/Rastreamento/Consultar";
const method = "POST";
const port = 3000;

//initilize routes
router.get('/', (req, res) => {
    res.status(200).json({status:true, api: 'Rastreio Gollog', author: "Pedro Entringer"});
});

router.get('/rastreio/:prefixo/:awb', (req, res) => {
    
    let prefixo = req.params.prefixo;
    let awb = req.params.awb;

    let headers = {
        'User-Agent':'Super Agent/0.0.1',
        'Content-Type':'application/x-www-form-urlencoded'
    }

    let form = {
        'TipoBusca': 1,
        'CampoPrefixoConhecimentoAerio[0]': prefixo,
        'CampoConhecimentoAerio[0]': awb,
        'CampoPrefixoConhecimentoAerio[1]': null,
        'CampoConhecimentoAerio[1]': null,
        'CampoPrefixoConhecimentoAerio[2]': null,
        'CampoConhecimentoAerio[2]': null,
        'CampoPrefixoConhecimentoAerio[3]': null,
        'CampoConhecimentoAerio[3]': null,
        'CampoPrefixoConhecimentoAerio[4]': null,
        'CampoConhecimentoAerio[4]': null,
        'CampoPrefixoConhecimentoAerio[5]': null,
        'CampoConhecimentoAerio[5]': null,
        'CampoPrefixoConhecimentoAerio[6]': null, 
        'CampoConhecimentoAerio[6]': null, 
        'CampoPrefixoConhecimentoAerio[7]': null, 
        'CampoConhecimentoAerio[7]': null, 
        'CampoPrefixoConhecimentoAerio[8]': null, 
        'CampoConhecimentoAerio[8]': null, 
        'CampoPrefixoConhecimentoAerio[9]': null, 
        'CampoConhecimentoAerio[9]': null, 
        'NumReferencia': null,
        'BuscarNotaFiscalEscolhido': 0,
        'NumeroDoDocument': null,
        'BuscaNotaFiscal[0]': null, 
        'BuscaNotaFiscal[1]': null, 
        'BuscaNotaFiscal[2]': null, 
        'BuscaNotaFiscal[3]': null, 
        'BuscaNotaFiscal[4]': null, 
        'BuscaNotaFiscal[5]': null, 
        'BuscaNotaFiscal[6]': null, 
        'BuscaNotaFiscal[7]': null, 
        'BuscaNotaFiscal[8]': null, 
        'BuscaNotaFiscal[9]': null
    }

    request( {url: url, method: method, followAllRedirects: false, jar: true, headers: headers, form: form} , function(error, response, body) {
        if (error) {
            res.status(500).json({status:false, message: 'Houve um problema ao executar a operação. Tente mais tarde.', error: error});
        } else {
            
            var $ = cheerio.load(body);
            var tracking = [];

            let html_dados_awb = $('.tabela_aside tr')[1];
            let html_tracking = $('.p_aside_botton');

            $(html_tracking).each(function(i) {

                if($(this).text().trim() != 'Ocorreu um erro ao tentar efetuar o rastreamento.'){

                    let movimentacao = $(this).text().trim().substring(20);
                    let movimentacao_array = $(this).text().trim().split(' ');
    
                    let track = {
                        data: formatDate(movimentacao_array[0]),
                        hora: movimentacao_array[2],
                        movimentacao: movimentacao,
                        local: getLocal(movimentacao_array),
                    }
    
                    tracking.push(track);
                }

            });

            if(tracking.length > 0){

                res.status(200).json({

                    status:true, message: 'Rastreamento Disponível',
                    awb: {
                        conhecimento: prefixo+awb,
                        nota_fiscal: $(html_dados_awb).find('td').eq(1).text().trim(),
                        referencia: $(html_dados_awb).find('td').eq(2).text().trim(),
                        produto: $(html_dados_awb).find('td').eq(3).text().trim(),
                        origem: $(html_dados_awb).find('td').eq(4).text().trim(),
                        destino: $(html_dados_awb).find('td').eq(5).text().trim(),
                        volumes: $(html_dados_awb).find('td').eq(6).text().trim(),
                        peso: $(html_dados_awb).find('td').eq(7).text().trim(),
                        pedo_dimensional: $(html_dados_awb).find('td').eq(8).text().trim(),
                        tracking: tracking
                    }
                    
                });

            }else{
                res.status(500).json({status:false, message: 'AWB não encontrado'});
            }
        }
    });
});

function formatDate(dataGol){
    let mes_array = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    let data_atual = new Date();

    let anoAtual = data_atual.getFullYear();
    let mesAtual = data_atual.getMonth();
    
    let mesOcorrencia = 0;

    for(let i=0; i< mes_array.length; i++) {
        if(dataGol.substring(2, 5) == mes_array[i]) {
            mesOcorrencia = i;
            i = mes_array.length;
        }
    }
    
    let anoRetorno = (mesOcorrencia > mesAtual) ? anoAtual-1 : anoAtual;
    let mesRetorno = mesOcorrencia+1;
    let diaRetorno = dataGol.substring(0, 2);
    
    mesRetorno = (mesRetorno.length == 1) ? "0"+mesRetorno : mesRetorno;


    return anoRetorno + "-" + mesRetorno + "-" + diaRetorno;
}

function getLocal(movimentacao_array){
    for(let i =0; i<movimentacao_array.length; i++){
        if(movimentacao_array[i].length == 3){
            return movimentacao_array[i];
        }
    }
}

app.use('/gollog/', router);
app.listen(port);
console.log('API ONLINE - ON PORT ' + port);