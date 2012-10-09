# DocumentJS

There are several reasons why documentation is important:

* As apps grow, source code becomes complex and difficult to maintain.
* It's beneficial for customers because it helps to educate them on a product.
* Perhaps most importantly, it keeps a project going by bringing new developers up to speed - while also keeping the whole team on the same page.

DocumentJS is a new documentation solution for JavaScript applications. It makes creating, viewing, and maintaining documentation easy and fun. Out of the box, it features:

* Fexible organization of your documentation
* An integrated documentation viewer where you can search your API
* Markdown support
* An extensible architecture

DocumentJS provides powerful and easy to extend documentation functionality.
It's smart enough to guess 
at things like function names and parameters, but powerful enough to generate 
<span class='highlight'>JavaScriptMVC's entire website</span>!

## Organizing your documentation

Let's use an hypothetical little CRM system as an example of how easy it is to organize your documentation with DocumentJS.

First let's create our CRM documentation home page by creating a folder name __crm__. Paste this code into a file named __crm.js__ inside __crm__ folder.

    /*
     * @@page index CRM
     * @@tag home
     *
     * ###Little CRM
     *
     * Our little CRM only has two classes:
     *
     * * Customer
     * * Order
     */

Run the documentjs script to generate the docs:

    documentjs/doc.bat crm

This is what you should see when you open __crm\docs.html__:

![demo](jmvc/images/crm_doc_demo_1.png)

There are a few things to notice:

* The example closes comments with _*/_.  You should close them with / instead of |.
* We create a link to another class with _[Animal | here]_. 
* We used the @@page directive to create the crm documentation home page. Don't worry about the @@tag directive for now, we'll get back to it later. 
* In all the examples in this walkthrough we use markdown markup instead of html to make the documentation more maintainable and easier to read .

Next we document the two classes that make our little crm system. Paste each snippet of code into two files with names __customer.js__ and __order.js__:

__customer.js__

    /*
     * @@class Customer
     * @@parent index
     * @@constructor
     * Creates a new customer.
     * @@param {String} name
     */
     var Customer = function(name) {
        this.name = name;
     }

__order.js__

    /*
     * @@class Order
     * @@parent index
     * @@constructor
     * Creates a new order.
     * @@param {String} id
     */
     var Order = function(id) {
        this.id = id;
     }

After runnig the documentjs script once again you should be able to see this:

@image jmvc/images/crm_doc_demo_2.png


We want to be able to both look for our customer's orders and dispatch them so let's add a _findById_ method to our Order class
and a _dispatch_ method to our Order's prototype:

__order.js__

/*  
 * @class Order 
 * @parent crm 
 * @@constructor
 * Creates a new order.
 * @@param {String} id
 */
var Order = function(id) {
    this.id = id;
}

$.extend(Order,
/*
* @@static
*/
{
   /*
    * Finds an order by id.
    * @@param {String} id Order identification number.
    * @@param {Date} [date] Filter order search by this date.
    */
    findById: function(id, date) {
     *
    }
 });
     *
$.extend(Order.prototype,
/*
 * @@prototype
 */
 {
    /*
Dispatch an order.
@@return {Boolean} Returns true if order dispatched successfully.
     */
     dispatch: function() {
    
     }
});
@codeend

Go ahead and produce the docs by running the documentjs script. You should see your Order methods organized by static and protoype categories.

There's one last thing we need to cover - customizing the document viewer template. The default viewer template file name is __summary.ejs__ and it's
located in __documentjs/jmvcdoc/summary.ejs__. You can use a customized template by copying __summary__.ejs into the __crm__ folder and changing it 
according to your needs. Let's try changing the navigation menu __core__ item to __crm__:

@codestart
&lt;li class="ui-menu-item"&gt;
    &lt;a class="menuLink" href="#&amp;search=crm"&gt;&lt;span class="menuSpan"&gt;CRM&lt;/span&gt;&lt;/a&gt;
&lt;/li&gt;
@codeend
	 *
Remember the @@tag directive? We can now change it in our examples from _core_ to _crm_. You will notice that our crm page will show up
every time you click the CRM menu item or type _crm_ in the documentation viewer search box.

If you need for DocumentJS not to document a particular script you can do that by adding the @document-ignore directive to the top of the file. 

As you see DocumentJS makes it super easy and fun to organize your documentation!

###How DocumentJS works

DocumentJS architecture is organized around the concepts of [DocumentJS.types | types] and [DocumentJS.tags | tags]. Types are meant to represent every javascript construct 
you might want to comment like classes, functions and attributes. Tags add aditional information to the comments of the type being processed.

DocumentJS works by loading a set of javascript files, then by spliting each file into type/comments pairs 
and finally parsing each type's comments tag directives to produce a set of jsonp files (one per type) 
that are used by the document viewer (jmvcdoc) to render the documentation.

DocumentJS was written thinking of extensibility and it's very easy to add custom type/tag directives to handle your specific documentation needs.
	 *
DocumentJS currently requires [stealjs Steal] to be included on the pages you are documenting.   

###Type directives

* [DocumentJS.types.page | @page] -  add a standalone page.
* [DocumentJS.types.attribute | @attribute] -  document values on an object.
* [DocumentJS.types.function | @function] - document functions.
* [DocumentJS.types.class| @class] - document a class. 
* [DocumentJS.types.prototype | @prototype] - add to the previous class or constructor's prototype functions.
* [DocumentJS.types.static | @static] - add to the previous class or constructor's static functions.
* [DocumentJS.types.add |@add] - add docs to a class or construtor described in another file.

###Tag directives

* [DocumentJS.tags.alias|@alias] - another commonly used name for Class or Constructor.
* [DocumentJS.tags.author|@author] - author of class.
* [DocumentJS.tags.codestart|@codestart] -> [DocumentJS.tags.codeend|@codeend] - insert highlighted code block.
* [DocumentJS.tags.constructor | @constructor] - documents a contructor function and its parameters.
* [DocumentJS.tags.demo|@demo] - placeholder for an application demo.
* [DocumentJS.tags.download|@download] - adds a download link.
* [DocumentJS.tags.iframe|@iframe] - adds an iframe with example code.
* [DocumentJS.tags.hide|@hide] - hide in Class view.
* [DocumentJS.tags.inherits|@inherits] - what the Class or Constructor inherits.
* [DocumentJS.tags.parent|@parent] - says under which parent the current type should be located. 
* [DocumentJS.tags.param|@param] - A function's parameter.
* [DocumentJS.tags.plugin|@plugin] - by which plugin this object gets steald.
* [DocumentJS.tags.return|@return] - what a function returns.
* [DocumentJS.tags.scope|@scope] - forces the current type to start scope.
* [DocumentJS.tags.tag|@tag] - tags for searching.
* [DocumentJS.tags.test|@test] - link for test cases.
* [DocumentJS.tags.type|@type] - sets the type for the current commented code.
* [DocumentJS.tags.image|@image] - adds an image.


###Inspiration

DocumentJS was inspired by the [http://api.jquery.com/ jQuery API Browser] by [http://remysharp.com/ Remy Sharp]


@param {Array|String} scripts an array of script objects that have src and text properties like:
@codestart
[{src: "path/to/file.js", text: "var a= 1;"}, { ... }]
@codeend
@param {Object} options an options hash including

  . name - the name of the application
  . out - where to generate the documentation files
	 */