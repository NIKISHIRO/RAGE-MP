$('.object-button').on('click', () => {
    let model = $("[name='model']").val().trim();
    let posX = $("[name='position-x']").val().trim();
    let posY = $("[name='position-y']").val().trim();
    let posZ = $("[name='position-z']").val().trim(); 
    let rotateX = $("[name='rotation-x']").val().trim(); 
    let rotateY = $("[name='rotation-y']").val().trim(); 
    let rotateZ = $("[name='rotation-z']").val().trim(); 
    let alpha = $("[name='alpha']").val().trim();
    let dimension = $("[name='dimension']").val().trim();

    let position = {
        x: Number(posX),
        y: Number(posY),
        z: Number(posZ)
    };

    let rotation = {
        x: Number(rotateX),
        y: Number(rotateY),
        z: Number(rotateZ)
    };

    alpha = Number(alpha);
    dimension = Number(dimension);

    mp.trigger('objectCreator_c', model, JSON.stringify(position), JSON.stringify(rotation), alpha, dimension);
});