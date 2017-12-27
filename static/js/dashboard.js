$(function() {
    $('#btnLogin').click(function() {
 
        $.ajax({
            url: '/dashboard',
            data: $('form').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    $('tbody tr').click(function(event) {
        tr = event.target.closest('tr');
        $('#modal_text').text('<script type="text/javascript" src="https://scbm-betchili.rhcloud.com/cbmpop?id='+tr.id+'"></script>');
        $('#myModal').modal('toggle');
    });

    $('.editItem').click(function(event) {
        tr = event.target.closest('tr');
        event.stopPropagation();

        $.ajax({
            url: '/get_publisher',
            data: {'subid': tr.id},
            type: 'POST',
            success: function(response) {
                data = response['data'];
               if (data != null) {
                $('#id').val(data[0]);
                $('#name').val(data[1]);
                $('#subid').val(data[2]);
                $('#feedid').val(data[3]);
                $('#feedauth').val(data[4]);
                $('#delay').val(data[5]);
                $('#max').val(data[6]);
                $('#period').val(data[7]);
                $('#def_url').val(data[8]);
               }
               $('#headerText').text('Edit publisher info');
               $('#editModal').modal('toggle');
            },
            error: function(error) {
                console.log(error);
            }
        });
        
     });

    $('.delItem').click(function(event) {
        tr = event.target.closest('tr');
        event.stopPropagation();

        $.ajax({
            url: '/delete_publisher',
            data: {'subid': tr.id},
            type: 'POST',
            success: function(response) {
                data = response['data'];
                if (data) {
                    location.reload();
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
        
     });


    $('#newPub').click(function(event) {
                $('#name').val('');
                $('#subid').val('');
                $('#feedid').val('');
                $('#feedauth').val('');
                $('#delay').val('');
                $('#max').val('');
                $('#period').val('');
                $('#def_url').val('');
                $('#id').val('');
                $('#headerText').text('Create new publisher');
        $('#editModal').modal('toggle');
    });

    $('#saveBtn').click(function(event) {
        data = {
                    'name' : $('#name').val(),
                    'subid' : $('#subid').val(),
                    'feedid' : $('#feedid').val(),
                    'feedauth' : $('#feedauth').val(),
                    'delay' : $('#delay').val(),
                    'max' : $('#max').val(),
                    'period' : $('#period').val(),
                    'default_url' : $('#def_url').val()
                }
        var id = $('#id').val();
        if (id != '') {
            data['id'] = id;
        }
        for (var f in data) {
            if (f != 'default_url' && data[f] == '') {
                alert('All fields are required except "Def URL"');
                return false;
            }
        }
        $.ajax({
            url: '/save_publisher',
            data: data,
            type: 'POST',
            success: function(response) {
                if (response['data']) {
                    location.reload();
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
        
     });

});