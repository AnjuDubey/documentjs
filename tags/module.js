steal(function() {
	/**
	 * @constructor documentjs/tags/module @module
	 * @parent DocumentJS
	 * 
	 * Adds to another plugin. 
	 * 
	 * ###Example:
	 * 
	 * @codestart
	 * /**
	 *  * @tag core
	 *  * @plugin jquery/controller
	 *  * @download jquery/dist/jquery.controller.js
	 *  * @test jquery/controller/qunit.html
	 *  * ...
	 *  *|
	 *  $.Class.extend("jQuery.Controller",
	 * @codeend
	 * 
	 * ###End Result:
	 * 
	 * @image site/images/plugin_tag_example.png
	 */
	return {
		add: function( line ) {
			this["module"] = line.match(/@module ([^ ]+)/)[1];
		}
	}
})