
$(document).ready(() => {

    const exemplosArray = () => {

        let array = [10, 7, 20, 5];
        console.log("array " + array);

        let total = array.reduce((x, value) => x += value);
        console.log("reduce " + total);

        let mult = (value) => value * 2;

        var arrayMap = array.map(mult);
        console.log("arrayMap " + arrayMap);

        var arrayFilter = array.filter((value) => value % 2 ==0);
        console.log("arrayFilter " + arrayFilter);

        const pares = (value) => value % 2 ==0;

        console.log("direto " + array.filter(pares).map(mult));


    }

    exemplosArray();
    
    var formNoticias = $("#form-noticias");
    formNoticias.on("submit", () => {
        try {
            var json = recordFromForm(formNoticias);
            addDataTable(json);
        } catch (e){
            console.error(e);
        }
        return false;
    });

    const recordFromForm = (form) => {
        var inputs = form.find('input[type="text"], textarea');
        var json = "";
        inputs.each(function(idx, input){
            var name = $(input).attr("name");
            var value = $(input).val();
            if (json !== "")
                json += ",";
            
            json += `"${name}": "${ value.trim() }"`;
        });
        json = `{${json}}`;
        return JSON.parse(json);
    }

    const addDataTable = (noticiajson) => {
        var tbody = $("#table-noticias tbody");
        var tr = $("<tr></tr>");
        var tdTitulo = $("<td></td>");
        var tdIntroducao = $("<td></td>");
        var tdAcoes = $("<td></td>");
        tdTitulo.text(noticiajson['titulo']);
        tdIntroducao.text(noticiajson['introducao']);

        var remover = $('<a href="#"></a>');
        remover.html('<i class="bi-trash"></i> Remover');
        remover.addClass("btn btn-sm btn-danger");
        tdAcoes.append(remover);

        remover.on("click", () => removeRow(tr));

        tr.append(tdTitulo, tdIntroducao, tdAcoes);
        tbody.append(tr);

        showRowCount();
    }

    const removeRow = (tr) => {
        tr.remove();
        showRowCount();
    }

    const showRowCount = () => {
        var trs = $("#table-noticias tbody tr");
        var total = trs.length;
        $("#table-noticias tfoot tr td span").text(total);
    }
});
