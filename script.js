
$(document).ready(function(){
    let start = false;
    let friendlist = [];
    $(".chat").hide();
    $("#boxbtn").on("mouseup",(function(){
        var person=  prompt("Please enter a name");
        if(person!=null)
        {
            Cekkembar(person);
        }
    }));
    $(".sendbutton").click(function(){
        buttonsend();
        loadchat($('.headerchatbox').html()); 
    });
    $(document).on('keyup',function(e){
        if (e.key == "Escape") {
            $(".chat").hide();
            $(".headerchatbox").html("");
    }
    });
    $(document).on("click",".afriend",(function()
    {
        var tes = $(this).attr('friend-name');
        $(".chat").show(); 
        loadheader(tes);
        loadchat(tes);       
    }));
    function updateScroll(){
var element =$(".chatbox");
var $target = element; 
$target.animate({scrollTop: $(".chatbox").prop('scrollHeight')}, 500);
}
   function loadheader(name)
   {
    $(".headerchatbox").html(name);
   }
   function loadmessage(name)
   {
       let chat = [];
       for (var i=0; i<friendlist.length;i++)
       {
           if(friendlist[i].id==name)
           {
            chat = friendlist[i].chats;
           }
       }   
   }
   function buttonsend()
   {
       var name=$(".headerchatbox").html();
       for(var i =0; i<friendlist.length;i++)
        {
            if(friendlist[i].id==name)
            {
                if(typeof friendlist[i].chats==='undefined')
                {
                    var textchat = $(".inputbox").val();
                    console.log('tidak bisa');
                     friendlist[i].chats=([{id:"right",message:textchat,read:1}]);
                }else{
                    var textchat = $(".inputbox").val();
                    
                    friendlist[i].chats.push({id:"right",message:textchat,read:1});
                    console.log('bisa');
                }
                  changerecent(textchat,friendlist[i].id);
            }
        }
   }
   function startrandom()
   {
      
        if(friendlist.length==0)
        {
            
        }else{
            setInterval(addrandommessage,3000);
            
        }
   }
   function addrandommessage()
   { 
        var chatlist = ['hello','how are you','thank you','Im home','i aware you','see you'];
        var randoma= Math.floor(Math.random() * 5); 
        var randomb= Math.floor(Math.random() * friendlist.length); 
        for(var i =0; i<friendlist.length;i++)
        {
            if(i==randomb)
            {
                 if($(".headerchatbox").html()==friendlist[i].id)
                 {
                    if(typeof friendlist[i].chats==='undefined')
                    {
                        friendlist[i].chats=([{id:"left",message:chatlist[randoma],read:1}]);
                    }else{
                        friendlist[i].chats.push({id:"left",message:chatlist[randoma],read:1});
                    }
                     loadchat(friendlist[i].id);
                 }else{
                    if(typeof friendlist[i].chats==='undefined')
                    {
                        friendlist[i].chats=([{id:"left",message:chatlist[randoma],read:0}]);
                    }else{
                        friendlist[i].chats.push({id:"left",message:chatlist[randoma],read:0});
                    }
                 }
                 changerecent(chatlist[randoma],friendlist[i].id);
            }
        }
   }
   function Cekkembar(person){
    if(friendlist.length>0)
    {
        let ada = false;
        for(var i = 0; i<friendlist.length;i++)
        {
            if(friendlist[i].id==person)
            {
                ada = true;
            }
        }
        if(ada==true)
        {
            alert('tidak boleh masuk nama kembar');
        }else{
           
            friendlist.push({id:person,recent:""});
            if(start==false)
            {
                startrandom();
                start = true;
            }
        loadfriend();
        }
    }else{
       
        friendlist.push({id:person,recent:""});
        if(start==false)
            {
                startrandom();
                start = true;
            }
        loadfriend();
    }
   }
   function changerecent(chatrecent,nama)
   {
        for(var i=0;i<friendlist.length;i++)
        {
            if(friendlist[i].id==nama)
            {            
                friendlist[i].recent = chatrecent;
                var b = friendlist[0];
                friendlist[0]=friendlist[i];
                friendlist[i]=b;
                loadfriend();
                break;
            }
        }
   }
   function loadchat(name)
   {
        for(var i=0; i<friendlist.length;i++)
        {
            if(friendlist[i].id == name)
            {
                if(typeof friendlist[i].chats==='undefined')
                {  
                }else{
                   
                   $(".chatbox").empty();
                   for(var k=0; k<friendlist[i].chats.length;k++)
                   {
                       friendlist[i].chats[k].read=1;
                    
                      var m= '<div class="message '+friendlist[i].chats[k].id+'">' + friendlist[i].chats[k].message+'</div>';
                       $(".chatbox").append(m);
                   }
                  updateScroll();
                }
            }
        }
   }
   function loadfriend()
   {
    $(".flist").empty();
    for(var i =0; i<friendlist.length;i++)
    {
        var counter = 0;
        if(typeof friendlist[i].chats==='undefined')
        {

        }else
        {
            for(var j=0;j<friendlist[i].chats.length;j++)
            {
                if(friendlist[i].chats[j].read==0)
                {
                    counter+=1;
                }
            }
        }
        if(counter>0)
        {
            var html = '<div class="afriend" friend-name='+friendlist[i].id+'>'+ "<h3 class='Fname'>"+friendlist[i].id+ "<div class='bullet'>"+counter.toString()+"</div>" +"</h3>"+'<p class="recentchat">'+
                   friendlist[i].recent 
            +'</p>' + "</div>";
        }else{
            var html = '<div class="afriend" friend-name='+friendlist[i].id+'>'+ "<h3 class='Fname'>"+friendlist[i].id +"</h3>"+'<p class="recentchat">'+
                   friendlist[i].recent 
            +'</p>' + "</div>";
        }
        $(".flist").append(html);
    }
   }
});