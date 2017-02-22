var $teachers = $("strong.hidden-xs");
var output = "{"
$teachers.each( function() {
 // { ... , "name":{"id":"1234", "rating": "1.23"} , ... }
 var temp = $(this).text().trim().replace(/\n/g," ").replace(/ {1,}/g," ");
 var name = temp.slice(0, -4);
 var rating = temp.slice(-4);
 var id = $(this).parent().parent().parent().parent().parent().attr("href").split("=")[1];
 output = output + ("\"" + name + "\":{\"id\":\"" + id + "\",\"rating\":\"" + rating + "\"},")
})
output = output.slice(0,-1);
console.log(output + "}")