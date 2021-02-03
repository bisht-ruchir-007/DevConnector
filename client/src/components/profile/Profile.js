import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfilebyID } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

const Profile = ({ match, getProfilebyID, profile: { profile, loading }, auth }) => {
	useEffect(
		() => {
			getProfilebyID(match.params.id);
		},
		[ getProfilebyID ]
	);

	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/developers' class='btn btn-primary'>
						Back To Profiles
					</Link>
					{auth.isAuthenticated &&
					auth.loading === false &&
					auth.user._id === profile.user._id && (
						<Link to='/edit-profile' className='btn btn-success'>
							Edit Profile
						</Link>
					)}

					<div class='profile-grid my-1'>
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<div class='profile-exp bg-white p-2'>
							<h2 class='text-primary'>Experience</h2>
							{profile.experience.length > 0 ? (
								<Fragment>
									{profile.experience.map((experience) => (
										<ProfileExperience key={experience._id} experience={experience} />
									))}
								</Fragment>
							) : (
								<h4>No experience credentials</h4>
							)}
						</div>

						<div class='profile-edu bg-white p-2'>
							<h2 class='text-primary'>Education</h2>
							{profile.education.length > 0 ? (
								<Fragment>
									{profile.education.map((education) => (
										<ProfileEducation key={education._id} education={education} />
									))}
								</Fragment>
							) : (
								<h4>No education credentials</h4>
							)}
						</div>

						<div class='profile-github'>
							<h2 class='text-primary my-1'>
								<i class='fab fa-github' /> Github Repos
							</h2>
							<div class='repo bg-white p-1 my-1'>
								<div>
									<h4>
										<a href='#' target='_blank' rel='noopener noreferrer'>
											Repo One
										</a>
									</h4>
									<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, laborum!</p>
								</div>
								<div>
									<ul>
										<li class='badge badge-primary'>Stars: 44</li>
										<li class='badge badge-dark'>Watchers: 21</li>
										<li class='badge badge-light'>Forks: 25</li>
									</ul>
								</div>
							</div>
							<div class='repo bg-white p-1 my-1'>
								<div>
									<h4>
										<a href='#' target='_blank' rel='noopener noreferrer'>
											Repo Two
										</a>
									</h4>
									<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, laborum!</p>
								</div>
								<div>
									<ul>
										<li class='badge badge-primary'>Stars: 44</li>
										<li class='badge badge-dark'>Watchers: 21</li>
										<li class='badge badge-light'>Forks: 25</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getProfilebyID: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfilebyID })(Profile);
