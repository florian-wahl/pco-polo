<!DOCTYPE html PUBLIC "-//W3C//  DTD HTML 4.01//EN"
    "http://www.w3.org/TR/html4/strict.dtd">;
<html>
<head>
    <meta content="text/html; charset=iso-8859-1" http-equiv="Content-Type">
    <title>Address book</title>
    <?php include 'php/header.php'; ?>
    <script type="application/javascript">
        $(function() {
            $('#update-target a').click(function() {
                $.ajax({
                    type: "GET",
                    url: "data/template_quizz.xml",
                    dataType: "xml",
                    success: function(xml) {
                        $(xml).find('question').each(function(){
                            var id_text = $(this).attr('id');
                            var name_text = $(this).find('intitule').text();


                            $('<li></li>')
                                .html(name_text + ' (' + id_text + ')')
                                .appendTo('#update-target ol');

                            $(this).find('reponses').each(function(){
                                $(this).find('reponse').each(function(){
                                    var intituleReponse = $(this).text();
                                    var estCorrecte = $(this).attr('isTrue');
                                    $('<li></li>')
                                        .html(intituleReponse + ' (' + estCorrecte + ')')
                                        .appendTo('#update-target ol');
                                });

                            });
                        }); //close each(
                    }
                }); //close $.ajax(
            }); //close click(
        }); //close $(
    </script>
</head>
<body>
<p>
    <div id='update-target'>
    <a href="#">Click here to load addresses</a>
    <ol></ol>
</div>
</p>
</body>
</html>