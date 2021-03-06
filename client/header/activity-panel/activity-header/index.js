/**
 * External dependencies
 */
import classnames from 'classnames';
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
import { __experimentalText as Text } from '@wordpress/components';
import { EllipsisMenu } from '@woocommerce/components';

/**
 * Internal dependencies
 */
import './style.scss';

class ActivityHeader extends Component {
	render() {
		const { className, menu, subtitle, title, unreadMessages } = this.props;
		const cardClassName = classnames(
			{
				'woocommerce-layout__inbox-panel-header': subtitle,
				'woocommerce-layout__activity-panel-header': ! subtitle,
			},
			className
		);
		const countUnread = unreadMessages ? unreadMessages : 0;

		return (
			<div className={ cardClassName }>
				<div className="woocommerce-layout__inbox-title">
					<Text variant="title.small">{ title }</Text>
					<Text variant="button">
						{ countUnread > 0 && (
							<span className="woocommerce-layout__inbox-badge">
								{ unreadMessages }
							</span>
						) }
					</Text>
				</div>
				<div className="woocommerce-layout__inbox-subtitle">
					{ subtitle && (
						<Text variant="body.small">{ subtitle }</Text>
					) }
				</div>
				{ menu && (
					<div className="woocommerce-layout__activity-panel-header-menu">
						{ menu }
					</div>
				) }
			</div>
		);
	}
}

ActivityHeader.propTypes = {
	className: PropTypes.string,
	unreadMessages: PropTypes.number,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	menu: PropTypes.shape( {
		type: PropTypes.oneOf( [ EllipsisMenu ] ),
	} ),
};

export default ActivityHeader;
