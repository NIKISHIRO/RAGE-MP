let getpoints = function(points){
    console.log(points);
    let point = $(".text");
    point.children().remove();
    $('.btn-tp').children().remove();
    $('.btn-del').children().remove();

    points.forEach((obj, id) => {
        point[0].innerHTML += `<div class="name" data-attr="${id}">`+obj.point+'</div>';
        let button_tp = $('<button>', {text: 'Телепорт', class: 'tp btn btn-success'});
        let button_del = $('<button>', {text: 'Удалить', class: 'tp btn btn-danger'});
        button_tp.attr("data-attr", id)
        button_del.attr("data-attr", id)
        button_tp.appendTo('.btn-tp');
        button_del.appendTo('.btn-del');
        console.log("points")

        button_tp.on('click',function (){
            let pointer = JSON.stringify(obj.cords);
            mp.trigger('pointget', pointer)
            console.log("btn-tp")
        });
        button_del.on('click',function (){
            let attrNum = $(this).attr('data-attr');
            $(`.text [data-attr="${attrNum}"]`).remove();
            $(`.btn-tp [data-attr="${attrNum}"]`).remove();
            $(`.btn-del [data-attr="${attrNum}"]`).remove();

            let pointer = JSON.stringify(obj);
            mp.trigger('deleteget', pointer);
            console.log("btn-del")
        });
        
    });
        
    
        
};
$('.buttonCreate').on('click',function(){
            let name = $('.createPoint').val();
            console.log("btn-create");
            
            let newName = JSON.stringify(name);
            mp.trigger('createget', newName);

});
