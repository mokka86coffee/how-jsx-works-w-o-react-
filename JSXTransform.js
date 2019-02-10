export default function JSXTransform(tag, attrs, ...children) {
    /**
     * Checking if we receive usual html Tag or smth else
     */
    let node = typeof tag == 'function' 
        /**
         * if we've got Class or Function "tag",
         *  we need to apply its method to get HTML
         */
        ? (new tag()).create()  
        /**
         * create JS DOM element from "tag" variable
         */
        : document.createElement(tag); 
    /** End of checking */

    /**
     * applying attributes to the nodeElement (such as funcs/name/type/etc..) 
    */
    for (let attr in attrs) { node.setAttribute(attr,attrs[attr]); } 
    /** End of applying Attributes */

    /**
     * checking child elements if it's a DOM element or just text,
     * then appending them to the "tag" Node
     */
    children.forEach(elem=>{
        if (elem instanceof String) {
            node.append(document.createTextNode(elem))
        }  else { node.append(elem) }
    });
    /**End of appending children */

    return node;
}
