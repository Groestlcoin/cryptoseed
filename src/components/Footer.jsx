import React, {PropTypes} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

import CodeIcon from 'material-ui/svg-icons/action/code';

const
	qr = require('qr-image'),
	{shell} = require('electron');

class Footer extends React.Component {
	constructor(props) {
		super(props);

		const {muiTheme} = props;

		this.iconStyle = {
			width: 18,
			height: 18,
			color: muiTheme.palette.primary3Color
		};

		this.bitcoinAddr = 'FWN1qdiRrymSR6jbpbanLYqZpjkEaZouHN';

		this.state = {
			qrData: qr.imageSync(this.bitcoinAddr)
		};

		this.handleShowQrCode = this.handleShowQrCode.bind(this);
	}

	handleGithubLink() {
		shell.openExternal('https://groestlcoin.org');
	}

	handleShowQrCode() {
		this.setState({
			showQrCode: !this.state.showQrCode
		});
	}

	render() {
		const
			{qrData, showQrCode} = this.state,
			{muiTheme} = this.props;

		let qrCode;

		if (showQrCode) {
			qrCode =
				<div className="row center-xs">
					<div className="col-xs">
						<div style={{color: muiTheme.palette.primary3Color, margin: 10}}>
							Groestlcoin Donations welcome:

						</div>
						<img src={`data:image/png;base64,${qrData.toString('base64')}`} style={{width: 250, height: 250}}/>
					</div>
				</div>
			;
		}

		return (
			<div>
				<div className="row center-xs">
					<a href="#" onClick={this.handleGithubLink}>
						<div className="row center-xs middle-xs">
							<CodeIcon style={this.iconStyle}/>&nbsp;by Groestlcoin Developers
						</div>
					</a>
				</div>
				<div className="row center-xs" style={{color: muiTheme.palette.borderColor, marginTop: 15}}>
					<a href="#" onClick={this.handleShowQrCode}>
						{this.bitcoinAddr}
					</a>
				</div>
				{qrCode}
			</div>
		);
	}
}

Footer.propTypes = {
	muiTheme: PropTypes.object.isRequired
};

export default muiThemeable()(Footer);
