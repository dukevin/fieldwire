var currentProject = "";
$(document).ready(function() {
	populate_projects();
	//populate_files();
	$("#newProject").click(function() {
		showPopup("newProject");
	});
	$("#dialoge .closeBtn").click(function(){
		$("#overlay").fadeOut(200);
	});
	$("#fileupload").click(function(){
		upload();
	});
	$("#logout").click(function(){
		logout();
	})
	bindPopup();
});
function logout() 
{
	if(confirm("Reset all projects?"))
	{
		$.ajax({
		url: "reset.php",
		type: "post",
		success: function(res) {
			location.reload();
		}
	});
	}
}
function populate_projects()
{
	$.ajax({
		url: "getProjects.php",
		type: "post",
		success: function(res) {
			if(res == false || res.length==0) {
				$("#none").html("Nothing here! Upload a new file");
				return;
			}
			var projs = res.split("\n");
			projs.forEach(function(e) {
				if(e.length == 0)
					return;
				var newElem = $("<div class='project'>"+e+"</div>");
				newElem.insertAfter("#sidebar #newProject");
				$("#none").html("Click a project from the side");
				$(newElem).click(function(){
					$(".project").removeClass("selected");
					$(this).addClass("selected");
					currentProject = e;
					populate_files(e);
					$(".fileinput").fadeIn(200);
				});
			});
		}
	});
}
function populate_files(project)
{
	$("#content").html('');
	$.ajax({
		url: "getFiles.php",
		type: "post",
		data: {"project" : project},
		success: function(res) {
			$("#content").html('<div id="none">No files here! Click upload</div>');
			files = JSON.parse(res);
			$("#content").html("");
			jQuery.each(files, function(key,val){
				$("#content").append('<a href="fileupload/files/'+val.name+'"><div class="file" style="background-image: url(\'fileupload/files/thumbnail/'+val.name+'\'")>\
				                     <div class="name">'+val.display+'</div></div></a>');
			});
		}
	});
}
function upload()
{
	$(function () {
		$('#fileupload').fileupload({
			dataType: 'json',
			url: "fileupload/index.php?proj="+currentProject+"",
			add: function (e, data) {
				if(currentProject == "")
				{
					alert("No project is selected");
					return;
				}
				$('#progress .bar').css('transition','1s all');
				data.context = $('<button/>').text('Upload')
				.appendTo(document.body)
				.click(function () {
					data.context = $('<p/>').text('Uploading').replaceAll($(this));
					data.submit();
				});
				data.context = $('<p/>').text('Uploading').appendTo(document.body);
				data.submit();
				console.log(e);
				console.log(data);
			},
			done: function (e, data) {
				var files = [];
				$.each(data.result.files, function (index, file) {
					files.push(file.name);
				});
				index_files(files);
			},
			progressall: function (e, data) {
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#progress .bar').css('width',progress + '%');
			}
		});
	});
}
function showPopup(key)
{
	var data = (function() {
		switch(key) {
			case "newProject":
				return {
					"title" : "New Project",
					"description" : "Project name",
					"inputName" : "projectName",
					"submitText" : "Create"
				};
		}
	})(key);
	$("#dialoge-content").html('\
		<h2>'+data.title+'</h2>\
		<form>\
			<div class="popContent-full"><label>'+data.description+'</label>\
			<input name="'+data.inputName+'" type="text">\
			<div class="popContent-btn"><input type="submit" name="'+key+'" class="button" value="'+data.submitText+'"></div>\
		</form>\
	');

	bindPopup();

	$("#overlay").fadeIn(200);
}
function bindPopup()
{
	$("#dialoge form").on('click', 'input[type=submit]', function(e) {
		e.preventDefault();
		$(this.form).data('clicked', this.name);
		$.ajax({
			url: "addProject.php",
			type: "post",
			data: unescape($(this.form).serialize()),
			success: function(res) {
				if(res == "fail")
					alert(res);
				if(res == "success") {
					$("#sidebar .project").remove();
					populate_projects();
				}
				$("#overlay").fadeOut(200);
			}
		});
	}); 
}
function index_files(arr)
{
	$.ajax({
		url: "index_files.php?proj="+currentProject,
		type: "post",
		data: {"name" : arr},
		success: function(res) {
			populate_files(currentProject);
			$('#progress .bar').css('transition','0s all');
			$('#progress .bar').css('width','0%');
		}
	});
}