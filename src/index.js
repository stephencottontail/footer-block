const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;
import FooterBlock from './edit';

registerBlockType( 'sc/footer-block', {
    title: 'Footer Info',
    description: 'A block that contains some useful footer information',
    icon: 'smiley',
    category: 'common',
    attributes: {
        categories: {
            type: 'array',
            default: []
        },
        tags: {
            type: 'array',
            default: []
        }
    },
    edit: ( props ) => {
        const { className } = props;

		return [
            <div className={ `${className}__block` }>
				<p>Liked this article? Hated it? Want to talk about it? Drop me a line on <a className={ `${className}__link` } href='https://twitter.com/s_cottontail24'>Twitter</a></p>
            </div>,
            <FooterBlock
                type={ 'categories' }
                { ...props }
            />,
            <FooterBlock
				type={ 'tags' }
				{  ...props }
            />
		]
    }
} );
