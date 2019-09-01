import path from 'path'

import { remote } from 'electron'
import '../sass/style.scss';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
require('materialize-css')
require('sweetalert2')

function processFiles(files) {
    console.log(files)
    $('#header-loader').show()
    $.ajax({
        url: "http://localhost:" + remote.getGlobal('guniPort') + "/predict-api",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(files),
        success: function (data, status, xhr) {
            console.log('Success!' + data);
            $('#header-loader').hide()
            $('#results').css('display', 'block');
            jQuery.each(data, function (name, predictions) {
                var eachrow = "";
                jQuery.each(predictions, function (key, value) { 
                    eachrow += "<tr>"
                            + "<td>" + key + "</td>"
                            + "<td>" + value + "</td>"
                            + "</tr>";
                });
                var collapsible="<li>"
                                + "<div class='collapsible-header'><i class='material-icons'>image</i>" + name + "</div>"
                                + "<div class='collapsible-body'><span>" + "<table class='striped highlight'><thead><tr><th>Category</th><th>Percent</th></tr></thead><tbody>" + eachrow + "</tbody></table>" + "</span></div>"
                                + "</li>"
                $(collapsible).appendTo('.collapsible').hide().fadeIn();
            });
        },
        error: function (jqXhr, textStatus, errorMessage) {
            $('#header-loader').hide()
            Swal.fire({
                type: 'error',
                title: 'Error Processing File',
                html: jqXhr.responseText + '<br>' + errorMessage
              })
        }
    });
}

const appHTML = path.join(__static, '/app.html')
console.log(appHTML)
$(document).ready(function(){
    $.get("file:///" + appHTML, function(data) {
        $("#app").replaceWith(data);
        $('#insertYear').append(new Date().getFullYear())
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems);

        $('#uploadFile').on('click', function() {
            let files = remote.dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
            processFiles(files);
        });

        var holder = document.getElementById('uploadFile');
        holder.ondragover = () => {return false;};
        holder.ondragleave = () => {return false;};
        holder.ondragend = () => {return false;};
        holder.ondrop = (e) => {
            e.preventDefault();

            let files = []
            for (let f of e.dataTransfer.files) {
                files.push(f.path)
            }
            processFiles(files);
            return false;
        };
    });
});

