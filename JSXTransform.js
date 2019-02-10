export default function JSXTransform(tag, attrs, ...children) {
    /**
     * Checking if we receive usual html Tag or smth else
     */
    let node = typeof tag === 'function' 
        /**
         * if we've got Class or Function "tag",
         * we need to apply its method to get HTML
         * JSX is smart enough for 'render()' method,
         * you can implement Class as Function, if it has one
         */
        ? (new tag()).createHTML()  // Class
        //? tag() // Function
        /**
         * create JS DOM element from "tag" variable
         */
        : document.createElement(tag); 
    /** End of checking */

    /**
     * applying attributes to the nodeElement (such as funcs/name/type/etc..) 
     * it seems like data/aria attributes don't assign as it suppose to be,
     * so the best way is to loop through (obj) and set them
    */
    for (let attr in attrs) { 
        if ((/^(data|aria)/g).test(attr)) { node.setAttribute(attr,attrs[attr]) }
        else { Object.assign(node, {[attr]:attrs[attr]}) }
    } 
    /** End of applying Attributes */

    /**
     * checking child elements if it's a DOM element or just text,
     * then appending them to the "tag" Node
     */
    children.forEach(elem=>{
        if (typeof elem === 'string') {
            node.append(document.createTextNode(elem))
        }  else { node.append(elem) }
    });
    /**End of appending children */

    return node;
}
