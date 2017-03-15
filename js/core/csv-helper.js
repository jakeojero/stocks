function JSONtoCSVConverter(JSONData, ReportTitle, ShowLabel) {
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        
        var CSV = '';
        
        CSV += ReportTitle + '\r\n\n';
        
        if (ShowLabel) {
            var row = '';
            
            for( var index in arrData[0]) {
                row += index + ',';
            }
            
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }
        
        for (var i=0; i < arrData.length; i++) {
            var row = '';
            
            for(var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }
            
            row.slice(0, row.length-1);
            
            CSV += row + '\r\n';
        }
        
        if(CSV == '') {
            alert('invalid data');
            return false;
        }
        
        var fileName = "StockReport_";
        fileName += ReportTitle.replace(/ /g, "_");
        var url = 'data:text/csv;charset=utf-8,' + escape(CSV);
        
        var link = document.createElement('a');
        link.href = url;
        link.style = 'visibility:hidden';
        link.download = fileName + '.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    }