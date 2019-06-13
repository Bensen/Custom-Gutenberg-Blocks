( function( blocks, editor, element, components ) {

    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var RichText = editor.RichText;
    var InnerBlocks = editor.InnerBlocks;
    
    var InspectorControls = editor.InspectorControls;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;

    /**
     * Every block starts by registering a new block type definition.
     * @see https://wordpress.org/gutenberg/handbook/block-api/
     */
    registerBlockType( 'custom-gutenberg-blocks/accordion-card', {
        title: 'Akkordeon Eintrag',
        description: 'Ein eigenständiger Akkordeon Eintrag. 1) Muss innerhalb eines Akkordion Container-Blocks platziert werden. 2) Muss einen Anker-Link hinterlegt bekommen.',
        icon: 'align-center',
        category: 'bootstrap',
        keywords: [ 'bootstrap', 'accordion', 'akkordion' ],
        attributes: {
            title: {
                type: 'array',
                source: 'children',
                selector: 'a',
            },
            anchor: {
                type: 'string',
            },
            parent: {
                type: 'string',
                default: 'accordion',
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
						initialOpen: true,
                        },
						el( TextControl, {
							type: 'text',
							label: 'Anker',
							placeholder: 'Bsp: faq-kosten, norddeutschland, ...',
							value: attributes.anchor,
							onChange: function( value ) {
								props.setAttributes( { anchor: value } );
							},
                        } ),
                        el( TextControl, {
							type: 'text',
							label: 'Container',
							placeholder: 'Bsp: faq, erwachsene, ...',
							value: attributes.parent,
							onChange: function( value ) {
								props.setAttributes( { parent: value } );
							},
                        } ),
                    ),
                ),

                // Block Backend
                el( 'div', { className: 'card' },
                    // Card Header
                    el( 'div', { className: 'card-header' },
                        el( RichText, {
                            tagName: 'a',
                            className: 'h4',
                            placeholder: 'Akkordion Title',
                            keepPlaceholderOnFocus: true,
                            value: attributes.title,
                            isSelected: true,
                            onChange: function( value ) {
                                props.setAttributes( { title: value } );
                            },
                        } ),
                    ),
                    // Card Body
                    el( 'div', { className: 'collapse show' },
                        el( 'div', { className: 'card-body' },
                            el ( InnerBlocks ),
                        )
                    ),
                )
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
                el( 'div', { className: 'card' },
                    // Card Header
                    el( 'div', {
                        id: attributes.anchor,
                        className: 'card-header',
                        },
                        el( RichText.Content, {
                            tagName: 'a',
                            className: 'h4 collapsed',
                            href: '#' + attributes.anchor,
                            'data-toggle': 'collapse',
                            'data-target': '#' + attributes.anchor + '-body',
                            'aria-expanded': 'false',
                            'aria-controls': attributes.anchor,
                            value: attributes.title,
                        } ),
                    ),
                    // Card Body
                    el( 'div', {
                        id: attributes.anchor + '-body',
                        className: 'collapse',
                        'aria-labelledby': attributes.anchor,
                        'data-parent': '#' + attributes.parent,
                        },
                        el( 'div', { className: 'card-body' },
                            el ( InnerBlocks.Content ),
                        )
                    )
                )
            );
        },
    } )
} )(
    window.wp.blocks,
    window.wp.editor,
    window.wp.element,
    window.wp.components,
);