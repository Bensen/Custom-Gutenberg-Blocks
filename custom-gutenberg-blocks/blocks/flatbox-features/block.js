( function( blocks, editor, element, components ) {

    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var BlockControls = editor.BlockControls;
    var RichText = editor.RichText;

    var InspectorControls = editor.InspectorControls;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;

    /**
     * Every block starts by registering a new block type definition.
     * @see https://wordpress.org/gutenberg/handbook/block-api/
     */
    registerBlockType( 'custom-gutenberg-blocks/flatbox-features', {
        title: 'Flatbox Features',
        description: 'Full Width Hintergrund mit drei Flatboxen drinnen.',
        icon: 'star-filled',
        category: 'flatbox',
        keywords: [ 'flatbox', 'feature', 'boxen' ],
        attributes: {
            iconLeft: {
                type: 'string',
                default: 'fa fa-pencil-alt',
            },
            titleLeft: {
                type: 'array',
                source: 'children',
                selector: '.first-headline',
            },
            contentLeft: {
                type: 'array',
                source: 'children',
                selector: '.first-content',
            },
            urlLeft: {
                type: 'string',
                source: 'attribute',
                selector: '.first-link',
                attribute: 'href',
            },

            iconMiddle: {
                type: 'string',
                default: 'fa fa-pencil-alt',
            },
            titleMiddle: {
                type: 'array',
                source: 'children',
                selector: '.second-headline',
            },
            contentMiddle: {
                type: 'array',
                source: 'children',
                selector: '.second-content',
            },
            urlMiddle: {
                type: 'string',
                source: 'attribute',
                selector: '.second-link',
                attribute: 'href',
            },

            iconRight: {
                type: 'string',
                default: 'fa fa-pencil-alt',
            },
            titleRight: {
                type: 'array',
                source: 'children',
                selector: '.third-headline',
            },
            contentRight: {
                type: 'array',
                source: 'children',
                selector: '.third-content',
            },
            urlRight: {
                type: 'string',
                source: 'attribute',
                selector: '.third-link',
                attribute: 'href',
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
						title: 'Icons',
						initialOpen: true,
                        },
                        // TODO: Background Color Picker
						el( 'a', {
							href: 'https://fontawesome.com/icons?d=gallery&m=free', // TODO: Icon Picker
							target: '_blank',
							},
							el( RichText, { value: 'Icon Galerie öffnen', } ),
						),
						el( TextControl, {
							type: 'text',
							label: 'Icon links',
							placeholder: 'Bsp: fa fa-rocket',
							value: attributes.iconLeft,
							onChange: function( value ) {
								props.setAttributes( { iconLeft: value } );
							},
                        } ),
                        el( TextControl, {
							type: 'text',
							label: 'Icon mitte',
							placeholder: 'Bsp: fa fa-rocket',
							value: attributes.iconMiddle,
							onChange: function( value ) {
								props.setAttributes( { iconMiddle: value } );
							},
                        } ),
                        el( TextControl, {
							type: 'text',
							label: 'Icon rechts',
							placeholder: 'Bsp: fa fa-rocket',
							value: attributes.iconRight,
							onChange: function( value ) {
								props.setAttributes( { iconRight: value } );
							},
						} ),
					),
					el( PanelBody, {
						title: 'Links',
						initialOpen: true,
						},
						el( TextControl, {
							type: 'url',
							label: 'URL links',
							placeholder: 'Bsp: https://',
							value: attributes.urlLeft,
							onChange: function( value ) {
								props.setAttributes( { urlLeft: value } );
							},
                        } ),
                        el( TextControl, {
							type: 'url',
							label: 'URL mitte',
							placeholder: 'Bsp: https://',
							value: attributes.urlMiddle,
							onChange: function( value ) {
								props.setAttributes( { urlMiddle: value } );
							},
                        } ),
                        el( TextControl, {
							type: 'url',
							label: 'URL rechts',
							placeholder: 'Bsp: https://',
							value: attributes.urlRight,
							onChange: function( value ) {
								props.setAttributes( { urlRight: value } );
							},
                        } ),    
					),
                ),
                
                // Block Backend
                el( 'div', { className: 'bg bg-default' },
                    el( 'div', { className: 'row' },
                        el( 'div', { className: 'col-md-4' },
                            el( 'div', { className: 'flatbox flatbox-default' },
                                el( 'a', {
                                    className: 'center-block',
                                    href: attributes.urlLeft,
                                    },
                                    el( 'i', { className: attributes.iconLeft+' fa-3x' } ),
                                    el( RichText, {
                                        tagName: 'span',
                                        className: 'h3',
                                        inline: true,
                                        placeholder: 'Headline',
                                        keepPlaceholderOnFocus: true,
                                        value: attributes.titleLeft,
                                        isSelected: true,
                                        onChange: function( value ) {
                                            props.setAttributes( { titleLeft: value } );
                                        },
                                    } ),
                                    el( RichText, {
                                        tagName: 'p',
                                        placeholder: 'Content',
                                        keepPlaceholderOnFocus: true,
                                        value: attributes.contentLeft,
                                        isSelected: false,
                                        onChange: function ( value ) {
                                            props.setAttributes( { contentLeft: value } );
                                        },
                                    } ),
                                )
                            )
                        ),
                        el( 'div', { className: 'col-md-4' },
                            el( 'div', { className: 'flatbox flatbox-default' },
                                el( 'a', {
                                    className: 'center-block',
                                    href: attributes.urlMiddle,
                                    },
                                    el( 'i', { className: attributes.iconMiddle+' fa-3x' } ),
                                    el( RichText, {
                                        tagName: 'span',
                                        className: 'h3',
                                        inline: true,
                                        placeholder: 'Headline',
                                        keepPlaceholderOnFocus: true,
                                        value: attributes.titleMiddle,
                                        isSelected: false,
                                        onChange: function( value ) {
                                            props.setAttributes( { titleMiddle: value } );
                                        },
                                    } ),
                                    el( RichText, {
                                        tagName: 'p',
                                        placeholder: 'Content',
                                        keepPlaceholderOnFocus: true,
                                        value: attributes.contentMiddle,
                                        isSelected: false,
                                        onChange: function ( value ) {
                                            props.setAttributes( { contentMiddle: value } );
                                        },
                                    } ),
                                )
                            )
                        ),
                        el( 'div', { className: 'col-md-4' },
                            el( 'div', { className: 'flatbox flatbox-default' },
                                el( 'a', {
                                    className: 'center-block',
                                    href: attributes.urlRight,
                                    },
                                    el( 'i', { className: attributes.iconRight+' fa-3x' } ),
                                    el( RichText, {
                                        tagName: 'span',
                                        className: 'h3',
                                        inline: true,
                                        placeholder: 'Headline',
                                        keepPlaceholderOnFocus: true,
                                        value: attributes.titleRight,
                                        isSelected: false,
                                        onChange: function( value ) {
                                            props.setAttributes( { titleRight: value } );
                                        },
                                    } ),
                                    el( RichText, {
                                        tagName: 'p',
                                        placeholder: 'Content',
                                        keepPlaceholderOnFocus: true,
                                        value: attributes.contentRight,
                                        isSelected: false,
                                        onChange: function ( value ) {
                                            props.setAttributes( { contentRight: value } );
                                        },
                                    } ),
                                ),
                            ),
                        ),
                    ),
                )
            ]
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
                el( 'div', { className: 'bg bg-default' },
                    el( 'div', { className: 'container' },
                        el( 'div', { className: 'row' },
                            el( 'div', { className: 'col-md-4' },
                                el( 'div', { className: 'flatbox flatbox-default' },
                                    el( 'a', {
                                        className: 'first-link center-block',
                                        href: attributes.urlLeft,
                                        },
                                        el( 'i', { className: attributes.iconLeft+' fa-3x' } ),
                                        el( RichText.Content, {
                                            tagName: 'span',
                                            className: 'first-headline h3',
                                            value: attributes.titleLeft,
                                        } ),
                                        el( RichText.Content, {
                                            tagName: 'p',
                                            className: 'first-content',
                                            value: attributes.contentLeft,
                                        } ),
                                    )
                                )
                            ),
                            el( 'div', { className: 'col-md-4' },
                                el( 'div', { className: 'flatbox flatbox-default' },
                                    el( 'a', {
                                        className: 'second-link center-block',
                                        href: attributes.urlMiddle,
                                        },
                                        el( 'i', { className: attributes.iconMiddle+' fa-3x' } ),
                                        el( RichText.Content, {
                                            tagName: 'span',
                                            className: 'second-headline h3',
                                            value: attributes.titleMiddle,
                                        } ),
                                        el( RichText.Content, {
                                            tagName: 'p',
                                            className: 'second-content',
                                            value: attributes.contentMiddle,
                                        } ),
                                    )
                                )
                            ),
                            el( 'div', { className: 'col-md-4' },
                                el( 'div', { className: 'flatbox flatbox-default' },
                                    el( 'a', {
                                        className: 'third-link center-block',
                                        href: attributes.urlRight,
                                        },
                                        el( 'i', { className: attributes.iconRight+' fa-3x' } ),
                                        el( RichText.Content, {
                                            tagName: 'span',
                                            className: 'third-headline h3',
                                            value: attributes.titleRight,
                                        } ),
                                        el( RichText.Content, {
                                            tagName: 'p',
                                            className: 'third-content',
                                            value: attributes.contentRight,
                                        } ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                )
            )
        },
    } )
} )(
    window.wp.blocks,
    window.wp.editor,
    window.wp.element,
    window.wp.components,
);