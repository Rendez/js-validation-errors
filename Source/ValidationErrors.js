/*
---
description:     ValidationErrors v0.1 - Errors Object Handler.

author:
  - Luis Merino (http://luismerino.name)

license:
  - MIT-style license

requires:
  core/1.2.4:   '*'

provides:
  - ValidationErrors
...
*/

(function(){

var ValidationErrors = function(){
	var params = Array.flatten($A(arguments));
	this.element = params.shift();
	this.errors = params;
};

var F = ValidationErrors;

ValidationErrors.prototype = {
	
	set: function(){
		F.apply(this, arguments);
		var container = new Element('div', {'class': 'errors errors-text'});
		this.errors.each(function(error){
			container.adopt(new Element('span', {'class': 'error-label'}).adopt(
				new Element('span', {'class': 'error-msg', 'text': error}),
				new Element('span', {'class': 'ie-shadow'})
			))
		});
		this.element.getParent('div').addClass('error-group');
		container.inject(this.element.addClass('error-input'), 'after');
		
		return this.element;
	},
	
	assign: function(context){
		this.context = document.id(context);
		
		return this;
	},
	
	reset: function(){
		var doc = this.context || document.body;
		doc.getElements('div.errors').dispose();
		doc.getElements('.error-input').removeClass('error-input');
		
		return this;
	},
	
	remove: function(){
		F.apply(this, arguments);
		try {
			var content = this.element.getNext();
			if(content.hasClass('errors')) {
				content.dispose();
			}
		} catch(e){}
		this.element.removeClass('error-input');
	}
};

this.ValidationErrors = new ValidationErrors();

})();