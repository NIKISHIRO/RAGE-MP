$('.inventory').draggable({containment: '.interface'});
$('.items-around').draggable({containment: '.interface'});

// send to server
rpc.register('inventory:reload', function(args) {
    let items = args[0];
    let currentSlots = args[1];
    let currentWeight = args[2];

    $('.slots').text(''); // delete all items
    $('#currentWeight').text(currentWeight);
    $('#currentSlots').text(currentSlots);

    if (!items) return;

    items.forEach((item, i) => {
        let itemKey = item.key;
        let amount = item.amount;
        let name = item.name;

        let divInvSlot = $('<div>', {class: 'inventory-slot', 'data-id': i});
        let divInvSlotDescr = $('<div>', {class: 'inventory-slot__description', text: `${name}`});
        let imgItem = $('<img>', {src: `images/${itemKey}.png`, class: 'item'});
        let divUse = $('<div>', {class: 'use'});
        let useItem = $('<div>', {class: 'use-item', text: 'Использовать'});
        let dropItem = $('<div>', {class: 'drop-item', text: 'Выкинуть'});
        let divItemCount = $('<div>', {class: 'inventory-slot__count', text: `${amount}`});

        useItem.on('click', function() {
            let id = Number.parseInt($(this).parents('.inventory-slot').attr('data-id'));
            rpc.callServer('inventory:useItem', id)
                .then(good => {
                    console.log(`[inventory:useItem]: ${good}`.green);
                })
                .catch(error => {
                    console.log(`error => [inventory:useItem], ${error}`.red);
                });
        });
        
        dropItem.on('click', function() {
            let id = Number.parseInt($(this).parents('.inventory-slot').attr('data-id'));
            rpc.callServer('inventory:dropItem', id)
                .then(good => {
                    console.log(`[inventory:dropItem]: ${good}`.green);
                })
                .catch(error => {
                    console.log(`error => [inventory:dropItem], ${error}`.red);
                });
        });

        divInvSlot.append(imgItem);
        divInvSlot.append(divInvSlotDescr);
        divUse.append(useItem);
        divUse.append(dropItem);
        divInvSlot.append(divUse);
        divInvSlot.append(divItemCount);
        divInvSlot.appendTo('.slots');
    });
});

rpc.register('item:reload', function(args) {
    let itemsAroundContainer = $('.items-around-container');
    itemsAroundContainer.text('');

    const itemsArray = args[0];
    const shapeId = args[1];

    itemsArray.forEach(item => {
        const type = item.type;
        const itemKey = item.key;
        const name = item.name;

        let itemsAroundSlot = $('<div>', {class: 'items-around-slot', 'data-key': itemKey}); // 'data-id': index
        let imgItem = $('<img>', {src: `images/${itemKey}.png`, class: 'item'});
        let itemsAroundDescription = $('<div>', {class: 'items-around-description', text: name});

        itemsAroundSlot.on('click', function() {
            dataKey = $(this).attr('data-key');
            let data = {key: dataKey, shapeId};
            rpc.callServer('item:take', data)
                .then(_ => null)
                .catch(_ => null);
        });

        imgItem.appendTo(itemsAroundSlot);
        itemsAroundDescription.appendTo(itemsAroundSlot);
        itemsAroundSlot.appendTo(itemsAroundContainer);
    });
});

/*
    id: NUMBER(delete one item at inventory) 
        NULL(delete all items at inventory)
*/
rpc.register('item:clear', function() {
    $('.items-around-slot').remove();
});