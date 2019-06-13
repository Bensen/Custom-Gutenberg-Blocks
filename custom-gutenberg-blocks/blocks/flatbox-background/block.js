( function( blocks, editor, element, components ) {

	var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
	var RichText = editor.RichText;
	var InnerBlocks = editor.InnerBlocks;
	
	var BlockControls = editor.BlockControls;
	var MediaUpload = editor.MediaUpload;

	var InspectorControls = editor.InspectorControls;
	var PanelBody = components.PanelBody;
	var TextControl = components.TextControl;
    
    /**
     * Every block starts by registering a new block type definition.
     * @see https://wordpress.org/gutenberg/handbook/block-api/
     */
    registerBlockType( 'custom-gutenberg-blocks/flatbox-background', {
        title: 'Flatbox Background',
        description: 'Hintergrundbild mit einem Icon und ner Flatbox drinnen.',
		icon: 'screenoptions',
        category: 'flatbox',
        keywords: [ 'flatbox', 'image', 'bild' ],
        /**
         * @see https://wordpress.org/gutenberg/handbook/block-api/attributes/
         */
        attributes: {
			mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
			},
            title: {
				type: 'array',
                source: 'children',
                selector: 'h3',
            },
			icon: {
				type: 'string',
				default: 'fa fa-pencil-alt',
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
						title: 'Icon',
						initialOpen: true,
					},
					el( 'a', {
						href: 'https://fontawesome.com/icons?d=gallery&m=free', // TODO: Icon Picker
						target: '_blank',
					},
					el( RichText, { value: 'Icon Galerie öffnen', } ),
					),
					el( TextControl, {
						type: 'text',
						label: 'Icon-Code',
						placeholder: 'Bsp: fa fa-rocket',
						value: attributes.icon,
						onChange: function( value ) {
							props.setAttributes( { icon: value } );
						},
					} ),
					),
				),

				// Block Controls
				el( BlockControls, { key: 'controls' },
					el( 'div', { className: 'components-toolbar' },
						el( MediaUpload, {
							onSelect: function( media ) {
								props.setAttributes( {
									mediaURL: media.url,
									mediaID: media.id,
								} );
							},
							type: 'image',
							render: function( obj ) {
								return el( components.Button, {
									className: 'components-icon-button components-toolbar__control',
									onClick: obj.open
									},
									el( 'svg', { className: 'dashicon dashicons-edit', width: '20', height: '20' },
										el( 'path', { d: "M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z" } )
									)
								);
							}
						} )
					),
				),
				
				// Block Backend
				el( 'div', {
						className: 'flatbox flatbox-primary flatbox-background',
						style: attributes.mediaID ? { backgroundImage: 'url(' + attributes.mediaURL + ')' } : {}
					},
					el( 'i', { className: attributes.icon + ' fa-3x' } ),
					el( RichText, {
						tagName: 'h3',
						placeholder: 'Headline',
						keepPlaceholderOnFocus: true,
						value: attributes.title,
						isSelected: true,
						onChange: function( value ) {
							props.setAttributes( { title: value } );
						},
					} ),
					el( 'div', { className: 'bg bg-white'},
						el ( 'div', { className: 'clearfix' },
							el( InnerBlocks ),
						)
					)
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
				el( 'div', {
					className: 'flatbox flatbox-primary flatbox-background',
					style: { backgroundImage: 'url(' + attributes.mediaURL + ')' }
					},
					el( 'i', { className: attributes.icon + ' fa-3x' } ),
					el( RichText.Content, {
						tagName: 'h3',
						value: attributes.title,
					} ),
					el( 'div', { className: 'bg bg-white' },
						el( 'div', { className: 'clearfix' },
							el( InnerBlocks.Content ),
						)
					)
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