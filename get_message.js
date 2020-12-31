




get_dateTime = function()
{
    var dateTime= new Date();
    var date=  dateTime.toISOString().slice(0, 10).replace('T', ' ');

    var seconds = dateTime.getSeconds();
    
    if(seconds<10){
        seconds = '0'+seconds;
    } 
    var time = dateTime.getHours()+":"+dateTime.getMinutes()+":"+seconds;
    dateTime = date +" "+time;
    return dateTime;
}


get_message = function() 
{
    newMessage = document.getElementById("Send_Message_Box").value;

    

    
    
    let dateTime = get_dateTime();

    var z_no = sessionStorage.getItem('client_z_no');

    var group_id =sessionStorage.getItem("groupID");
    
    console.log(dateTime);


    var newMessageJson = {
        'newMessage': newMessage,
        'z_no' : z_no,
        'group_id' : group_id,
        'dateTime' : dateTime,
    };

    
    

    document.getElementById("Send_Message_Box").value = "";

    $.ajax({
            url: './php/SendMessage.php',
            method: 'POST',
            data: newMessageJson,
           

        })
        .done(function(data) {
            //log data to the console so we can see
            console.log("message recieved...");

            
        })
        ;
};



$(document).ready(function () {
  
    $("#Send_Message_Btn" ).click(function () {

        get_message();
    });
    
    $('#Send_Message_Box').keydown(function (e){
        if(e.keyCode == 13){
            console.log(document.getElementById("Send_Message_Box").value);
            
            //prevents the new line charactetr (\n) being used in the text area
            //when enter is pressed
            e.preventDefault();

            //this function will pass the message to the database
            get_message();


            
        }
    });
});