import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from '../dashboard/DashboardActions';

import { getCurrentUserProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentUserProfile, auth: { user }, profile: { profile, loading } }) => {
	useEffect(() => {
		getCurrentUserProfile();
	}, []);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Welcome <strong>{user && user.name}</strong>
			</p>

			{profile != null ? (
				<Fragment>
					<h2 className='my-2'>Education Credentials</h2>
					<DashboardActions />

					<div className='my-2'>
						<button className='btn btn-danger'>
							<i className='fas fa-user-minus' />
							Delete My Account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet setup a profile , Please create one.</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentUserProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentUserProfile })(Dashboard);
