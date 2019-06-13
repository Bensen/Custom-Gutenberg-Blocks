( function( blocks, editor, element, components ) {

	var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var InnerBlocks = editor.InnerBlocks;
    
    var InspectorControls = editor.InspectorControls;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    
    /**
     * Every block starts by registering a new block type definition.
     * @see https://wordpress.org/gutenberg/handbook/block-api/
     */
    registerBlockType( 'custom-gutenberg-blocks/accordion-container', {
        title: 'Akkordeon Container',
        description: 'Ein Akkordeon Container. Muss weitere Akkordeon Einträge enthalten.',
		icon: 'list-view',
        category: 'bootstrap',
        keywords: [ 'bootstrap', 'accordion', 'akkordeon' ],
        attributes: {
            cssID: {
                type: 'string',
                default: 'accordion'
            },
        },
        supports: {
            className: false,
        },

        /**
         * The edit function describes the structure of your block in the context of the editor.
         * This represents what the editor will render when the block is used.
         * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#edit
         *
         * @param {Object} [props] Properties passed from the editor.
         * @return {Element}       Element to render.
         */
        edit: function( props ) {
            var attributes = props.attributes;
            
            return [
                // Inspector Controls
                el( InspectorControls, { key: 'inspector' },
					el( PanelBody, {
						title: 'Einstellungen',
						initialOpen: false,
                        },
						el( TextControl, {
							type: 'text',
							label: 'CSS ID',
							placeholder: 'Bsp: faq, erwachsene, ...',
							value: attributes.cssID,
							onChange: function( value ) {
								props.setAttributes( { cssID: value } );
							},
                        } ),
                    ),
                ),

				// Block Backend
				el( 'div', {
                    id: attributes.cssID,
                    className: 'accordion',
                    },
                    el ( InnerBlocks ),
                ),
			];
        },

        /**
         * The save function defines the way in which the different attributes should be combined
         * into the final markup, which is then serialized by Gutenberg into `post_content`.
         * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#save
         *
         * @return {Element}       Element to render.
         */
        save: function( props ) {
            var attributes = props.attributes;
            
            return (
                // Block Frontend
                el( 'div', {
                    id: attributes.cssID,
                    className: 'accordion',
                    },
                    el ( InnerBlocks.Content ),
                )
            );
		}
	} )
} )(
    window.wp.blocks,
	window.wp.editor,
	window.wp.element,
	window.wp.components
);