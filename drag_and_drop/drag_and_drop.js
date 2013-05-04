if ((window.File && window.FileReader && window.FileList && window.Blob) === undefined){
    alert('The File APIs are not fully supported in this browser.');
}

console.log("loaded");
var T = null;

var DragAndDrop = {
    initialize: function(){
	this.preview  = document.getElementById('preview');
	this.droparea = document.getElementById('droparea');
	this.droparea.addEventListener('dragover', this.handleDragOver, false);
	this.droparea.addEventListener('drop', this.handleFileSelect, false);
	document.onclick = function(e){
	    var el = e.target;
	    if((el.className === "close") && (el.nodeName === "A")){
		DragAndDrop.remove(el);
	    }
	};
    },

    handleDragOver: function(evt){
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = "copy";
    },

    handleFileSelect: function(evt){
	evt.stopPropagation();
	evt.preventDefault();
	var files = evt.dataTransfer.files;
	var output = [];

	for (var i=0, f; f=files[i]; i++){
	    if (!f.type.match('image.*')) { continue; }
	    DragAndDrop.setPreview(f);
	}
    },

    setPreview: function(image){
	var reader = new FileReader();
	reader.onload = (function(theFile) {
            return function(e) {
		var span = document.createElement('span');
		span.innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', escape(theFile.name),
				  '"/><a class="close" href="javascript:void(0)">x</a>'].join('');
		DragAndDrop.preview.insertBefore(span, null);
            };
	})(image);
	reader.readAsDataURL(image);
    },

    remove: function(el){
	el.parentElement.remove();
    }
};

window.onload = function(){
    DragAndDrop.initialize();
}
